const BEAT_LIST_STORAGE_KEY = 'waffle-beat-list';

export const setStorage = ({
  key,
  value,
}: {
  key: 'BEAT_LIST';
  value: { time: number; x: number }[];
}) => {
  if (key === 'BEAT_LIST') {
    sessionStorage.setItem(BEAT_LIST_STORAGE_KEY, JSON.stringify(value));
  }
};

export const getStorage = ({
  key,
}: {
  key: 'BEAT_LIST';
}): { time: number; x: number }[] | null => {
  if (key === 'BEAT_LIST') {
    const raw = sessionStorage.getItem(BEAT_LIST_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as { time: number; x: number }[];
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  }
  return null;
};

export const clearStorage = () => {
  sessionStorage.clearStorage();
};
