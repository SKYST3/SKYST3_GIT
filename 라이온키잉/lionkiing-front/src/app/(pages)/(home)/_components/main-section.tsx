'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RankBoard from './rank-board';
import TVDropZone from './tv-dropzone';
import {
  BandFinalInfo,
  BandPreliminaryInfo,
} from '@/app/_common/interfaces/band-info.interface';
import MoreVideos from './more-videos';
export default function MainSection({
  bandFinalInfo,
  bandPreliminaryInfo,
}: {
  bandFinalInfo: BandFinalInfo[];
  bandPreliminaryInfo: BandPreliminaryInfo[];
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className='pt-4 w-full h-auto flex flex-col items-center gap-10'>
        <TVDropZone />
        <RankBoard bandFinalInfo={bandFinalInfo} />
        <MoreVideos bandPreliminaryInfo={bandPreliminaryInfo} />
      </main>
    </DndProvider>
  );
}
