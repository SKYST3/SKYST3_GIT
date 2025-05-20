/* eslint-disable */

'use client';
import React, { useEffect, useState } from 'react';
import Video from '@/app/(pages)/band/[band_id]/_components/band_video';
import Detail from '@/app/(pages)/band/[band_id]/_components/band_detail';
import Info from '@/app/(pages)/band/[band_id]/_components/band_info';
import BackButton from './_components/band_backButton';

import { useParams } from 'next/navigation';
import { getVideoDetailInfo } from '@/app/_common/apis/band-detail-info';
import {
  Video as IVideo,
  VideoDetail,
} from '@/app/_common/interfaces/video.interface';
import dynamic from 'next/dynamic';

export default function bandDetail() {
  const [video, setVideo] = useState<VideoDetail>();
  const param: { band_id: string } = useParams();

  useEffect(() => {
    const fetchVideoDetail = async () => {
      const response = await getVideoDetailInfo(param.band_id);
      setVideo(response);
    };
    void fetchVideoDetail();
  }, [param.band_id]);

  return (
    <div className='w-full flex justify-center items-start flex-col gap-1 bg-[url("/images/main-background.jpg")] rounded-4xl'>
      <div className='absolute top-0 z-1 p-2'>
        <BackButton />
      </div>
      <div className='w-full flex-1 flex-col rounded-t-4xl'>
        <Video url={video?.url ?? ''} />
        <Detail
          song_title={video?.song_title ?? ''}
          band={video?.band.name}
          album_cover={video?.album_cover ?? ''}
        />
      </div>
      <div className=' w-full aspect-[3/2] pt-2'>
        <img
          className='w-full aspect-[3/2] rounded-[5%]'
          src={video?.band.image}
          alt='프로필'
        />
      </div>
      <Info
        band={video?.band.description ?? ''}
        song_description={video?.song_description ?? ''}
      />
    </div>
  );
}
