'use client';

import { getUserVote } from '@/app/_common/apis/user-vote';
import MyPageTab from './_components/mypage-tab';
import ProfileInfo from './_components/profile-info';
import { useEffect, useState } from 'react';
import { Video } from '@/app/_common/interfaces/video.interface';

export default function MyPage() {
  const [videoList, setVideoList] = useState<Video[]>([]);
  useEffect(() => {
    const fetchUserVote = async () => {
      const userVote = await getUserVote();
      console.log(userVote);
      setVideoList(userVote);
    };
    void fetchUserVote();
  }, []);
  return (
    <div className='w-full h-full flex flex-col'>
      <ProfileInfo />
      <MyPageTab video={videoList} />
    </div>
  );
}
