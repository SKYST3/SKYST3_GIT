import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import GrayCalendar from '../assets/icons/ic_calendar_gray.svg';
import WhiteCalendar from '../assets/icons/ic_calendar_white.svg';
import GrayMovie from '../assets/icons/ic_movie_gray.svg';
import GraySettings from '../assets/icons/ic_settings_gray.svg';
import WhiteSettings from '../assets/icons/ic_settings_white.svg';
import GrayStopwatch from '../assets/icons/ic_stopwatch_gray.svg';
import WhiteStopwatch from '../assets/icons/ic_stopwatch_white.svg';
import { getUserInfo } from '../functions/getUserInfo';

export const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    loggedin: false,
  });
  useEffect(() => {
    getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);

  return (
    <div className="w-[280px] min-h-max py-5 bg-[#201818] inline-flex flex-col justify-start items-center gap-2.5">
      {/* Profile */}
      <Link
        to={'/settings'}
        className="self-stretch px-10 py-5 inline-flex justify-center items-center gap-2.5"
      >
        <div className="justify-start text-white text-xl font-normal font-['Inter']">
          {userInfo.loggedin ? `${userInfo.nickname}님` : '로그인해주세요'}
        </div>
        <div className="w-9 h-9 bg-[#d9d9d9] rounded-full"></div>
      </Link>

      {/* Divider */}
      <div className="w-60 h-px bg-[#685e5e]"></div>

      {/* Current */}
      <Link
        to={'/current'}
        className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
      >
        <div className="w-6 h-6">
          <img
            src={currentPath === '/current' ? WhiteStopwatch : GrayStopwatch}
            alt="Stopwatch"
            className="w-6 h-6"
          />
        </div>
        <div
          className={`justify-start ${currentPath === '/current' ? 'text-white' : 'text-[#969696]'} text-xl font-light font-['Inter']`}
        >
          현재 밤샘
        </div>
      </Link>

      {/* Archive */}
      <Link
        to={'/'}
        className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
      >
        <div className="w-6 h-6">
          <img
            src={currentPath === '/' ? WhiteCalendar : GrayCalendar}
            alt="Calendar"
            className="w-6 h-6"
          />
        </div>
        <div
          className={`justify-start ${currentPath === '/' ? 'text-white' : 'text-[#969696]'} text-xl font-light font-['Inter']`}
        >
          아카이브
        </div>
      </Link>

      {/* Ending-Credit */}
      <Link
        to={'/credit'}
        className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
      >
        <div className="w-6 h-6">
          <img src={GrayMovie} alt="Credit" className="w-6 h-6" />
        </div>
        <div
          className={`justify-start text-[#969696] text-xl font-light font-['Inter']`}
        >
          엔딩 크레딧
        </div>
      </Link>

      {/* Settings (더 좋은 사용자 경험을 위한 중복 기능 구현) */}

      <Link
        to={'/settings'}
        className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
      >
        <div className="w-6 h-6">
          <img
            src={currentPath === '/settings' ? WhiteSettings : GraySettings}
            alt="Settings"
            className="w-6 h-6"
          />
        </div>
        <div
          className={`justify-start ${currentPath === '/settings' ? 'text-white' : 'text-[#969696]'} text-xl font-light font-['Inter']`}
        >
          설정
        </div>
      </Link>

      {/* Login & Logout*/}
      {userInfo.loggedin ? (
        <Link
          to={'/logout'}
          className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
        >
          <div className="buttonMinor mx-auto">로그아웃</div>
        </Link>
      ) : (
        <Link
          to={'/login'}
          className="self-stretch px-10 py-2.5 inline-flex justify-start items-center gap-2.5"
        >
          <div className="buttonMinor mx-auto">로그인</div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
