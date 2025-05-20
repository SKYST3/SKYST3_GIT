import type { ReadGameStatusResponseDto } from '@/shared/api/dto';
import { type DefaultError, type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { gameApi } from './instance';

export const GAME_QUERY_KEY = {
  GET_GAME_STATUS: () => ['game', 'status'],
};

const queries = {
  getGameStatus: () => ({
    queryKey: GAME_QUERY_KEY.GET_GAME_STATUS(),
    queryFn: () => gameApi.getGameStatus(),
  }),
};

export { queries as gameQueries };

// ------------------ Query ---------------------

export const useGetGameStatus = <TData = ReadGameStatusResponseDto>(
  options?: Omit<
    UseQueryOptions<ReadGameStatusResponseDto, DefaultError, TData>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery({
    ...queries.getGameStatus(),
    ...options,
  });
};
