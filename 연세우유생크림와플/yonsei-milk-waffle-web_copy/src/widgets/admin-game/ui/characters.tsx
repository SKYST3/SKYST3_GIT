import { Team } from '@/entities/team';
import { TEAM_INFO } from '@/entities/team';
import { cn } from '@/shared/lib/utils';
import { CheerleadingStick } from './cheerleading-stick';

type TProps = {
  currentTime: number;
  beatList: number[];
  isPlaying: boolean;
  className?: string;
};

const Characters = ({ currentTime, beatList, isPlaying, className }: TProps) => {
  return (
    <div className={cn('flex justify-between items-end gap-20 max-w-[800px] mx-auto', className)}>
      <Seorini currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      <Nupjugi currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      <Yonsuri currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      <Tiger currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
    </div>
  );
};

export { Characters };

type TCharacterProps = TProps;

const Nupjugi = ({ currentTime, beatList, isPlaying }: TCharacterProps) => (
  <div className="relative">
    <div className="relative">
      <img
        src={TEAM_INFO[Team.KAIST].character}
        alt="KAIST Character"
        className="w-[200px] h-[200px] object-contain"
      />
      <div className="absolute top-3 left-1/2 -translate-x-1/2">
        <CheerleadingStick currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      </div>
    </div>
  </div>
);

const Yonsuri = ({ currentTime, beatList, isPlaying }: TCharacterProps) => (
  <div className="relative">
    <div className="relative">
      <img
        src={TEAM_INFO[Team.YONSEI].character}
        alt="Yonsei University Character"
        className="w-[200px] h-[200px] object-contain"
      />
      <div className="absolute top-3 left-3/4 -translate-x-1/2">
        <CheerleadingStick currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      </div>
    </div>
  </div>
);

const Seorini = ({ currentTime, beatList, isPlaying }: TCharacterProps) => (
  <div className="relative">
    <div className="relative">
      <img
        src={TEAM_INFO[Team.SEOUL].character}
        alt="Seoul University Character"
        className="w-[220px] h-[220px] object-contain"
      />
      <div className="absolute top-5 left-1/2 -translate-x-1/2">
        <CheerleadingStick currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      </div>
    </div>
  </div>
);

const Tiger = ({ currentTime, beatList, isPlaying }: TCharacterProps) => (
  <div className="relative">
    <div className="relative">
      <img
        src={TEAM_INFO[Team.KOREA].character}
        alt="Korea University Character"
        className="w-[200px] h-[200px] object-contain"
      />
      <div className="absolute top-6 left-1/3 -translate-x-1/2">
        <CheerleadingStick currentTime={currentTime} beatList={beatList} isPlaying={isPlaying} />
      </div>
    </div>
  </div>
);
