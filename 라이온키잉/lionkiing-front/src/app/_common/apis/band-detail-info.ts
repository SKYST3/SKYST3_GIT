/* eslint-disable */

import { axiosInstance } from '../utils/axios-instance';
import { Band, BandFinalInfo } from '../interfaces/band-info.interface';
import { Video, VideoDetail } from '../interfaces/video.interface';

export const getVideoDetailInfo = async (id: string): Promise<VideoDetail> => {
  try {
    const response = await axiosInstance(`/videos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
