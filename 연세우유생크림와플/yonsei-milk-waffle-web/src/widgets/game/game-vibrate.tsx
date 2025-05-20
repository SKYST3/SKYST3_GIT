import { useEffect, useRef, useState } from 'react';

export const GameVibrate = ({
  isShacked,
  resultBeatList,
}: {
  isShacked: boolean;
  resultBeatList: number[] | null;
}) => {
  const PERFECT_THRESHOLD = 400; // ms
  const GOOD_THRESHOLD = 900; // ms

  const [signal, setSignal] = useState<'perfect' | 'good' | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const vibrateButtonRef = useRef<HTMLButtonElement>(null);
  const goodVibrateButtonRef = useRef<HTMLButtonElement>(null);
  const perfectVibrateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isShacked || !resultBeatList?.length) return;

    const now = Date.now();
    const minDiff = Math.min(...resultBeatList.map((t) => Math.abs(now - t)));

    if (minDiff <= PERFECT_THRESHOLD) {
      setSignal('perfect');
      perfectVibrateButtonRef.current?.click();
    } else if (minDiff <= GOOD_THRESHOLD) {
      setSignal('good');
      goodVibrateButtonRef.current?.click();
    } else {
      setSignal(null);
    }

    const timer = setTimeout(() => setSignal(null), 100);
    return () => clearTimeout(timer);
  }, [isShacked, resultBeatList]);

  return (
    <>
      <div className="absolute top-1/3 w-full flex justify-center z-50 pointer-events-none">
        {signal === 'perfect' && (
          <div className="text-[80px] font-bold text-green-500 animate-bounce">PERFECT!</div>
        )}
        {signal === 'good' && (
          <div className="text-[80px]4 font-bold text-yellow-500 animate-bounce">GOOD!</div>
        )}
      </div>
      <div className="flex flex-col gap-3 text-center">
        <div>
          <p className="text-sm text-gray-900">진동 모드를 켜면 더 재미있는 플레이가 가능해요.</p>
          <p className="text-sm text-gray-900">(안드로이드 크롬에서만 사용 가능합니다.)</p>
        </div>
        <button
          ref={vibrateButtonRef}
          type="button"
          onClick={() => {
            setIsClicked(true);
            navigator.vibrate(300);
          }}
          disabled={isClicked}
          className="w-full bg-blue-800 text-white py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          진동 모드 사용하기
        </button>
        <button
          ref={goodVibrateButtonRef}
          type="button"
          onClick={() => navigator.vibrate(150)}
          className="hidden"
        >
          GOOD 진동
        </button>
        <button
          ref={perfectVibrateButtonRef}
          type="button"
          onClick={() => navigator.vibrate(300)}
          className="hidden"
        >
          PERFECT 진동
        </button>
      </div>
    </>
  );
};
