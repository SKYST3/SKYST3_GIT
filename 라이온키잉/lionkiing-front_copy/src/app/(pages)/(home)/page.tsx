import SearchBar from './_components/search-bar';
import RankBoard from './_components/rank-board';
import { getBandFinalInfo } from '@/app/_common/apis/band-final-info';
import { getBandPreliminaryInfo } from '@/app/_common/apis/band-preliminary-info';
import TVDropZone from './_components/tv-dropzone';
import MainSection from './_components/main-section';
import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const bandFinalInfo = await getBandFinalInfo();
  const bandPreliminaryInfo = await getBandPreliminaryInfo();

  return (
    <div className='relative px-8 pt-4 pb-20 w-full h-full flex flex-col gap-4 items-start rounded-4xl overflow-y-auto  scrollbar-hide'>
      <div
        style={{
          backgroundImage: 'url(/images/main-background.jpg)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 1.0,
          zIndex: -1,
          borderRadius: '40px',
        }}
      />

      {/* header text */}
      <header className='w-full h-auto flex justify-start items-center gap-3'>
        <p className='text-2xl font-bold text-primary-yellow'>2025 청춘무대</p>
        <Link href='/final'>
          <CircleChevronRight className='size-6 text-black bg-white rounded-full' />
        </Link>
      </header>
      <MainSection
        bandFinalInfo={bandFinalInfo}
        bandPreliminaryInfo={bandPreliminaryInfo}
      />
    </div>
  );
}
