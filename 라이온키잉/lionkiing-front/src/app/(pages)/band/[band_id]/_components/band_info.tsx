import React from 'react';

export default function Info({
  band,
  song_description,
}: {
  band: string;
  song_description: string;
}) {
  return (
    <div className='px-4 w-full h-fit flex justify-center items-center pb-20 rounded-b-4xl'>
      <div className='flex justify-center w-full h-fit pt-8 bg-black-300/50 text-white'>
        {band}
        {song_description}
      </div>
    </div>
  );
}
