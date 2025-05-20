import React, { useState } from 'react';
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
  padding-bottom: 120px;
  position: relative;
`;

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
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

const PhotoCard = styled.div`
  background: white;
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
`;

const ImageWrapper = styled.div`
  position: relative;
  padding: 16px;
  background: white;
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 12px;
  background-color: #F8F9FA;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  padding: 16px 20px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #000;
`;

const Date = styled.span`
  font-size: 14px;
  color: #666;
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
`;

const MoreButton = styled.button`
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 4px;
  
  &::after {
    content: '›';
    margin-left: 4px;
    transform: rotate(90deg);
  }
`;

const CommentsTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 32px 20px 16px;
  color: #000;
`;

const Comment = styled.div`
  background: white;
  padding: 16px 20px;
  margin-bottom: 1px;
`;

const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #000;
`;

const CommentContent = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #999;
  text-align: right;
`;

const CommentInput = styled.div`
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 16px;
  background: #F8F9FA;
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: none;
  border-radius: 100px;
  font-size: 15px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  &::placeholder {
    color: #666;
  }
`;

const SubmitButton = styled.button`
  background: #C966EC;
  color: white;
  border: none;
  border-radius: 100px;
  padding: 16px 32px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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
  position: relative;
  padding: 4px;
  width: 48px;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
  opacity: ${props => props.active ? 1 : 0.6};
`;

export function PhotoDetail() {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const mockComments = [
    {
      author: '김민정',
      content: '와 너무 귀엽다~!!!',
      timestamp: '25/05/10 20:46'
    },
    {
      author: '김민정',
      content: '와 너무 귀엽다~!!!',
      timestamp: '25/05/10 20:46'
    }
  ];

  return (
    <Container>
      <Header>
        <MenuButton>
          <span />
          <span />
          <span />
        </MenuButton>
        <HeaderTitle>내 사진첩</HeaderTitle>
        <div style={{ width: 24 }} /> {/* 우측 여백 맞추기 */}
      </Header>

      <PhotoCard>
        <ImageWrapper>
          <MainImage src="placeholder.jpg" alt="내가 태어난 날" />
          <NavigationButton direction="left">‹</NavigationButton>
          <NavigationButton direction="right">›</NavigationButton>
        </ImageWrapper>

        <ContentWrapper>
          <TitleRow>
            <Title>내가 태어난 날</Title>
            <Date>2004.02.01</Date>
          </TitleRow>
          <Description>
            내가 태어나던 순간 사진이다.<br />
            나는 새벽 4시에 태어났고<br />
            내 태명은 OO이었다고 한다.
          </Description>
          <MoreButton>...더보기</MoreButton>
        </ContentWrapper>
      </PhotoCard>

      <CommentsTitle>추억을 나눠봐요</CommentsTitle>
      {mockComments.map((comment, index) => (
        <Comment key={index}>
          <CommentAuthor>{comment.author}</CommentAuthor>
          <CommentContent>{comment.content}</CommentContent>
          <CommentTime>{comment.timestamp}</CommentTime>
        </Comment>
      ))}

      <CommentInput>
        <Input
          type="text"
          placeholder="사진과 관련된 추억을 댓글로 남겨보세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <SubmitButton>등록</SubmitButton>
      </CommentInput>

      <BottomNav>
        <NavItem>
          <NavIcon src={HomeIcon} alt="홈" />
          홈
        </NavItem>
        <NavItem active>
          <NavIcon src={PhotoIcon} alt="사진" active />
          사진
        </NavItem>
        <NavItem>
          <NavIcon src={MusicIcon} alt="음악" />
          음악
        </NavItem>
        <NavItem>
          <NavIcon src={BookIcon} alt="책" />
          책
        </NavItem>
        <NavItem>
          <NavIcon src={MovieIcon} alt="영화" />
          영화
        </NavItem>
        <NavItem>
          <NavIcon src={ChatIcon} alt="AI채팅" />
          AI채팅
        </NavItem>
      </BottomNav>
    </Container>
  );
} 