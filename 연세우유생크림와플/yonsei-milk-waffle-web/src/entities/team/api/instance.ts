import { API_BASE_URL } from '@/shared/constants/env';
import ky from 'ky';
import { TeamApi } from './index';

export const teamApi = new TeamApi(
  ky.create({
    prefixUrl: API_BASE_URL,
  })
);
