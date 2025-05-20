import type { CreateGameResultRequestDto, CreateGameResultResponseDto } from '@/shared/api/dto';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptions, DefaultError } from '@tanstack/react-query';
import { gameApi } from './instance';

export const GAME_QUERY_KEY = {
  POST_GAME_RESULT: () => ['game', 'submit'],
};

const mutations = {
  postGameResult: () => ({
    mutationFn: (variables: CreateGameResultRequestVariable) => {
      const { body } = variables;
      return gameApi.postGameResult(body);
    },
    mutationKey: GAME_QUERY_KEY.POST_GAME_RESULT(),
  }),
};

export { mutations as gameMutations };

// ------------------ Query ---------------------

export const usePostGameMutation = (
  options?: Omit<
    UseMutationOptions<CreateGameResultResponseDto, DefaultError, CreateGameResultRequestVariable>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    ...mutations.postGameResult(),
    ...options,
  });
};

type CreateGameResultRequestVariable = {
  body: CreateGameResultRequestDto;
};
