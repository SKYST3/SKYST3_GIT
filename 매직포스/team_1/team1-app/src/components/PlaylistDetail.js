import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BottomNavBar from './BottomNavBar';

const Container = styled.div`
  min-height: 100vh;
  background-color: #F8F9FA;
  padding: 0;
  position: relative;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: 80px;
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

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #F8F9FA;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  font-size: 24px;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const Description = styled.div`
  background: white;
  padding: 16px;
  margin: 12px;
  border-radius: 16px;
`;

const DescriptionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #000;
  text-align: left;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  font-weight: 400;
  text-align: left;
`;

const ToggleButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin-top: 8px;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: flex-start;
  
  &::after {
    content: '›';
    margin-left: 4px;
    transform: ${props => props.expanded ? 'rotate(-90deg)' : 'rotate(90deg)'};
    transition: transform 0.2s ease;
  }
`;

const SongList = styled.div`
  margin-top: 12px;
  padding: 0 12px;
`;

const SongItem = styled.div`
  background: white;
  padding: 12px 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
`;

const SongImage = styled.div`
  width: 48px;
  height: 48px;
  background: #F8F9FA;
  border-radius: 8px;
  margin-right: 16px;
`;

const SongInfo = styled.div`
  flex: 1;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const Tag = styled.span`
  background: #C966EC;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const SongTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #000;
  text-align: left;
`;

const SongArtist = styled.p`
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

const StyledBottomNavBar = styled(BottomNavBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
`;

export function PlaylistDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const playlists = [
    {
      id: 1,
      title: '플레이리스트 1',
      description: '원하는 대학에 가고 싶어 매일 학원을 오가며 듣는 이 노래들이 그 시절 유일한 기쁨이었어요',
      songs: [
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] }
      ]
    },
    {
      id: 2,
      title: '플레이리스트 2',
      description: '대학교 때 방황했던 나날들',
      songs: [
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] }
      ]
    },
    {
      id: 3,
      title: '플레이리스트 3',
      description: '꿈을 향해 달려갈 때 들은 음악',
      songs: [
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] },
        { title: 'Not the same', artist: '로제', tags: ['22살', '방황'] }
      ]
    }
  ];

  const playlist = playlists.find(p => p.id === Number(id)) || {
    title: '',
    description: '',
    description_title: '',
    songs: []
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <MenuButton>
            <span></span>
            <span></span>
            <span></span>
          </MenuButton>
          <HeaderTitle>{playlist.title}</HeaderTitle>
          <BackButton onClick={() => navigate('/music')}>←</BackButton>
        </Header>

        <Description>
          <DescriptionTitle>
            고등학교 때 공부하며 들은 음악
          </DescriptionTitle>
          <DescriptionText>
            원하는 대학에 가고 싶어 매일 학원을 오가며 들은 이 노래들이 그 시절 유일한 기쁨이었어요
          </DescriptionText>
          <ToggleButton 
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '접기' : '...더보기'}
          </ToggleButton>
        </Description>

        <SongList>
          {playlist.songs.map((song, index) => (
            <SongItem key={index} onClick={() => navigate('/music/register')}>
              <SongImage />
              <SongInfo>
                <SongTitle>{song.title}</SongTitle>
                <SongArtist>{song.artist}</SongArtist>
                <TagContainer>
                  {song.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>#{tag}</Tag>
                  ))}
                </TagContainer>
              </SongInfo>
              <ArrowIcon>›</ArrowIcon>
            </SongItem>
          ))}
        </SongList>
      </ContentWrapper>
      <StyledBottomNavBar />
    </Container>
  );
} 