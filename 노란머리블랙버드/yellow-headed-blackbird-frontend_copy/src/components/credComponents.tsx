import GrayStopwatch from '../assets/icons/ic_stopwatch_gray.svg';
import WhiteStopwatch from '../assets/icons/ic_stopwatch_white.svg';
import GrayCoffee from '../assets/icons/ic_coffee_gray.svg';

export interface ITask {
  taskData: {
    order: number;
    title: string;
    start_time: string;
    finished_time: string;
    due_time: string;
  };
}
export interface ICaff {
  caffData: {
    amount: number;
    description: string;
    timestamp: string;
  };
}

const ClockImgWhite = () => (
  <img src={WhiteStopwatch} className="w-5 h-5 mr-1" alt="clockImg" />
);
export const ClockImgGray = () => (
  <img src={GrayStopwatch} className="w-5 h-5 mr-1" alt="clockImg" />
);
const CoffeeImg = () => (
  <img src={GrayCoffee} className="w-8 h-8 mr-1" alt="coffeeImg" />
);
export const CoffeeImgSmall = () => (
  <img src={GrayCoffee} className="w-5 h-5 mr-1" alt="coffeeImg" />
);
const ShortTime = (time: string) => time.slice(11, 19);

export function TaskItem({ taskData }: ITask) {
  const offsetSec = // 시간 차(초 단위)
    (new Date(taskData.finished_time).getTime() -
      new Date(taskData.due_time).getTime()) /
    1000;
  const isPos = offsetSec > 0;
  const abs = isPos ? offsetSec : -offsetSec;
  const h = Math.floor(abs / 3600);
  const m = Math.floor(abs / 60) % 60;
  const s = abs % 60;
  const offsetStr =
    (isPos ? '+' : '-') +
    (h > 0 ? `${h}시간 ` : '') +
    (m > 0 ? `${m}분 ` : '') +
    `${s}초`;

  return (
    <div className="p-6 border-2 rounded-lg text-left space-y-2">
      <h2>{taskData.title}</h2>
      <div className="flex items-center text-[#969696]">
        <ClockImgGray />
        <div className="mr-3">시작 시간: {ShortTime(taskData.start_time)}</div>
        <ClockImgGray />
        목표 시간: {ShortTime(taskData.due_time)}
      </div>
      <div className="flex items-center">
        <ClockImgWhite />
        종료 시간:{' '}
        {ShortTime(taskData.finished_time ? taskData.finished_time : '')}
        <div className="ml-2">
          {offsetSec > 0 ? (
            <span className="text-red-300">({offsetStr})</span>
          ) : (
            <span className="text-green-300">({offsetStr})</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function CaffeineItem({ caffData }: ICaff) {
  return (
    <div className="p-6 border-2 rounded-lg text-left space-y-2">
      <div className="flex items-center">
        <CoffeeImg />
        <div className="ml-2">{caffData.description}</div>
        <div className="ml-auto flex items-center">
          {`. . . ${caffData.amount}mg`}
        </div>
        <div className="ml-2 flex items-center text-[#969696]">
          {`(`}
          {`${ShortTime(caffData.timestamp)})`}
        </div>
      </div>
    </div>
  );
}
