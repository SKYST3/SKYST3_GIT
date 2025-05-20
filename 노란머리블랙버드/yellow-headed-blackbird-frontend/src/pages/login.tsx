import 'react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import OurButton from '../components/button.tsx';
import { Sidebar } from '../components/sidebar.tsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [waiting, setWaiting] = useState(false);

  console.debug(waiting);

  const navigate = useNavigate();

  async function fetchLogin() {
    try {
      const url = '/api/auth/login/';
      const resJson = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      }).then((res) => res.json());
      return resJson;
    } catch (error) {
      return null;
    }
  }

  async function handleLogin() {
    function isValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      const isValidPassword = password.length >= 8;
      return isValidEmail && isValidPassword;
    }

    if (!isValid()) {
      setErrorMsg('잘못된 이메일 주소 또는 비밀번호 입력입니다.');
      return;
    } else {
      // Login logic
      setWaiting(true);
      const resJson = await fetchLogin();

      if (resJson.refresh != null) {
        // 로그인 성공 시
        localStorage.setItem('access', resJson.access);
        localStorage.setItem('refresh', resJson.refresh);
        setErrorMsg('');
        navigate('/current');
      } else {
        setErrorMsg(
          '존재하지 않는 회원 정보입니다. 아이디 또는 비밀번호를 확인해주세요.',
        );
      }
      setWaiting(false);
    }
  }

  return (
    <div className="w-full h-screen flex flex-row bg-[#0f0909]">
      <Sidebar />
      <div className="w-[1640px] h-screen px-32 py-28 inline-flex flex-col justify-center items-center overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="justify-start text-white text-5xl font-semibold font-['Inter']">
            로그인
          </div>
          <div className="p-5 flex flex-col justify-center items-center gap-5">
            <input
              type="email"
              className="w-[400px] px-5 py-2.5 bg-[#242121] rounded-[20px] text-white text-xl font-normal font-['Istok_Web']"
              placeholder="아이디"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="w-[400px] px-5 py-2.5 bg-[#242121] rounded-[20px] text-white text-xl font-normal font-['Istok_Web']"
              placeholder="패스워드"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <div className="w-[400px] h-[29px] text-right items-end justify-end">
              <Link
                to="/register"
                className="text-right ml-auto text-white text-xl font-normal font-['Istok_Web']"
              >
                회원가입 하기
              </Link>
            </div>

            {errorMsg !== '' && (
              <div className="text-red-500 text-sm font-normal font-['Istok_Web']">
                {errorMsg}
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="w-[400px] h-[49px] px-10 py-2.5 bg-[#685e5e] rounded-[40px] inline-flex justify-center items-center gap-2.5 overflow-hidden"
            >
              <OurButton
                dataProperty1="btn-filled"
                dataIconExists={false}
                dataInput="로그인"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handleLogin();
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
