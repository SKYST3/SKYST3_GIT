import { kyInstance } from '@/shared/api/instance';
import { GameApi } from './index';

const gameApi = new GameApi(kyInstance);

export { gameApi };
