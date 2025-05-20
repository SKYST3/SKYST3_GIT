// src/components/BottomNavBar.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

// 기본 아이콘 불러오기
import homeIcon from '../assets/icon/home.svg';
import photoIcon from '../assets/icon/photo.svg';
import musicIcon from '../assets/icon/music.svg';
import bookIcon from '../assets/icon/book.svg';
import movieIcon from '../assets/icon/movie.svg';
import chatIcon from '../assets/icon/chat.svg';

// 활성화된(fill) 아이콘 불러오기
import homeFilledIcon from '../assets/filled_icon/home.svg';
import photoFilledIcon from '../assets/filled_icon/photo.svg';
import musicFilledIcon from '../assets/filled_icon/music.svg';
import bookFilledIcon from '../assets/filled_icon/book.svg';
import movieFilledIcon from '../assets/filled_icon/movie.svg';
import chatFilledIcon from '../assets/filled_icon/chat.svg';

// 네비게이션 전체 컨테이너 스타일
const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
`;

// NavItem: $isActive prop만 스타일에 사용하고 DOM으로는 전달되지 않도록 설정
const NavItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive'
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    /* 활성화된 탭일 때 필터 적용 */
    filter: ${props =>
      props.$isActive
        ? 'invert(57%) sepia(89%) saturate(1771%) hue-rotate(247deg) brightness(97%) contrast(98%)'
        : 'none'};
  }

  span {
    font-size: 12px;
    /* 활성화된 탭일 때 글자색 보라, 아니면 회색 */
    color: ${props => (props.$isActive ? '#C966EC' : '#666')};
  }
`;

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 네비게이션 항목 리스트
  const navItems = [
    { icon: homeIcon,   filledIcon: homeFilledIcon,   label: '홈',    path: '/'      },
    { icon: photoIcon,  filledIcon: photoFilledIcon,  label: '사진',  path: '/photos' },
    { icon: musicIcon,  filledIcon: musicFilledIcon,  label: '음악',  path: '/music'  },
    { icon: bookIcon,   filledIcon: bookFilledIcon,   label: '도서',  path: '/books'  },
    { icon: movieIcon,  filledIcon: movieFilledIcon,  label: '영화',  path: '/movies' },
    { icon: chatIcon,   filledIcon: chatFilledIcon,   label: 'AI채팅', path: '/chat'   },
    { icon: bookIcon,   filledIcon: bookFilledIcon,   label: 'AI 학습', path: '/voice'  },
  ];

  return (
    <NavContainer>
      {navItems.map((item, index) => {
        // 현재 URL과 비교하여 활성화 여부 결정
        const isActive = location.pathname === item.path;
        return (
          <NavItem
            key={index}
            $isActive={isActive}            // transient prop으로 전달
            onClick={() => navigate(item.path)}  // 클릭 시 해당 경로로 이동
          >
            <img
              src={isActive ? item.filledIcon : item.icon}
              alt={item.label}
            />
            <span>{item.label}</span>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};

export default BottomNavBar;
