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
  justify-content: center;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #F8F9FA;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

const BookContent = styled.div`
  padding: 20px;
  position: relative;
  background-color: #F8F9FA;
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

const BookImageContainer = styled.div`
  background: #F8F9FA;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const BookImage = styled.div`
  width: 219.214px;
  height: 292px;
  flex-shrink: 0;
  aspect-ratio: 219.21/292.00;
  background: #D9D9D9;
  border-radius: 8px;
`;

const BookInfo = styled.div`
`;

const BookHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const BookTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #000;
`;

const ReadDate = styled.span`
  font-size: 14px;
  color: #666;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 실제로는 이 데이터를 API나 상태 관리 도구에서 가져와야 합니다
  const book = {
    id: id,
    title: '소년이 온다',
    readDate: '2024년 읽음',
    description: '업장난 물임감을 느꼈다 황상 사회과학 책만 보던 나의 독서취향을 바꾼 책이다...더보기'
  };

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="15" viewBox="0 0 8 15" fill="none">
      <path d="M1 8.1876L2.1898 6.99892L8.6704 13.4772C8.7748 13.581 8.8577 13.7045 8.9143 13.8405C8.9709 13.9764 9 14.1222 9 14.2695C9 14.4168 8.9709 14.5626 8.9143 14.6986C8.8577 14.8345 8.7748 14.958 8.6704 15.0618L2.1898 21.5435L1.0011 20.3548L7.0836 14.2712L1 8.1876Z" fill="black"/>
    </svg>
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>내 도서</HeaderTitle>
      </Header>

      <BookContent>
        <ContentWrapper>
          <NavigationArrow direction="left" onClick={() => navigate(-1)}>
            <ArrowIcon />
          </NavigationArrow>
          <NavigationArrow direction="right" onClick={() => navigate(1)}>
            <ArrowIcon />
          </NavigationArrow>

          <WhiteCard>
            <BookImageContainer>
              <BookImage />
            </BookImageContainer>

            <BookInfo>
              <BookHeader>
                <BookTitle>{book.title}</BookTitle>
                <ReadDate>{book.readDate}</ReadDate>
              </BookHeader>
              <Description>{book.description}</Description>
            </BookInfo>
          </WhiteCard>
        </ContentWrapper>
      </BookContent>

      <BottomNavBar />
    </Container>
  );
} 