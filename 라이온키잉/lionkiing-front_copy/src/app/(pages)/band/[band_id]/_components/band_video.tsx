import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false, // 서버에선 빈 자리에 fallback(없음)만 찍힘
});

export default function Video({ url }: { url: string }) {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='flex justify-center items-center w-full aspect-[16/9] bg-red-100 relative'>
        <Suspense fallback={null}>
          <ReactPlayer url={url} controls preload='none' />
        </Suspense>
      </div>
    </div>
  );
}
