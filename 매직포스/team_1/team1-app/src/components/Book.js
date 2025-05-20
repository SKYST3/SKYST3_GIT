import React, { useState } from 'react';
import styled from 'styled-components';
import BottomNavBar from './BottomNavBar';
import { useNavigate } from 'react-router-dom';

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

const MenuButton = styled.button`
  position: absolute;
  left: 20px;
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
`;

const InfoBox = styled.div`
  background: white;
  margin: 16px;
  padding: 20px;
  border-radius: 8px;
`;

const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px 0;
  text-align: left;
  color: #000;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  text-align: left;
`;

const AgeFilterContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 0 16px;
  margin: 16px 0;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AgeFilter = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 16px;
  color: ${props => props.isActive ? '#C966EC' : '#666'};
  border-bottom: 2px solid ${props => props.isActive ? '#C966EC' : 'transparent'};
  white-space: nowrap;
  cursor: pointer;
`;

const BookList = styled.div`
  padding: 0 16px;
`;

const BookItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
`;

const BookImage = styled.div`
  width: 80px;
  height: 80px;
  background: #F8F9FA;
  border-radius: 8px;
  flex-shrink: 0;
`;

const BookInfo = styled.div`
  flex: 1;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 4px 0;
  text-align: left;
  color: #000;
`;

const BookAuthor = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.span`
  background: #C966EC;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const ArrowIcon = styled.span`
  margin-left: auto;
  color: #666;
  font-size: 20px;
`;

export function Book() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('유년기');
  const ageFilters = ['유년기', '청년기', '중년기', '장년기', '노년기'];

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const books = [
    {
      id: 1,
      title: '소년이 온다',
      author: '한강',
      tags: ['22살', '방황']
    },
    {
      id: 2,
      title: '소년이 온다',
      author: '한강',
      tags: ['22살', '방황']
    },
    {
      id: 3,
      title: '소년이 온다',
      author: '한강',
      tags: ['22살', '방황']
    },
    {
      id: 4,
      title: '소년이 온다',
      author: '한강',
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
        <HeaderTitle>내 도서</HeaderTitle>
      </Header>

      <InfoBox>
        <InfoTitle>내 인생에 영향을 준 도서들</InfoTitle>
        <InfoText>
          시기마다 읽는 책이 인생에 큰 영향을 미쳐요
          <br />
          지금의 당신을 만든 책은 어떤 책인가요?
        </InfoText>
      </InfoBox>

      <AgeFilterContainer>
        {ageFilters.map(filter => (
          <AgeFilter
            key={filter}
            isActive={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </AgeFilter>
        ))}
      </AgeFilterContainer>

      <BookList>
        {books.map(book => (
          <BookItem 
            key={book.id}
            onClick={() => handleBookClick(book.id)}
          >
            <BookImage />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>{book.author}</BookAuthor>
              <TagContainer>
                {book.tags.map((tag, index) => (
                  <Tag key={index}>#{tag}</Tag>
                ))}
              </TagContainer>
            </BookInfo>
            <ArrowIcon>›</ArrowIcon>
          </BookItem>
        ))}
      </BookList>

      <BottomNavBar />
    </Container>
  );
} 