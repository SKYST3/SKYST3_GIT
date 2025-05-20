import { useEffect } from 'react';
import { useState } from 'react';
import { voteVideo } from '@/app/_common/apis/user-vote';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { BandPreliminaryInfo } from '@/app/_common/interfaces/band-info.interface';
import { getBandPreliminaryInfo } from '@/app/_common/apis/band-preliminary-info';
import Image from 'next/image';
import ReactPlayer from 'react-player';

export default function PreSuspenseComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  const handleVote = async (videoId: string) => {
    await voteVideo(videoId, 1);
  };
  const voteButtonColor = [
    'bg-silver/50',
    'bg-green-500/50',
    'bg-silver/50',
    'bg-green-500/50',
    'bg-red-500/50',
  ];
  const [preBandInfo, setPreBandInfo] = useState<BandPreliminaryInfo[]>([]);

  useEffect(() => {
    const fetchPreBandInfo = async () => {
      const response = await getBandPreliminaryInfo();
      if (videoId) {
        // videoId가 있는 경우 해당 밴드를 찾아서 맨 앞으로 정렬
        const targetBand = response.find(band => band.id === videoId);
        if (targetBand) {
          const filteredBands = response.filter(band => band.id !== videoId);
          setPreBandInfo([targetBand, ...filteredBands]);
        } else {
          setPreBandInfo(response);
        }
      } else {
        // videoId가 없는 경우 첫 번째 response의 videoId를 쿼리 파라미터로 설정
        if (response.length > 0) {
          const firstVideoId = response[0].id;
          router.replace(`/preliminary?videoId=${firstVideoId}`);
        }
        setPreBandInfo(response);
      }
    };
    void fetchPreBandInfo();
  }, [videoId, router]);
  return (
    <div className='relative h-screen overflow-y-scroll snap-y snap-mandatory'>
      {preBandInfo.map((item, index) => (
        <div
          key={item.band.id}
          className='relative w-full h-screen snap-start flex items-center justify-center'
        >
          <img
            src='/images/preliminary-background.jpg'
            alt='preliminary-background'
            className='absolute size-full object-fill rounded-4xl'
          />
          <section className='relative w-full h-full flex items-center justify-center rounded-4xl'>
            <Suspense fallback={<div>Loading...</div>}>
              <ReactPlayer
                url={item.url}
                controls
                style={{
                  paddingRight: '20px',
                  width: '100%',
                  height: '100%',
                  transform: 'rotate(90deg)',
                }}
              />
            </Suspense>
          </section>
        </div>
      ))}
      <div className='absolute bottom-32 left-0 right-0 w-full flex px-7 justify-between items-center h-14 bg-white/30'>
        {voteButtonColor.map((color, index) => (
          <button
            key={index}
            className={`w-13 h-10 rounded-full animate-pulse ${voteButtonColor[index]}`}
            onClick={() => handleVote(String(videoId))}
          ></button>
        ))}
      </div>
    </div>
  );
}
