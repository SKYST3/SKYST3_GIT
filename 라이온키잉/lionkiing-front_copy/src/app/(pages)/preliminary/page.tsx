'use client';

import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BandPreliminaryInfo } from '@/app/_common/interfaces/band-info.interface';
import { getBandPreliminaryInfo } from '@/app/_common/apis/band-preliminary-info';
import { useSearchParams } from 'next/navigation';
import { voteVideo } from '@/app/_common/apis/user-vote';
import PreSuspenseComponent from './_components/pre-suspense-component';
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false, // 서버에선 빈 자리에 fallback(없음)만 찍힘
});

export default function PreliminaryPage() {
  return (
    <Suspense fallback={null}>
      <PreSuspenseComponent />
    </Suspense>
  );
}
