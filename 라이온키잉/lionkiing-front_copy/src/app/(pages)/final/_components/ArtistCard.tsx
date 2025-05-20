'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDrag } from 'react-dnd';

interface ArtistCardProps {
  id: string;
  name: string;
  image: string;
  score: number;
  onVote: () => void;
  voted: boolean;
}

export default function ArtistCard({
  id,
  name,
  image,
  score,
  onVote,
  voted,
}: ArtistCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/band/${id}`);
  };
  const [{ isDragging }, dragRef] = useDrag({
    type: 'VIDEO_THUMB',
    item: { id: id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div className='w-[100px] bg-white shadow-md rounded-xl p-3 flex flex-col items-center space-y-1'>
      <div
        className='w-[80px] h-[80px] relative cursor-pointer'
        onClick={handleClick}
      >
        <img
          ref={dragRef as unknown as React.RefObject<HTMLImageElement>}
          src={image}
          alt={name}
          className='size-full object-cover rounded-md'
        />
      </div>
      <h3 className='text-center text-xs font-semibold break-keep'>{name}</h3>
      <p className='text-[11px]'>점수: {score}</p>
      <button
        onClick={onVote}
        className={`w-full py-1 text-xs rounded-md text-white font-semibold ${
          voted
            ? 'bg-green-400 cursor-not-allowed'
            : 'bg-gray-400 hover:bg-gray-600'
        }`}
        disabled={voted}
      >
        {voted ? '투표완료' : '투표하기'}
      </button>
    </div>
  );
}
