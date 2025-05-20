import { kyInstance } from '@/shared/api/instance';
import { AdminApi } from './index';

const adminApi = new AdminApi(kyInstance);

export { adminApi };
