'use client';

import { BsCoin } from 'react-icons/bs';

interface MileageProps {
  mileage: number | null;
}

export default function Mileage({ mileage }: MileageProps) {
  return (
    <div className='flex items-center justify-between px-3 py-2 border-2 border-blue-500 rounded-md max-w-[400px] mx-auto mt-2 mb-5 bg-white shadow'>
      <span className='text-sm font-medium text-gray-700'>남은 마일리지</span>
      <span className='flex items-center gap-2 font-bold text-black'>
        <BsCoin className='text-yellow-500' /> X{' '}
        {typeof mileage === 'number' ? mileage : '-'}
      </span>
    </div>
  );
}
