import { http } from '../../api/http';
import type { ApiResponse, LoginResponse } from '../../auth/types';
import type {
  AddressRequest,
  CompanyDataRequest,
  CompleteOnboardingRequest,
  OnboardingDraft,
  PersonalDataRequest,
  PersonalizationRequest,
} from '../types';

/** Chamadas HTTP cruas do wizard de onboarding (`/v1/onboarding/*`) — todas exigem sessão autenticada. */
export const onboardingApi = {
  getDraft: () =>
    http.get<ApiResponse<OnboardingDraft | null>>('/onboarding/draft').then((res) => res.data.data ?? null),

  savePersonalData: (payload: PersonalDataRequest) =>
    http
      .patch<ApiResponse<OnboardingDraft>>('/onboarding/draft/personal-data', payload)
      .then((res) => res.data.data!),

  saveCompanyData: (payload: CompanyDataRequest) =>
    http.patch<ApiResponse<OnboardingDraft>>('/onboarding/draft/company-data', payload).then((res) => res.data.data!),

  saveAddress: (payload: AddressRequest) =>
    http.patch<ApiResponse<OnboardingDraft>>('/onboarding/draft/address', payload).then((res) => res.data.data!),

  savePersonalization: (payload: PersonalizationRequest) =>
    http
      .patch<ApiResponse<OnboardingDraft>>('/onboarding/draft/personalization', payload)
      .then((res) => res.data.data!),

  discardDraft: () => http.delete<void>('/onboarding/draft'),

  /** Reemite a sessão inteira (mesmo formato de login/switch-account), já escopada à conta recém-criada. */
  complete: (payload: CompleteOnboardingRequest) =>
    http.post<ApiResponse<LoginResponse>>('/onboarding/complete', payload).then((res) => res.data.data!),
};
