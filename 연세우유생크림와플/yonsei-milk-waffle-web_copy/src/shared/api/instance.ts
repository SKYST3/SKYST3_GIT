import type { KyInstance } from 'ky';
import ky from 'ky';
import { API_BASE_URL } from '../constants/env';

const kyInstance: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export { kyInstance };
