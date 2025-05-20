import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 241px;
  position: relative;
`;

const NavigationArrow = styled.button`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'left' ? 'left: -15px;' : 'right: -15px;'}
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  svg {
    width: 8px;
    height: 15px;
    transform: ${props => props.direction === 'left' ? 'rotate(180deg)' : 'none'};
  }
`;

const WhiteCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 241px;
  height: 419px;
  flex-shrink: 0;
`;

const MovieImage = styled.div`
  width: 219.214px;
  height: 292px;
  flex-shrink: 0;
  aspect-ratio: 219.21/292.00;
  background: #D9D9D9;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const MovieInfo = styled.div`
  text-align: left;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

const MovieHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const MovieTitle = styled.h2`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #000;
  margin: 0;
`;

const WatchDate = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: #000;
`;

const Description = styled.p`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: black;
  word-wrap: break-word;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="15" transform="matrix(-1 0 0 1 30 0)" fill="white"/>
      <path d="M11 8.1876L12.1898 6.99892L18.6704 13.4772C18.7748 13.581 18.8577 13.7045 18.9143 13.8405C18.9709 13.9764 19 14.1222 19 14.2695C19 14.4168 18.9709 14.5626 18.9143 14.6986C18.8577 14.8345 18.7748 14.958 18.6704 15.0618L12.1898 21.5435L11.0011 20.3548L17.0836 14.2712L11 8.1876Z" fill="black"/>
    </svg>
  );

  const movie = {
    id: id,
    title: '7번방의 선물',
    watchDate: '2024년 봄',
    description: '엄청난 몰입감을 느꼈다 항상 사회과학 책만 보던 나의 독서취향을 바꾼 책이다...더보기'
  };

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
        <ContentWrapper>
          <NavigationArrow direction="left" onClick={() => navigate(-1)}>
            <ArrowIcon />
          </NavigationArrow>
          <NavigationArrow direction="right" onClick={() => navigate(1)}>
            <ArrowIcon />
          </NavigationArrow>

          <WhiteCard>
            <MovieImage />
            <MovieInfo>
              <MovieHeader>
                <MovieTitle>{movie.title}</MovieTitle>
                <WatchDate>{movie.watchDate}</WatchDate>
              </MovieHeader>
              <Description>{movie.description}</Description>
            </MovieInfo>
          </WhiteCard>
        </ContentWrapper>
      </Content>

      <BottomNavBar />
    </Container>
  );
}