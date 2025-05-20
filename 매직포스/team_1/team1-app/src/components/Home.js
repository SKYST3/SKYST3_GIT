import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: '내 사진', path: '/photos' },
    { title: '내 음악', path: '/music' },
    { title: '내 독서', path: '/books' },
    { title: '내 영화', path: '/movies' },
    { title: '고인 AI 챗봇', path: '/chat' },
    { title: '내 장례식\n보러가기', path: '/funeral' }
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">[유저네임]님,<br />오늘도 당신을 기억합니다</h1>
      <p className="home-subtitle">온전히 당신으로 기억될 수 있도록, [엠이름]</p>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-card"
            onClick={() => navigate(item.path)}
          >
            {item.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < item.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 