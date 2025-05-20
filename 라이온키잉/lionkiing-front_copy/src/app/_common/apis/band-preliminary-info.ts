/* eslint-disable */

import { axiosInstance } from '../utils/axios-instance';
import {
  BandFinalInfo,
  BandPreliminaryInfo,
} from '../interfaces/band-info.interface';

export const getBandPreliminaryInfo = async (): Promise<
  BandPreliminaryInfo[]
> => {
  try {
    const response = await axiosInstance(`/videos/preliminary`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
