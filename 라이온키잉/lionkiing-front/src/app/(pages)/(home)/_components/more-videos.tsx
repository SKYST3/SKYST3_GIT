'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BandFinalInfo,
  BandPreliminaryInfo,
} from '@/app/_common/interfaces/band-info.interface';
import { useRouter } from 'next/navigation';
const dummyData = [1, 2, 3, 4, 5];
export default function MoreVideos({
  bandPreliminaryInfo,
}: {
  bandPreliminaryInfo: BandPreliminaryInfo[];
}) {
  const router = useRouter();
  return (
    <section className='w-full h-auto flex flex-col justify-center items-start gap-3'>
      <h1 className='text-2xl font-bold text-primary-yellow'>더 많은 무대</h1>
      <div className='w-full h-auto flex justify-start items-center gap-2 overflow-x-auto scrollbar-hide gap-4'>
        {bandPreliminaryInfo.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className='w-full h-auto flex flex-col items-start gap-2 cursor-pointer'
            onClick={() => {
              router.push(`/preliminary?videoId=${item.id}`);
            }}
          >
            <div className='relative w-25 h-auto flex flex-col justify-center items-start gap-2 overflow-x-auto scrollbar-hide aspect-square'>
              <img
                src={item.band.image}
                alt='more-videos'
                className='size-full object-cover rounded-xl'
              />
            </div>
            <div className='flex flex-col justify-start items-start gap-1 text-white'>
              <p className='text-xs'>{item.band.name}</p>
              <p className='text-xs'>점수: {item.voteCount}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
