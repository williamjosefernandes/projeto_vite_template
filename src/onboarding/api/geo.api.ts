import { http } from '../../api/http';
import type { ApiResponse } from '../../auth/types';
import type { Country } from '../types';

/** Chamadas HTTP cruas de dados geográficos (`/v1/geo/*`) — públicas. */
export const geoApi = {
  listCountries: () => http.get<ApiResponse<Country[]>>('/geo/countries').then((res) => res.data.data ?? []),
};
