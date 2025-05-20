import { cn } from '@/shared/lib/utils';
import { useEffect, useState } from 'react';

const CheerleadingStick = ({ currentTime, beatList, isPlaying }: TProps) => {
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);

  // Find current beat
  useEffect(() => {
    if (!isPlaying) return;

    const currentBeat = beatList.findIndex((beat) => beat / 1000 > currentTime);
    if (currentBeat !== -1) {
      setCurrentBeatIndex(currentBeat);
    }
  }, [currentTime, beatList, isPlaying]);

  const getSwingAngle = () => {
    if (!isPlaying || currentBeatIndex >= beatList.length) return 0;

    const currentBeat = beatList[currentBeatIndex] / 1000;
    const prevBeat = currentBeatIndex > 0 ? beatList[currentBeatIndex - 1] / 1000 : 0;
    const beatInterval = currentBeat - prevBeat;
    const timeInCurrentBeat = currentTime - prevBeat;
    const progress = timeInCurrentBeat / beatInterval;

    const maxAngle = 50;
    const angle = progress * maxAngle;
    return angle;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-32">
        {/* Left cheer stick */}
        <div
          className={cn(
            'absolute left-[calc(50%-15px)] top-0 h-24 w-3 -translate-x-1/2 origin-bottom transition-transform duration-100 rounded-xl',
            'bg-gradient-to-b from-blue-400 to-blue-600',
            'shadow-[0_0_2px_rgba(59,130,246,0.5),0_0_4px_rgba(59,130,246,0.5),0_0_8px_rgba(59,130,246,0.5),0_0_12px_rgba(59,130,246,0.5),0_0_16px_rgba(59,130,246,0.5)]'
          )}
          style={{
            transform: `rotate(${getSwingAngle()}deg)`,
          }}
        />
        {/* Right cheer stick */}
        <div
          className={cn(
            'absolute left-[calc(50%+15px)] top-0 h-24 w-3 -translate-x-1/2 origin-bottom transition-transform duration-100 rounded-xl',
            'bg-gradient-to-b from-pink-400 to-pink-600',
            'shadow-[0_0_2px_rgba(236,72,153,0.5),0_0_4px_rgba(236,72,153,0.5),0_0_8px_rgba(236,72,153,0.5),0_0_12px_rgba(236,72,153,0.5),0_0_16px_rgba(236,72,153,0.5)]'
          )}
          style={{
            transform: `rotate(${getSwingAngle()}deg)`,
          }}
        />
      </div>
    </div>
  );
};

export { CheerleadingStick };

type TProps = {
  currentTime: number;
  beatList: number[];
  isPlaying: boolean;
};
