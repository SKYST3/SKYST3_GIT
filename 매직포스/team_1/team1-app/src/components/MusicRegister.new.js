import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BottomNavBar from './BottomNavBar';

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

const SearchInput = styled.input`
  width: calc(100% - 32px);
  padding: 12px 16px;
  margin: 16px;
  border-radius: 8px;
  border: none;
  background: white;
  font-size: 16px;
  &::placeholder {
    color: #999;
  }
`;

const SongPreview = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  margin: 0 16px;
  background: white;
  border-radius: 8px;
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
`;

const SongImage = styled.div`
  width: 80px;
  height: 80px;
  background: #F8F9FA;
  border-radius: 8px;
  flex-shrink: 0;
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: left;
`;

const Artist = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Tag = styled.span`
  background: #C966EC;
  color: white;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  text-align: left;
`;

const DescriptionInput = styled.textarea`
  width: calc(100% - 32px);
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  border: none;
  background: white;
  font-size: 14px;
  min-height: 100px;
  resize: none;
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
`;

const PlaylistSelect = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  margin: 16px;
  background: white;
  border-radius: 8px;
  box-sizing: border-box;
`;

const PlaylistTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
  text-align: left;
`;

const PlaylistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #F8F9FA;
`;

const PlaylistImage = styled.div`
  width: 80px;
  height: 80px;
  background: #F8F9FA;
  border-radius: 8px;
  flex-shrink: 0;
`;

const PlaylistInfo = styled.div`
  flex: 1;
`;

const PlaylistName = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: left;
`;

const PlaylistDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: left;
`;

const PlaylistButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #C966EC;
  font-size: 14px;
  font-weight: 600;
`;

const PlaylistItemButtonText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #C966EC;
`;

const PlaylistItemButtonIcon = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  background-color: ${props => props.isActive ? '#000' : '#C966EC'};
  transition: background-color 0.2s ease;
`;

const MusicRegister = () => {
  const navigate = useNavigate();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(playlistId);
  };

  return (
    <Container>
      <Header>
        <MenuButton onClick={() => navigate(-1)}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        <HeaderTitle>음악 등록</HeaderTitle>
      </Header>

      <SearchInput placeholder="음악 검색" />

      <SongPreview>
        <SongImage />
        <SongInfo>
          <SongTitle>노래 제목</SongTitle>
          <Artist>아티스트</Artist>
          <TagContainer>
            <Tag>#태그1</Tag>
            <Tag>#태그2</Tag>
            <Tag>#태그3</Tag>
          </TagContainer>
        </SongInfo>
      </SongPreview>

      <DescriptionInput placeholder="설명을 입력하세요" />

      <PlaylistSelect>
        <PlaylistTitle>플레이리스트 선택</PlaylistTitle>
        {[1, 2, 3].map((id) => (
          <PlaylistItem key={id}>
            <PlaylistImage />
            <PlaylistInfo>
              <PlaylistName>플레이리스트 {id}</PlaylistName>
              <PlaylistDescription>플레이리스트 설명</PlaylistDescription>
            </PlaylistInfo>
            <PlaylistButton onClick={() => handlePlaylistSelect(id)}>
              <PlaylistItemButtonText>선택</PlaylistItemButtonText>
              <PlaylistItemButtonIcon isActive={selectedPlaylist === id} />
            </PlaylistButton>
          </PlaylistItem>
        ))}
      </PlaylistSelect>

      <BottomNavBar />
    </Container>
  );
};

export default MusicRegister; 