'use client';
import { getUserVote } from '@/app/_common/apis/user-vote';
import { mockUser } from '@/app/_core/data/mock-user';
import Image from 'next/image';
import { useEffect } from 'react';
export default function ProfileInfo() {
  const user = mockUser;

  return (
    <div className='relative w-full h-[30%]'>
      <div
        style={{
          backgroundImage: 'url(/images/mypage-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1.0,
          zIndex: -1,
          borderRadius: '40px 40px 0 0',
        }}
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl pointer-events-none'></div>
      <div className='px-8 py-2 absolute bottom-2  w-full h-auto flex items-end justify-start gap-4'>
        <img
          src={
            'https://velog.velcdn.com/images/bokdol11859/post/7410acc4-0834-4e64-ba57-6a22173c261c/image.png'
          }
          alt='profile'
          className='size-[100px] rounded-2xl'
        />
        <div className='flex flex-col gap-2 text-primary-yellow'>
          <h2>{user.name}</h2>
          <p>{user.username}</p>
        </div>
      </div>
    </div>
  );
}
