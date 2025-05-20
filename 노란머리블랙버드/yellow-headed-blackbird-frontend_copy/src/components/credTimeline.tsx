import {
  ClockImgGray,
  CoffeeImgSmall,
  type ICaff,
  type ITask,
} from './credComponents';

export interface ITimeLine {
  created_time: string;
  ended_time: string;
  tasksData: {
    order: number;
    title: string;
    start_time: string;
    finished_time: string;
    due_time: string;
  }[];
  caffsData: {
    amount: number;
    description: string;
    timestamp: string;
  }[];
}

export function Timeline({
  created_time,
  ended_time,
  tasksData,
  caffsData,
}: ITimeLine) {
  const created = new Date(created_time);
  const ended = new Date(ended_time);

  const jajeong = new Date(2025, 4, 11, 0, 0, 0);
  const sunrise = new Date(2025, 4, 11, 5, 27, 0);

  function getTimeString(time: Date) {
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    return `${h <= 9 ? '0' : ''}${h}:${m <= 9 ? '0' : ''}${m}:${s <= 9 ? '0' : ''}${s}`;
  }

  const tlStartTime = created < jajeong ? created : jajeong;
  const tlEndTime = ended > sunrise ? ended : sunrise;
  const tlInterval = tlEndTime.getTime() - tlStartTime.getTime();

  const tlMaxX = 25.0;
  const tlMaxY = 30.0;

  function TaskMarker({ taskData }: ITask) {
    const markerTimeText = taskData.finished_time.slice(11, 19);
    const markerTime = new Date(taskData.finished_time).getTime();
    const markerY =
      ((markerTime - tlStartTime.getTime()) / tlInterval) * tlMaxY;

    return (
      <>
        <div
          className="absolute rounded-full bg-white w-[1.5em] h-1"
          style={{
            left: '10em',
            top: `${markerY}em`,
          }}
        ></div>
        <div
          className="absolute flex items-center w-[16em] text-left"
          style={{
            left: '12em',
            top: `${markerY - 0.7}em`,
          }}
        >
          <div>{taskData.title}</div>
          <div className="ml-2 flex items-center text-[#969696]">
            <ClockImgGray />
            {markerTimeText}
          </div>
        </div>
      </>
    );
  }

  function CaffMarker({ caffData }: ICaff) {
    const markerTimeText = caffData.timestamp.slice(11, 19);
    const markerTime = new Date(caffData.timestamp).getTime();
    const markerY =
      ((markerTime - tlStartTime.getTime()) / tlInterval) * tlMaxY;

    return (
      <>
        <div
          className="absolute rounded-full bg-[#969696] w-[1.5em] h-1"
          style={{
            left: '10em',
            top: `${markerY}em`,
          }}
        ></div>
        <div
          className="absolute flex items-center w-[16em] text-left"
          style={{
            left: '11.5em',
            top: `${markerY - 0.7}em`,
          }}
        >
          <div className="ml-2 flex items-center text-[#969696] text-sm">
            <CoffeeImgSmall />
            {`${caffData.description}, ${markerTimeText}`}
          </div>
        </div>
      </>
    );
  }

  function StartEndMarker({
    markerTime,
    title,
  }: {
    markerTime: Date;
    title: string;
  }) {
    const markerY =
      ((markerTime.getTime() - tlStartTime.getTime()) / tlInterval) * tlMaxY;

    return (
      <>
        <div
          className="absolute rounded-full bg-white w-[3.5em] h-1"
          style={{
            left: '10em',
            top: `${markerY}em`,
          }}
        ></div>
        <div
          className="absolute flex items-center w-[16em] text-left"
          style={{
            left: '14em',
            top: `${markerY - 0.7}em`,
          }}
        >
          <div>{title}</div>
          <div className="ml-2 flex items-center text-[#969696]">
            <ClockImgGray />
            {getTimeString(markerTime)}
          </div>
        </div>
      </>
    );
  }

  function NatureMarker({
    markerTime,
    title,
  }: {
    markerTime: Date;
    title: string;
  }) {
    const markerY =
      ((markerTime.getTime() - tlStartTime.getTime()) / tlInterval) * tlMaxY;

    return (
      <>
        <div
          className="absolute rounded-full bg-[#969696] w-[1.5em] h-1"
          style={{
            right: `${tlMaxX - 8.5}em`,
            top: `${markerY}em`,
          }}
        ></div>
        <div
          className="absolute w-[6.5em] text-right"
          style={{
            left: `0em`,
            top: `${markerY - 1.5}em`,
          }}
        >
          <div>{title}</div>
          <div className="flex items-center justify-end text-[#969696]">
            <ClockImgGray />
            {getTimeString(markerTime)}
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className={`relative mx-auto my-8`}
      style={{
        width: `${tlMaxX}em`,
        height: `${tlMaxY}em`,
      }}
    >
      <div
        className="absolute z-10 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-500 rounded-full"
        style={{
          left: '8em',
          width: '0.5em',
          height: `${tlMaxY + 0.2}em`,
        }}
      />
      <div
        className="absolute z-10 bg-white rounded-full"
        style={{
          left: '10em',
          width: '0.5em',
          height: `${tlMaxY + 0.2}em`,
        }}
      />

      <StartEndMarker markerTime={created} title={'밤샘 시작'} />
      <StartEndMarker markerTime={ended} title={'밤샘 끝'} />

      <NatureMarker markerTime={jajeong} title={'자정'} />
      <NatureMarker markerTime={sunrise} title={'일출'} />

      {caffsData.map((data: any, key: number) => (
        <CaffMarker key={key} caffData={data} />
      ))}
      {tasksData.map((data: any, key: number) => (
        <TaskMarker key={key} taskData={data} />
      ))}
    </div>
  );
}
