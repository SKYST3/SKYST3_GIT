import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { Play } from 'lucide-react';

const GameControls = ({ isPlaying, onStart, remainingTime }: TProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button onClick={onStart} disabled={isPlaying}>
        <Play className={cn(isPlaying && 'opacity-30')} />
      </Button>

      <div className="text-lg">남은 시간: {remainingTime.toFixed(1)}초</div>
    </div>
  );
};

export { GameControls };

type TProps = {
  isPlaying: boolean;
  onStart: () => void;
  remainingTime: number;
};
