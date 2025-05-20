import type { RefObject } from 'react';
import { useMemo } from 'react';

const AudioPlayer = ({ audioRef, onEnded }: TProps) => {
  const audioElement = useMemo(
    () => (
      <audio
        ref={audioRef}
        src="/audio/to_you.mp3"
        onEnded={onEnded}
        className="hidden"
        preload="auto"
      />
    ),
    [audioRef, onEnded]
  );

  return audioElement;
};

export { AudioPlayer };

type TProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
  onEnded: () => void;
};
