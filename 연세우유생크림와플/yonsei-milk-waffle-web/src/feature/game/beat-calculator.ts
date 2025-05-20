import type { Timestamp } from '@/entities/time/Timestamp';
import { getCurrentUnixTime } from '@/shared/lib/date';

export const getUpdatedTimstamp = ({
  userBeatList,
}: {
  userBeatList: Timestamp[];
}) => {
  return [...userBeatList, getCurrentUnixTime()];
};
