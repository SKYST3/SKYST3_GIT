// 현재 시각을 밀리초 단위의 Unix 타임스탬프로 반환합니다.
export const getCurrentUnixTime = () => {
  return Date.now();
};

// 특정 날짜를 밀리초(ms) 단위의 Unix 타임스탬프로 변환
export const getDateToUnix = ({ date }: { date: Date | string }) => {
  return new Date(date).getTime();
};

// Unix 타임스탬프를 Date 객체로 변환
export const getUnixToTime = ({ timestamp }: { timestamp: number }) => {
  return new Date(timestamp);
};
