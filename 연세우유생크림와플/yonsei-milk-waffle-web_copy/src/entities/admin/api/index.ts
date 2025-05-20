import type {
  AdminGameResponseDto,
  AdminGameResultResponseDto,
  AdminGameStartRequestDto,
  AdminGameStartResponseDto,
} from '@/shared/api/dto';
import type { KyInstance, Options } from 'ky';

export class AdminApi {
  private readonly instance: KyInstance;

  constructor(instance: KyInstance) {
    this.instance = instance;
  }

  async getGame(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<AdminGameResponseDto>('api/admin/game', {
        ...options,
      })
      .json();

    return response;
  }

  async startGame(data: AdminGameStartRequestDto, kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .post<AdminGameStartRequestDto>('api/admin/game/start', {
        json: data,
        ...options,
      })
      .json<AdminGameStartResponseDto>();

    return response;
  }

  async getGameResult(kyInstance?: KyInstance, options?: Options) {
    const instance = kyInstance ?? this.instance;

    const response = await instance
      .get<AdminGameResultResponseDto>('api/admin/game/result', {
        ...options,
      })
      .json();

    return response;
  }
}
