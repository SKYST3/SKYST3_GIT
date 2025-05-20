'use client';

import { motion } from 'framer-motion';
import BandCard from './band-card';
import { BandFinalInfo } from '@/app/_common/interfaces/band-info.interface';

export default function RankBoard({
  bandFinalInfo,
}: {
  bandFinalInfo: BandFinalInfo[];
}) {
  return (
    <section className='w-full h-auto flex justify-start items-center gap-8 overflow-auto scrollbar-hide'>
      {bandFinalInfo.map((band, index) => (
        <motion.div
          key={band.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='relative w-full h-auto flex justify-center items-center mx-auto'
        >
          <BandCard rank={index + 1} finalBandDetail={band} />
        </motion.div>
      ))}
    </section>
  );
}
