import 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../components/sidebar.tsx';

export default function Register() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [waiting, setWaiting] = useState(false);

  const navigate = useNavigate();

  async function fetchRegister() {
    try {
      const url = '/api/auth/register/';
      const resJson = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          nickname: nickname,
        }),
      }).then((res) => res.json());
      return resJson;
    } catch (error) {
      return null;
    }
  }

  async function handleRegister() {
    function isValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      const isValidUsername = nickname.length >= 2;
      const isValidPassword = password.length >= 8;
      const check = password === passwordCheck;
      return isValidEmail && isValidPassword && isValidUsername && check;
    }

    if (!isValid()) {
      setErrorMsg(
        '잘못된 입력입니다. 닉네임은 2자 이상, 비밀번호는 8자 이상이어야 하며 비밀번호 확인과 일치해야 합니다.',
      );
      return;
    } else {
      // Register logic
      setWaiting(true);
      const resJson = await fetchRegister();

      if (resJson.username != null) {
        // 회원가입 성공 시시
        setErrorMsg('');
        navigate('/login');
      } else {
        setErrorMsg(
          '회원가입에 실패했습니다. (' + resJson.non_field_errors + ')',
        );
      }
      setWaiting(false);
      fetchRegister();
    }
  }

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <div className="px-8 py-12 text-center">
        <h1>회원가입</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault;
            handleRegister();
          }}
          className="w-96 text-center px-4 py-8 space-y-4"
        >
          <div className="flex justify-end items-center space-x-2">
            <label htmlFor="email">이메일</label>
            <input
              className="textInput"
              type="email"
              id="email"
              placeholder="example@example.com"
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex justify-end items-center space-x-2">
            <label htmlFor="email">닉네임</label>
            <input
              className="textInput"
              type="username"
              id="username"
              placeholder="홍길동"
              onChange={(e) => {
                setNickname(e.currentTarget.value);
              }}
            />
          </div>
          <div className="flex justify-end items-center space-x-2">
            <label htmlFor="password">비밀번호</label>
            <input
              className="textInput"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
          </div>

          <div className="flex justify-end items-center space-x-2">
            <label htmlFor="password">비밀번호 확인</label>
            <input
              className="textInput"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => {
                setPasswordCheck(e.currentTarget.value);
              }}
            />
          </div>
          {errorMsg.length > 0 && <div className="errorMsg">{errorMsg}</div>}
          <button type="submit" className="button">
            {waiting ? '회원가입 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}
