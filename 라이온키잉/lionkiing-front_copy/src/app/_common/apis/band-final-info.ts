/* eslint-disable */

import { axiosInstance } from '../utils/axios-instance';
import { BandFinalInfo } from '../interfaces/band-info.interface';

export const getBandFinalInfo = async (): Promise<BandFinalInfo[]> => {
  try {
    const response = await axiosInstance(`/videos/final`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
