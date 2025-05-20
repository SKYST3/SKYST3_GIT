export const calculateGameEndTime = ({
  gameStartTime,
  songLength,
}: {
  gameStartTime: number;
  songLength: number;
}) => {
  const songLengthMs = songLength * 1000;
  return gameStartTime + songLengthMs;
};
