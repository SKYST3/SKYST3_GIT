import { GameResultSender } from './game-result-sender';
import { useState } from 'react';
import type { Timestamp } from '@/entities/time/Timestamp';
import { GameEndCalculator } from './game-end-calculator';
import { GameMotionCheck } from './game-motion-check';
import { GameVibrate } from './game-vibrate';

export const Game = () => {
  const [userBeatList, setUserBeatList] = useState<Timestamp[]>([]);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);
  const [userBeatHistory, setUserBeatHistory] = useState<{ time: number; x: number }[]>([]);
  const [resultBeatList, setResultBeatList] = useState<Timestamp[] | null>(null);
  const [isShacked, setIsShacked] = useState(false);

  return (
    <div className="min-h-screen m-auto w-full flex flex-col justify-center items-center gap-4">
      <GameMotionCheck
        isShacked={isShacked}
        setIsShacked={setIsShacked}
        setUserBeatList={setUserBeatList}
        setUserBeatHistory={setUserBeatHistory}
      />
      <GameVibrate isShacked={isShacked} resultBeatList={resultBeatList} />
      <GameEndCalculator setGameEndTime={setGameEndTime} setResultBeatList={setResultBeatList} />
      <GameResultSender
        gameEndTime={gameEndTime}
        userBeatList={userBeatList}
        userBeatHistory={userBeatHistory}
      />
    </div>
  );
};
