import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px;
  padding-bottom: 80px;
  background-color: #F8F9FA;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: none;
  font-size: 16px;
  color: ${props => props.isActive ? '#C966EC' : '#666'};
  border-bottom: 2px solid ${props => props.isActive ? '#C966EC' : 'transparent'};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: #C966EC;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 0;
`;

const PhotoCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  cursor: pointer;
`;

const PhotoImage = styled.div`
  width: 100%;
  padding-bottom: 120%;
  background-color: #eee;
  position: relative;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 20px;
  }
`;

const PhotoInfo = styled.div`
  padding: 12px 16px;
  background: white;
  border-radius: 20px;
  margin-top: -20px;
  position: relative;
  z-index: 1;

  h3 {
    margin: 0;
    font-size: 15px;
    color: #333;
    font-weight: normal;
  }

  p {
    margin: 4px 0 0;
    font-size: 13px;
    color: #666;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  color: #666;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 2;

  &::after {
    content: '›';
  }
`;

const mockPhotos = [
  {
    id: 1,
    title: '내가 태어난 날',
    date: '2004.02.01',
    imageUrl: 'placeholder.jpg'
  },
  {
    id: 2,
    title: '내가 태어난 날',
    date: '2004.02.01',
    imageUrl: 'placeholder.jpg'
  },
  {
    id: 3,
    title: '내가 태어난 날',
    date: '2004.02.01',
    imageUrl: 'placeholder.jpg'
  },
  {
    id: 4,
    title: '내가 태어난 날',
    date: '2004.02.01',
    imageUrl: 'placeholder.jpg'
  }
];

const periods = ['유년기', '청년기', '중년기', '장년기', '노년기'];

export function Photos() {
  const [activePeriod, setActivePeriod] = useState('유년기');
  const navigate = useNavigate();

  const handlePhotoClick = (photoId) => {
    navigate(`/photos/${photoId}`);
  };

  return (
    <Container>
      <Title>내 사진첩</Title>
      
      <TabContainer>
        {periods.map((period) => (
          <Tab
            key={period}
            isActive={activePeriod === period}
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </Tab>
        ))}
      </TabContainer>

      <PhotoGrid>
        {mockPhotos.map((photo) => (
          <PhotoCard key={photo.id} onClick={() => handlePhotoClick(photo.id)}>
            <PhotoImage>
              <img src={photo.imageUrl} alt={photo.title} />
            </PhotoImage>
            <PhotoInfo>
              <h3>{photo.title}</h3>
              <p>{photo.date}</p>
              <ArrowButton />
            </PhotoInfo>
          </PhotoCard>
        ))}
      </PhotoGrid>
    </Container>
  );
} 