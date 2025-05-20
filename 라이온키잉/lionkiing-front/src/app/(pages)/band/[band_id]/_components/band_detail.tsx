import React, { useEffect, useState } from 'react';

export default function Detail({
  song_title,
  album_cover,
  band,
}: {
  song_title: string;
  album_cover: string;
  band: string;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted && !album_cover) return null;

  return (
    <div className='w-full h-full relative flex justify-center items-center'>
      {/* 🔽 배경 그라데이션 레이어 */}
      <div className='absolute inset-0 z-0 bg-gradient-to-t from-transparent to-black opacity-60' />

      {/* 🔽 실제 콘텐츠 */}
      <div className='flex justify-center items-start w-full z-10'>
        <div className='flex-1'>
          <div className='flex justify-between items-center p-3'>
            <div className='flex items-center gap-4'>
              <div className='w-16'>
                {album_cover && <img src={album_cover} alt='앨범커버' />}
              </div>
              <div className='flex flex-col justify-center'>
                <div className='text-l text-white'>{song_title}</div>
                <div className='text-m text-white'>{band}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
