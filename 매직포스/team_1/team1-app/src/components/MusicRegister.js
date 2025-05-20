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
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
`;

const SongPreview = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  background: white;
  margin: 16px;
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
  background: white;
  margin: 16px;
  border-radius: 8px;
  box-sizing: border-box;
`;

const SelectTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
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

const CompleteButton = styled.button`
  width: calc(100% - 32px);
  margin: 16px;
  padding: 16px;
  background: #C966EC;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding-bottom: 80px;
`;

const PlaylistItemButtonIcon = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  background-color: ${props => props.isActive ? '#000' : '#C966EC'};
  transition: background-color 0.2s ease;
`;

export function MusicRegister() {
  const navigate = useNavigate();
  const [songTitle] = useState('Not the same');
  const [artist] = useState('로제');
  const [tags] = useState(['해시태그', '해시태그', '해시태그', '해시태그']);

  const handleComplete = () => {
    navigate('/music');
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <MenuButton onClick={() => navigate(-1)}>
            <span></span>
            <span></span>
            <span></span>
          </MenuButton>
          <HeaderTitle>음악 등록하기</HeaderTitle>
          <div style={{ width: 24 }} />
        </Header>

        <SearchInput 
          placeholder="제목 또는 가수명을 입력하세요"
        />

        <SongPreview>
          <SongImage />
          <SongInfo>
            <SongTitle>{songTitle}</SongTitle>
            <Artist>{artist}</Artist>
            <TagContainer>
              {tags.map((tag, index) => (
                <Tag key={index}>#{tag}</Tag>
              ))}
            </TagContainer>
          </SongInfo>
        </SongPreview>

        <DescriptionInput 
          placeholder="노래에 대한 설명을 입력하세요"
        />

        <PlaylistSelect>
          <SelectTitle>플레이리스트 선택</SelectTitle>
          <PlaylistItem>
            <PlaylistImage />
            <PlaylistInfo>
              <PlaylistName>플레이리스트 3</PlaylistName>
              <PlaylistDescription>플레이리스트 설명</PlaylistDescription>
            </PlaylistInfo>
          </PlaylistItem>
        </PlaylistSelect>

        <CompleteButton onClick={handleComplete}>완료</CompleteButton>
      </ContentWrapper>
      <BottomNavBar />
    </Container>
  );
} 