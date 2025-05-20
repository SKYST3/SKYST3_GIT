import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '../assets/filled_icon/home.svg';
import PhotoIcon from '../assets/filled_icon/photo.svg';
import MusicIcon from '../assets/filled_icon/music.svg';
import BookIcon from '../assets/filled_icon/book.svg';
import MovieIcon from '../assets/filled_icon/movie.svg';
import ChatIcon from '../assets/filled_icon/chat.svg';

const Container = styled.div`
  min-height: 100vh;
  background-color: #F8F9FA;
  padding: 0;
`;

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #F8F9FA;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span {
    display: block;
    width: 20px;
    height: 2px;
    background-color: #000;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  padding: 24px 20px 16px;
  text-align: left;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: flex-start;
  background: white;
  padding: 16px 20px;
  margin: 0 20px 12px;
  cursor: pointer;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const PlaylistImage = styled.div`
  width: 48px;
  height: 48px;
  background-color: #F8F9FA;
  border-radius: 8px;
  margin-right: 16px;
`;

const PlaylistInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const PlaylistTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #000;
  text-align: left;
`;

const PlaylistDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: left;
`;

const ArrowIcon = styled.span`
  color: #666;
  font-size: 24px;
  margin-left: 8px;
`;

const LastSongSection = styled.div`
  padding: 24px 20px;
`;

const LastSongTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
`;

const SongGrid = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 12px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SongCard = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: calc((100vw - 52px) / 3);
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
`;

const SongCardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`;

const SongCardTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const SongCardArtist = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const PlayButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: none;
  border: none;
  padding: 0;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 12px rgba(0,0,0,0.05);
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: ${props => props.active ? '#C966EC' : '#666'};
  gap: 4px;
  cursor: pointer;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: ${props => props.active ? 1 : 0.6};
`;

export function Music() {
  const navigate = useNavigate();

  const playlists = [
    {
      id: 1,
      title: '플레이리스트 1',
      description: '고등학교 때 공부하며 들은 음악'
    },
    {
      id: 2,
      title: '플레이리스트 2',
      description: '대학교 때 방황했던 나날들'
    },
    {
      id: 3,
      title: '플레이리스트 3',
      description: '꿈을 향해 달려갈 때 들은 음악'
    }
  ];

  const lastSongs = [
    { title: 'LETTER', artist: '유다빈밴드' },
    { title: 'LETTER', artist: '유다빈밴드' },
    { title: 'LETTER', artist: '유다빈밴드' }
  ];

  return (
    <Container>
      <Header>
        <MenuButton>
          <span />
          <span />
          <span />
        </MenuButton>
        <HeaderTitle>나의 음악</HeaderTitle>
        <div style={{ width: 24 }} />
      </Header>

      <SectionTitle>나의 플레이리스트</SectionTitle>
      
      {playlists.map((playlist) => (
        <PlaylistItem 
          key={playlist.id}
          onClick={() => navigate(`/music/playlist/${playlist.id}`)}
        >
          <PlaylistImage />
          <PlaylistInfo>
            <PlaylistTitle>{playlist.title}</PlaylistTitle>
            <PlaylistDescription>{playlist.description}</PlaylistDescription>
          </PlaylistInfo>
          <ArrowIcon>›</ArrowIcon>
        </PlaylistItem>
      ))}

      <LastSongSection>
        <LastSongTitle>
          내 마지막을 함께할 노래
        </LastSongTitle>
        <SongGrid>
          {lastSongs.map((song, index) => (
            <SongCard key={index}>
              <SongCardOverlay>
                <SongCardTitle>{song.title}</SongCardTitle>
                <SongCardArtist>{song.artist}</SongCardArtist>
                <PlayButton>▶</PlayButton>
              </SongCardOverlay>
            </SongCard>
          ))}
        </SongGrid>
      </LastSongSection>

      <BottomNav>
        <NavItem onClick={() => navigate('/')}>
          <NavIcon src={HomeIcon} alt="홈" />
          홈
        </NavItem>
        <NavItem onClick={() => navigate('/photos')}>
          <NavIcon src={PhotoIcon} alt="사진" />
          사진
        </NavItem>
        <NavItem active onClick={() => navigate('/music')}>
          <NavIcon src={MusicIcon} alt="음악" active />
          음악
        </NavItem>
        <NavItem onClick={() => navigate('/books')}>
          <NavIcon src={BookIcon} alt="책" />
          책
        </NavItem>
        <NavItem onClick={() => navigate('/movies')}>
          <NavIcon src={MovieIcon} alt="영화" />
          영화
        </NavItem>
        <NavItem onClick={() => navigate('/chat')}>
          <NavIcon src={ChatIcon} alt="AI채팅" />
          AI채팅
        </NavItem>
      </BottomNav>
    </Container>
  );
} 