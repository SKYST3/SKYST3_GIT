import { cn } from '@/shared/lib/utils';

const BeatTrack = ({ currentTime, beatList, isPlaying }: TProps) => {
  // Calculate visible beats (current time ± 2 seconds)
  const visibleBeats = beatList.filter(
    (beat) => beat / 1000 >= currentTime - 2 && beat / 1000 <= currentTime + 2
  );

  return (
    <div
      className="relative h-24 w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(90deg, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(239,68,68,0.15) 100%)',
      }}
    >
      {/* Center line */}
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-400 via-white to-red-400 shadow-[0_0_24px_8px_rgba(59,130,246,0.2)] z-10" />

      {/* Moving track */}
      <div
        className="absolute top-0 h-full w-full"
        style={{
          transform: `translateX(${50 - currentTime * 100}%)`,
          transition: isPlaying ? 'none' : 'transform 0.1s linear',
        }}
      >
        {/* Beat markers */}
        {visibleBeats.map((beat) => {
          const beatInSeconds = beat / 1000;
          const isCenter = Math.abs(beatInSeconds - currentTime) < 0.05;
          return (
            <div
              key={beat}
              className={cn(
                'absolute top-1/2 -translate-y-1/2 left-0 z-20 flex items-center justify-center'
              )}
              style={{ left: `${beatInSeconds * 100}%` }}
            >
              {/* Pop effect */}
              <span
                className={cn(
                  'pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  isCenter && 'animate-beat-pop'
                )}
                style={{
                  width: isCenter ? 120 : 0,
                  height: isCenter ? 120 : 0,
                  borderRadius: '50%',
                  background: isCenter
                    ? 'radial-gradient(rgba(59,130,246,0.25), rgba(239,68,68,0.18), transparent 70%)'
                    : 'none',
                  opacity: isCenter ? 1 : 0,
                  transition: 'opacity 0.2s, width 0.2s, height 0.2s',
                  filter: isCenter ? 'blur(2px)' : undefined,
                }}
              />
              {/* Beat note */}
              <div
                className={cn(
                  'relative h-16 w-16 rounded-full border-4 border-blue-400 bg-white shadow-lg flex items-center justify-center transition-transform duration-100',
                  isCenter &&
                    'scale-150 shadow-[0_0_32px_8px_rgba(59,130,246,0.5),0_0_64px_16px_rgba(239,68,68,0.3)]'
                )}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-red-400 shadow-[0_0_16px_4px_rgba(59,130,246,0.5)]" />
              </div>
            </div>
          );
        })}
      </div>
      {/* CSS for pop animation */}
      <style>{`
        .animate-beat-pop {
          animation: beat-pop 0.38s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes beat-pop {
          0% {
            opacity: 0.7;
            transform: scale(0.5) translate(-50%, -50%);
          }
          60% {
            opacity: 1;
            transform: scale(1.2) translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: scale(2.2) translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
};

export { BeatTrack };

type TProps = {
  currentTime: number;
  beatList: number[];
  isPlaying: boolean;
};
