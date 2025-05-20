import { useGetGameResultSuspenseQuery } from '@/entities/admin';
import { TEAM_INFO, type Team } from '@/entities/team';
import type { AdminGameResultResponseDto } from '@/shared/api/dto';
import { Suspense, useEffect, useState } from 'react';
import { useCounter } from '../hooks/use-result';
import { fireConfetti } from '../utils/confetti';

const ResultModal = () => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-between p-8 w-full h-[60%] text-center bg-[url('/images/result-background.png')] bg-cover bg-center">
        <h2 className="text-2xl font-bold mb-10 text-white">게임 종료!</h2>
        {showResult ? (
          <Suspense fallback={<LoadingFallback />}>
            <ResultContent />
          </Suspense>
        ) : (
          <Countdown />
        )}
      </div>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-white text-2xl">결과 불러오는 중...</div>
  </div>
);

const ResultContent = () => {
  const { data: gameResult } = useGetGameResultSuspenseQuery();
  return <ResultGraph resultData={gameResult} />;
};

const ResultGraph = ({
  resultData,
}: {
  resultData: AdminGameResultResponseDto;
}) => {
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const maxScore = Math.max(...resultData.scores.map((s) => s.score));

  const scoreLevels = [
    0,
    ...Array.from(new Set(resultData.scores.map((s) => s.score))).sort((a, b) => a - b),
  ];

  const seoulCounter = useCounter(
    Math.min(resultData.scores[0].score, scoreLevels[currentLevel]),
    1000
  );
  const koreaCounter = useCounter(
    Math.min(resultData.scores[1].score, scoreLevels[currentLevel]),
    1000
  );
  const yonseiCounter = useCounter(
    Math.min(resultData.scores[2].score, scoreLevels[currentLevel]),
    1000
  );
  const kaistCounter = useCounter(
    Math.min(resultData.scores[3].score, scoreLevels[currentLevel]),
    1000
  );

  useEffect(() => {
    const animate = async () => {
      for (let i = 0; i < scoreLevels.length; i++) {
        setCurrentLevel(i);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setShowConfetti(true);
      fireConfetti();
    };
    animate();
  }, [scoreLevels.length]);

  const winner = resultData.scores.reduce((prev, current) =>
    current.score > prev.score ? current : prev
  );

  return (
    <div className="relative">
      {showConfetti && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={TEAM_INFO[winner.team as Team].character}
            alt={`${winner.team} 캐릭터`}
            className="w-96 h-96 object-contain"
          />
        </div>
      )}
      <div className="flex justify-center items-end gap-8 h-[300px] mb-10">
        {resultData.scores.map((teamScore, index) => {
          const currentMaxScore = scoreLevels[currentLevel];
          const displayScore = Math.min(teamScore.score, currentMaxScore);
          const height = (displayScore / maxScore) * 250;
          const animatedScore = [seoulCounter, koreaCounter, yonseiCounter, kaistCounter][index];

          return (
            <div key={teamScore.team} className="flex flex-col items-center">
              <div
                className="w-16 bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out"
                style={{
                  height: `${height}px`,
                }}
              />
              <span className="mt-2 text-lg font-bold text-white">{teamScore.team}</span>
              <span className="text-2xl text-white">{animatedScore}점</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Countdown = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="text-8xl font-extrabold text-white mb-8">{count}</span>
    </div>
  );
};

export { ResultModal };
