import type { AdminGameResponseDto, AdminGameResultResponseDto } from '@/shared/api/dto';
import {
  type DefaultError,
  type UseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { adminApi } from './instance';

export const ADMIN_QUERY_KEY = {
  GET_GAME: ['admin', 'game'],
  GET_GAME_RESULT: ['admin', 'game', 'result'],
};

const queries = {
  getGame: () => ({
    queryFn: () => adminApi.getGame(),
    queryKey: ADMIN_QUERY_KEY.GET_GAME,
  }),
  getGameResult: () => ({
    queryFn: () => adminApi.getGameResult(),
    queryKey: ADMIN_QUERY_KEY.GET_GAME_RESULT,
  }),
};

export { queries as adminQueries };

// ------------------ Query ---------------------

export const useGetGameQuery = <TData = AdminGameResponseDto>(
  options?: Omit<UseQueryOptions<AdminGameResponseDto, DefaultError, TData>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    ...queries.getGame(),
    ...options,
  });
};

export const useGetGameSuspenseQuery = () => {
  return useSuspenseQuery({
    ...queries.getGame(),
  });
};

export const useGetGame = (
  options?: Omit<UseQueryOptions<AdminGameResponseDto>, 'queryFn' | 'queryKey'>
) => {
  return useQuery({
    ...queries.getGame(),
    ...options,
  });
};

export const useGetGameResult = (
  options?: Omit<UseQueryOptions<AdminGameResultResponseDto>, 'queryFn' | 'queryKey'>
) => {
  return useQuery({
    ...queries.getGameResult(),
    ...options,
  });
};

export const useGetGameResultSuspenseQuery = () => {
  return useSuspenseQuery({
    ...queries.getGameResult(),
  });
};
