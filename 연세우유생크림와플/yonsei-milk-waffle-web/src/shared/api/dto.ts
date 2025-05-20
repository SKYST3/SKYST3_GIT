import type { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';

export type AdminGameResponseDto = {
  song_length: number;
  beat_list: number[];
};

export type AdminGameStartRequestDto = {
  game_started_at: number;
};

export type AdminGameStartResponseDto = {
  status: 'OK';
};

export type CreateGameResultRequestDto = {
  timestamp: Timestamp[];
  team: Team;
};

export type CreateGameResultResponseDto = {
  game_started_at: number;
  song_length: number;
};

export type ReadGameStatusResponseDto = {
  game_started_at: number;
  song_length: number;
};

export type CreateSelectTeamRequestDto = {
  team: Team;
};

export type AdminGameResultResponseDto = {
  scores: TeamResponseDto[];
};

type TeamResponseDto = {
  team: Team;
  score: number;
};
