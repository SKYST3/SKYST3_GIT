import type { CreateSelectTeamRequestDto } from '@/shared/api/dto';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { teamApi } from './instance';

export const TEAM_MUTATION_KEY = {
  POST_SELECT_TEAM: ['team', 'selectTeam'],
};

const mutations = {
  postSelectTeam: () => ({
    mutationFn: (data: CreateSelectTeamRequestDto) => teamApi.selectTeam(data),
    mutationKey: TEAM_MUTATION_KEY.POST_SELECT_TEAM,
  }),
};

export const useSelectTeamMutation = (
  options?: Omit<
    UseMutationOptions<unknown, DefaultError, CreateSelectTeamRequestDto>,
    'mutationFn' | 'mutationKey'
  >
) => {
  return useMutation({
    ...mutations.postSelectTeam(),
    ...options,
  });
};
