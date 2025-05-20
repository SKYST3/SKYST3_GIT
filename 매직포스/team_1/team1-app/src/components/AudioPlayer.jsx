import React from 'react';

const AudioPlayer = () => {
  return (
    <div>
      <h1>Audio Player</h1>
      <audio controls>
        <source src="your-audio-file-url.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
