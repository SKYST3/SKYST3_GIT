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
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  span {
    display: block;
    width: 24px;
    height: 2px;
    background-color: black;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Content = styled.div`
  padding: 20px;
`;

const DescriptionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
`;

const DescriptionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const DescriptionText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.active ? '#C966EC' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MovieItem = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  gap: 16px;
  cursor: pointer;
`;

const MovieThumbnail = styled.div`
  width: 48px;
  height: 48px;
  background: #D9D9D9;
  border-radius: 8px;
  flex-shrink: 0;
`;

const MovieInfo = styled.div`
  flex: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MovieTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  text-align: left;
`;

const MovieDirector = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background: #F3E4FC;
  color: #C966EC;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const Arrow = styled.span`
  margin-left: auto;
  color: #666;
`;

export function Movies() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('유년기');

  const tabs = ['유년기', '청년기', '중년기', '장년기', '노년기'];

  const movies = [
    {
      id: 1,
      title: '7번방의 선물',
      director: '이환경',
      tags: ['22살', '방황']
    },
    {
      id: 2,
      title: '7번방의 선물',
      director: '이환경',
      tags: ['22살', '방황']
    },
    {
      id: 3,
      title: '7번방의 선물',
      director: '이환경',
      tags: ['22살', '방황']
    },
    {
      id: 4,
      title: '7번방의 선물',
      director: '이환경',
      tags: ['22살', '방황']
    }
  ];

  return (
    <Container>
      <Header>
        <MenuButton>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        <HeaderTitle>내 영화</HeaderTitle>
      </Header>

      <Content>
        <DescriptionCard>
          <DescriptionTitle>내 인생에 영향을 준 영화들</DescriptionTitle>
          <DescriptionText>영화에 대한 취향은 살면서 크게 바뀌지 않았어요. 당신은 어떤 취향을 가졌나요?</DescriptionText>
        </DescriptionCard>

        <TabContainer>
          {tabs.map(tab => (
            <Tab 
              key={tab} 
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          ))}
        </TabContainer>

        <MovieList>
          {movies.map(movie => (
            <MovieItem key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <MovieThumbnail />
              <MovieInfo>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieDirector>{movie.director}</MovieDirector>
                <TagContainer>
                  {movie.tags.map(tag => (
                    <Tag key={tag}>#{tag}</Tag>
                  ))}
                </TagContainer>
              </MovieInfo>
              <Arrow>›</Arrow>
            </MovieItem>
          ))}
        </MovieList>
      </Content>

      <BottomNavBar />
    </Container>
  );
} 