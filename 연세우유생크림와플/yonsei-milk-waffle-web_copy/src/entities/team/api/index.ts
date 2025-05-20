import type { CreateSelectTeamRequestDto } from '@/shared/api/dto';
import type { KyInstance, Options } from 'ky';

export class TeamApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  async selectTeam(data: CreateSelectTeamRequestDto, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<CreateSelectTeamRequestDto>('api/game/select_team', {
        json: data,
        ...options,
      })
      .json();

    return response;
  }
}
