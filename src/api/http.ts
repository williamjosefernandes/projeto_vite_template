import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../auth/stores';
import type { ApiResponse, RefreshTokenResponse } from '../auth/types';

const baseURL = import.meta.env.VITE_API_URL ?? '/api/v1';

/** Instância única do axios — nenhum outro arquivo do projeto deve chamar `axios` diretamente. */
export const http = axios.create({
  baseURL,
  timeout: 15000,
});

/** Cliente "cru", sem interceptors — usado só pela chamada de refresh, para não reentrar no fluxo de 401. */
const refreshHttp = axios.create({ baseURL, timeout: 15000 });

http.interceptors.request.use((config) => {
  const { auth, currentAccount } = useAuthStore.getState();
  if (auth?.accessToken) {
    config.headers.set('Authorization', `Bearer ${auth.accessToken}`);
  }
  // Exigido pelo `MembershipGuard` do backend em todo endpoint escopado à conta ativa.
  if (currentAccount?.id) {
    config.headers.set('x-account-id', currentAccount.id);
  }
  return config;
});

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

let refreshPromise: Promise<RefreshTokenResponse> | null = null;

async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  const refreshToken = useAuthStore.getState().auth?.refreshToken;
  if (!refreshToken) throw new Error('Nenhum refresh token disponível.');

  const { data } = await refreshHttp.post<ApiResponse<RefreshTokenResponse>>('/auth/refresh-token', {
    refreshToken,
  });
  const session = data.data!;
  // `/auth/refresh-token` reemite a sessão inteira (não só os tokens) — mantém permissões/menus/componentes em dia.
  useAuthStore.getState().setSession(session);
  return session;
}

const REFRESH_EXEMPT_PATHS = ['/auth/login', '/auth/refresh-token'];

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    const status = error.response?.status;
    const isExempt = config ? REFRESH_EXEMPT_PATHS.some((path) => config.url?.includes(path)) : true;

    if (status !== 401 || !config || isExempt || config._retried) {
      return Promise.reject(error);
    }

    config._retried = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const session = await refreshPromise;
      config.headers.set('Authorization', `Bearer ${session.auth.accessToken}`);
      return http(config);
    } catch (refreshError) {
      useAuthStore.getState().clearSession();
      return Promise.reject(refreshError);
    }
  },
);
