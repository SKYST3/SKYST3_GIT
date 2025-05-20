import { getCurrentUnixTime } from '@/shared/lib/date';
import { useRef, useEffect, useCallback, useState } from 'react';
import type { Dispatch } from 'react';
import { cn } from '@/shared/lib/utils';

interface DeviceMotionEventConstructor {
  new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
  prototype: DeviceMotionEvent;
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

const isDeviceMotionEventWithPermission = (
  event: typeof DeviceMotionEvent
): event is DeviceMotionEventConstructor => {
  return 'requestPermission' in event;
};

export const GameMotionCheck = ({
  setUserBeatList,
  setUserBeatHistory,
  isShacked,
  setIsShacked,
}: {
  setUserBeatList: Dispatch<React.SetStateAction<number[]>>;
  setUserBeatHistory: Dispatch<React.SetStateAction<{ time: number; x: number }[]>>;
  isShacked: boolean;
  setIsShacked: (input: boolean) => void;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const startTime = useRef<number | null>(null);
  const userMovements = useRef<number[]>([]);
  const isIgnore = useRef(false);

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || startTime.current === null) return;

      const currentTime = Date.now() - startTime.current;
      const x = acceleration.x ?? 0;

      const threshold = 40;
      setUserBeatHistory((prev) => [...prev, { time: currentTime, x }]);

      // ignore 중이면 감지하지 않음
      if (isIgnore.current) {
        // 다시 threshold 아래로 떨어졌는지 확인
        if (Math.abs(x) < threshold) {
          isIgnore.current = false; // 감지 다시 허용
        }
        return;
      }

      // threshold 초과시 감지 + ignore 활성화
      if (Math.abs(x) >= threshold) {
        const last = userMovements.current.at(-1);
        if (!last || currentTime - last > 200) {
          userMovements.current.push(currentTime);
          setUserBeatList((prev) => [...prev, getCurrentUnixTime()]);
          setIsShacked(true);
          isIgnore.current = true;

          setTimeout(() => setIsShacked(false), 100); // 300ms 후 원래 크기로 복귀
        }
      }
    },
    [setUserBeatHistory, setUserBeatList, setIsShacked]
  );

  const startDetection = useCallback(() => {
    userMovements.current = [];
    setUserBeatList([]);
    startTime.current = Date.now();

    window.addEventListener('devicemotion', handleMotion);
  }, [handleMotion, setUserBeatList]);

  const checkSensorPermission = useCallback(() => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      isDeviceMotionEventWithPermission(DeviceMotionEvent)
    ) {
      if (DeviceMotionEvent.requestPermission) {
        DeviceMotionEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              startDetection();
            } else {
              alert('센서 접근 권한이 필요합니다.');
            }
          })
          .catch(console.error);
      }
    } else {
      startDetection();
    }
  }, [startDetection]);

  useEffect(() => {
    checkSensorPermission();
  }, [checkSensorPermission]);

  return (
    <>
      <p className="text-2xl font-bold">폰을 좌우로 흔들어보세요!</p>
      <div
        className={cn(
          'w-48 h-48 rounded-full bg-blue-500 transition-transform duration-300 ease-out',
          isShacked ? 'scale-150' : 'scale-100'
        )}
      />
      <div className="flex flex-col gap-2 text-center">
        <div>
          <p className="text-sm text-gray-900">아이폰 사용자는 꼭 눌러주세요!</p>
        </div>
        <button
          type="button"
          onClick={() => {
            checkSensorPermission();
            setIsClicked(true);
          }}
          disabled={isClicked}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-[267px] font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          센서 이용 허가하기
        </button>
      </div>
    </>
  );
};
