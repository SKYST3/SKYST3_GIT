import 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../components/sidebar.tsx';

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem('access', '');
    localStorage.setItem('refresh', '');
    localStorage.setItem('username', '');
    localStorage.setItem('nickname', '');

    navigate('/');
  }, []);

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <div className="px-8 py-12 text-center">
        <h1>로그아웃 중...</h1>
      </div>
    </div>
  );
}
