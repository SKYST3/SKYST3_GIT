import type { AdminGameStartRequestDto, AdminGameStartResponseDto } from '@/shared/api/dto';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { adminApi } from './instance';

export const ADMIN_MUTATION_KEY = {
  POST_START_GAME: ['admin', 'startGame'],
};

const mutations = {
  postStartGame: () => ({
    mutationFn: (data: AdminGameStartRequestDto) => adminApi.startGame(data),
    mutationKey: ADMIN_MUTATION_KEY.POST_START_GAME,
  }),
};

export const useStartGameMutation = (
  options?: Omit<
    UseMutationOptions<AdminGameStartResponseDto, DefaultError, AdminGameStartRequestDto>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postStartGame(),
    ...options,
  });
};
