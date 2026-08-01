/** Espelha `Gender` do Prisma. */
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'NOT_INFORMED';

/** Espelha `Language` do Prisma. */
export type OnboardingLanguage = 'PT_BR' | 'EN_US' | 'ES_ES';

/** `CreatePersonalDataDto` — `PATCH /v1/onboarding/draft/personal-data` (Customer). */
export interface PersonalDataRequest {
  document: string;
  /** ISO date string (yyyy-MM-dd). */
  birthDate: string;
  /** E.164 — o backend não aceita máscara BR, ver `toE164BR` em `src/lib/masks.ts`. */
  phone: string;
  gender: Gender;
}

/** `CreateCompanyDataDto` — `PATCH /v1/onboarding/draft/company-data` (Company). */
export interface CompanyDataRequest {
  corporateName: string;
  tradeName: string;
  document: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
}

/** `CreateAddressDto` — `PATCH /v1/onboarding/draft/address` (ambos os fluxos). */
export interface AddressRequest {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  countryId: string;
}

/** `CreatePersonalizationDto` — `PATCH /v1/onboarding/draft/personalization` (Company). */
export interface PersonalizationRequest {
  accountName: string;
  logoUrl?: string;
  language: OnboardingLanguage;
  timezone: string;
}

/** `CompleteOnboardingDto` — `POST /v1/onboarding/complete`. */
export interface CompleteOnboardingRequest {
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

/** Sub-objetos acumulados no rascunho — cada um só existe depois do respectivo PATCH. */
export interface OnboardingDraftPayload {
  personalData?: PersonalDataRequest;
  companyData?: CompanyDataRequest;
  address?: AddressRequest;
  personalization?: PersonalizationRequest;
}

/** `OnboardingDraftResponseDto` — `GET /v1/onboarding/draft`. */
export interface OnboardingDraft {
  id: string;
  userId: string;
  accountType: 'CUSTOMER' | 'COMPANY';
  step: string;
  payload: OnboardingDraftPayload;
  createdAt: string;
  updatedAt: string;
}

/** `CountryResponseDto` — `GET /v1/geo/countries`. */
export interface Country {
  id: string;
  name: string;
  code: string;
}
