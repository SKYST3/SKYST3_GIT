import { useStartGameMutation } from '@/entities/admin';
import { TEAM_INFO } from '@/entities/team';
import { useGameStore } from '@/feature/game-control';
import { Button } from '@/shared/ui';
import { useState } from 'react';

const AdminReady = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [hide, setHide] = useState(false);
  const startGameState = useGameStore((s) => s.startGame);
  const { mutateAsync: startGame } = useStartGameMutation();

  const handleStart = async () => {
    setIsExiting(true);
    await startGame({ game_started_at: Date.now() });
    startGameState(Date.now());
    setTimeout(() => setHide(true), 900);
  };

  if (hide) return null;

  return (
    <div
      className={`bg-cool-gray-0 z-30 fixed inset-0 flex flex-col gap-6 justify-center items-center my-auto transition-all duration-700${isExiting ? ' animate-adminready-exit pointer-events-none' : ''}`}
    >
      <div className="flex gap-4">
        {Object.values(TEAM_INFO).map((team) => (
          <TeamCount key={team.name} image={team.character} name={team.name} count={0} />
        ))}
      </div>

      <Button className="text-2xl font-bold px-5 h-12" onClick={handleStart} disabled={isExiting}>
        쉐낏투유 시작!
      </Button>
      <style>{`
        @keyframes adminready-exit {
          0% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          60% {
            opacity: 0.7;
            transform: scale(0.7) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) rotate(540deg);
          }
        }
        .animate-adminready-exit {
          animation: adminready-exit 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export { AdminReady };

const TeamCount = ({ image, name }: TTeamCountProps) => {
  return (
    <div className="flex flex-col items-center">
      {/* <span className="text-2xl font-bold">{count}명</span> */}
      <img src={image} alt={name} className="w-[200px] object-contain" />
    </div>
  );
};

type TTeamCountProps = {
  image: string;
  name: string;
  count: number;
};
