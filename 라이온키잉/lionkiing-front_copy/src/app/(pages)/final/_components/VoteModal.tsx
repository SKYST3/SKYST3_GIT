'use client';

import { useState } from 'react';
import { submitVotes } from '@/app/_common/apis/submit-votes';

interface VoteModalProps {
  artistId: string;
  onClose: () => void;
  mileage: number;
  onVoteSuccess: () => void;
}

export default function VoteModal({
  artistId,
  onClose,
  mileage,
  onVoteSuccess,
}: VoteModalProps) {
  const [point, setPoint] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPoint(value);
      setError('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const numericPoint = Number(point);

    if (numericPoint < 1 || numericPoint > 50) {
      setError('1점 이상 50점 이하로 입력해주세요.');
      return;
    }

    if (numericPoint > mileage) {
      setError('보유 마일리지를 초과할 수 없습니다.');
      return;
    }

    try {
      setLoading(true);
      await submitVotes(artistId, numericPoint);
      onVoteSuccess();
      onClose(); // 투표 후 모달 닫기
    } catch (err) {
      setError('투표에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-md text-center w-[400px] relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold'
        >
          ×
        </button>

        <h2 className='text-xl font-bold mb-2'>마일리지</h2>
        <p className='text-sm text-gray-500 mb-4 text-[12px]'>
          마일리지는 최소 1점, 최대 50점까지 입력할 수 있으며, 현재 보유한
          마일리지는 {mileage}점입니다.
        </p>

        <div className='flex items-center justify-center mt-4'>
          <input
            type='number'
            inputMode='numeric'
            min={1}
            max={50}
            step={1}
            required
            value={point}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className='w-24 text-center border border-gray-300 rounded px-3 py-2 text-lg'
            placeholder='0'
          />
          <span className='ml-2 text-lg font-bold'>점</span>
        </div>

        {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-4 px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? '투표 중...' : '투표하기'}
        </button>
      </div>
    </div>
  );
}
