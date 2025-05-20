/* eslint-disable */

import { Video } from '../interfaces/video.interface';
import { axiosInstance } from '../utils/axios-instance';

const MOCK_USER_ID = '3e5d1e46-80e5-4a25-8548-d7ee712d8c3a';

export const getAvailableVotes = async (): Promise<{
  availableVotes: number;
}> => {
  try {
    const response = await axiosInstance.get('/users/available-votes', {
      headers: {
        Authorization: MOCK_USER_ID,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { availableVotes: 0 };
  }
};
