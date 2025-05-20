import { usePostGameMutation } from '@/entities/game/api/mutations';
import type { Team } from '@/entities/team';
import type { Timestamp } from '@/entities/time/Timestamp';
import { setStorage } from '@/shared/lib/sessionStorage';
import { useNavigate } from '@tanstack/react-router';

export const GameResultSender = ({
  userBeatList,
  userBeatHistory,
}: {
  gameEndTime: number | null;
  userBeatList: Timestamp[];
  userBeatHistory: { time: number; x: number }[];
}) => {
  const { mutateAsync: sendGameResult } = usePostGameMutation();
  const navigate = useNavigate();

  const handleCloseSubmit = () => {
    setStorage({ key: 'BEAT_LIST', value: userBeatHistory });

    sendGameResult({
      body: {
        timestamp: userBeatList,
        team: localStorage.getItem('team') as Team,
      },
    }).then(() => {});
    navigate({ to: '/result' });
  };

  return (
    <button
      type="button"
      className="bg-red-500 text-white px-6 py-3 rounded-lg w-[267px] font-medium"
      onClick={handleCloseSubmit}
    >
      결과 제출하기
    </button>
  );
};
