'use client';

import { useEffect, useState } from 'react';
import ArtistGrid from './_components/ArtistGrid';
import PageHeader from './_components/PageHeader';
import VoteModal from './_components/VoteModal';
import { getBandFinalInfo } from '@/app/_common/apis/band-final-info';
import { getAvailableVotes } from '@/app/_common/apis/available-votes';
import { BandFinalInfo } from '@/app/_common/interfaces/band-info.interface';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TVDropZone from '../(home)/_components/tv-dropzone';
import RankBoard from '../(home)/_components/rank-board';
import VoteSection from './_components/Votesection';
import Mileage from './_components/Mileage';

interface Artist {
  id: string;
  name: string;
  image: string;
  score: number;
}

export default function Final() {
  const [refetch, setRefetch] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [bandFinalInfo, setBandFinalInfo] = useState<BandFinalInfo[]>([]);
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [mileage, setMileage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const bandData = await getBandFinalInfo();
      setBandFinalInfo(bandData);

      const mapped = bandData.map(band => ({
        id: band.id,
        name: band.band.name,
        image: band.band.image,
        score: band.voteCount ?? 0,
      }));
      setArtists(mapped);

      const mileageData = await getAvailableVotes();
      setMileage(mileageData.availableVotes);
    };

    fetchData();
  }, [refetch]);

  const handleVote = (id: string) => {
    setSelectedId(id);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  return (
    <div
      className='p-8 rounded-4xl'
      style={{
        backgroundImage: 'url(/images/final-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <PageHeader title='2025 청춘무대 본선' />
        <TVDropZone />
        <RankBoard bandFinalInfo={bandFinalInfo} />
        <VoteSection vote='투표하기' />
        <Mileage mileage={mileage} />
        <ArtistGrid artists={artists} onVote={handleVote} votedIds={votedIds} />
        {selectedId && mileage !== null && (
          <VoteModal
            artistId={selectedId}
            onClose={closeModal}
            mileage={mileage}
            onVoteSuccess={() => setRefetch(prev => !prev)}
          />
        )}
      </DndProvider>
    </div>
  );
}
