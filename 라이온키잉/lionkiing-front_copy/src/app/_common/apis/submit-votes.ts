import { axiosInstance } from '../utils/axios-instance';
import { getAvailableVotes } from './available-votes';

const MOCK_USER_ID = '3e5d1e46-80e5-4a25-8548-d7ee712d8c3a';

export const submitVotes = async (videoId: string, votes: number) => {
  try {
    await axiosInstance.post(
      `/votes/${videoId}`,
      {
        count: votes,
      },
      {
        headers: {
          Authorization: MOCK_USER_ID,
        },
      },
    );

    // 투표 성공 후 잔여 투표 수 갱신
    const { availableVotes } = await getAvailableVotes();
    return { success: true, availableVotes };
  } catch (error) {
    console.error('투표 제출 중 오류:', error);
    return { success: false, availableVotes: 0 };
  }
};
