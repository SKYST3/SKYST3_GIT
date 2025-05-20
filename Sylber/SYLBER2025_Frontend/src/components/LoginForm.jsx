import React, { useState, useMemo , useCallback, useEffect} from 'react';
import {LoginApi} from '../apis/usersApi';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  
  const [id, setId] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
 
  const navigate = useNavigate();
  
  const navigateToSignUp = () => {
    navigate("./signup");
  };

   
  useEffect(() => {
    if(loginSuccess ===  true){
      navigate(`./${loginId}/main`);
    }
  }, [loginSuccess]);

  const handleLogin = useCallback((event) => {
    event.preventDefault(); // 기본적인 HTML 동작으로 인해 페이지가 새로고침 되는 것을 방지
    LoginApi(id, password).then((response) => {
      if (response.status === 200) {
        setLoginSuccess(true);
        alert("로그인 성공");
        console.log(JSON.stringify(response.data.access_token));
        localStorage.setItem('accessToken', response.data.access_token);
      }
    }).catch((error) => {
      setLoginSuccess(false);
      alert("로그인 실패");
      alert(JSON.stringify(error));
    });
    setLoginId(id);
    setId("");
    setPassword("");
    
  },[id, password]);

  return (
    <div className="Login-Page">
        <div className="Login-Container">
          <form onSubmit={handleLogin} className="Sign-in-Part">
            <div className="Welcome-Text-Frame">
              <span className="Welcome-Text">Shall We Start?</span>
            </div>

            <div className="Id-and-Password">
              <div className="Sign-in-Id-Form">
                <input
                    className="Id-Text"
                    type="text"
                    placeholder="Id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="Sign-in-Password-Form">
                <input
                    className="Password-Text"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="Sign-In-Button-Frame">
              <button type="submit" className="Sign-In-Button">
                <span className="Sign-In-Text">Let’s Go!</span>
              </button>
            </div>
          </form>

          <div className="Login-Container-Seperate-Line"></div>

          <div className="Forgot-Password-and-Sign-up-Part">
            <div className="Forgot-Password-link-Box">
              <span className="Forgot-Password-link-Text">Forgot Password?</span>
            </div>
            <div className="Sign-up-link-Frame">
              <span className="Dont-have-an-account-Text">Don’t have an account?</span>
              <button
                  type="button"
                  className="Sign-up-link-Text"
                  onClick={navigateToSignUp}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;