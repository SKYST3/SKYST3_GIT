import { motion } from 'framer-motion';
import Image from 'next/image';
import RankBadge from './rank-badge';
import { BandFinalInfo } from '@/app/_common/interfaces/band-info.interface';
import { useDrag } from 'react-dnd';

export default function BandCard({
  rank,
  finalBandDetail,
  isDragPreview,
}: {
  rank: number | null;
  finalBandDetail: BandFinalInfo;
  isDragPreview?: boolean;
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'VIDEO_THUMB',
    item: { id: finalBandDetail.id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <motion.div
      className='z-10 relative w-40 aspect-[4/3] rounded-xl shadow-2xl cursor-pointer'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <img
        ref={dragRef as unknown as React.RefObject<HTMLImageElement>}
        src={finalBandDetail.band.image}
        alt={finalBandDetail.band.name}
        className={
          'z-20' +
          'absolute size-full object-cover rounded-xl cursor-grab' +
          (isDragging ? ' opacity-0' : '')
        }
      />
      {/* 그라데이션 효과 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-xl pointer-events-none'></div>
      {/* 랭크 표시 */}
      <p className='text-xl font-bold text-white absolute bottom-2 left-2'>
        #{rank}등
      </p>
    </motion.div>
  );
}
