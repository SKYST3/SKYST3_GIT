'use client';

import { useDrop } from 'react-dnd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TVDropZone() {
  const router = useRouter();

  const [, dropRef] = useDrop({
    accept: 'VIDEO_THUMB',
    drop: (item: { id: string }) => {
      router.push(`/band/${item.id}`);
    },
  });

  return (
    <div
      ref={dropRef as unknown as React.RefObject<HTMLDivElement>}
      className='relative w-full h-auto'
      style={{
        width: '100%',
        height: 200,
        border: '4px dashed #666',
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <img
        src={'/images/tv-dropzone.jpg'}
        alt='tv-background'
        className='size-full object-cover'
      />
    </div>
  );
}
