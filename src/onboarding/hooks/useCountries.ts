import { useQuery } from '@tanstack/react-query';
import { geoApi } from '../api';

/** Lista de países (`GET /v1/geo/countries`) — praticamente estática, cache longo. */
export function useCountries() {
  return useQuery({
    queryKey: ['geo', 'countries'],
    queryFn: () => geoApi.listCountries(),
    staleTime: 60 * 60 * 1000,
  });
}
