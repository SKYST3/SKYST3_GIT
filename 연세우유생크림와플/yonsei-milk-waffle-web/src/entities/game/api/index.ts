import type {
  CreateGameResultRequestDto,
  CreateGameResultResponseDto,
  ReadGameStatusResponseDto,
} from '@/shared/api/dto';
import type { KyInstance, Options } from 'ky';

export class GameApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  async postGameResult(
    data: CreateGameResultRequestDto,
    kyInstance?: KyInstance,
    options?: Options
  ) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<CreateGameResultRequestDto>('api/game/submit', {
        json: data,
        ...options,
      })
      .json<CreateGameResultResponseDto>();

    return response;
  }

  async getGameStatus(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<ReadGameStatusResponseDto>('api/game/status', {
        ...options,
      })
      .json();

    return response;
  }
}
