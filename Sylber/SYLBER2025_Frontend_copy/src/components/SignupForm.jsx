import React, { useState, useMemo , useCallback, useEffect} from 'react';
import {SignUpApi} from '../apis/usersApi';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  
  const [id, setId] = useState('');
  const [signupId, setSignupId] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
 
  const navigate = useNavigate();

   
  useEffect(() => {
    if(signupSuccess ===  true){
      navigate(`../`);
    }
  }, [signupSuccess]);

  const handleSignup = useCallback((event) => {
    event.preventDefault(); // 기본적인 HTML 동작으로 인해 페이지가 새로고침 되는 것을 방지
    SignUpApi(id, password).then((response) => {
      if (response.status === 200) {
        setSignupSuccess(true);
        alert("회원가입 성공");
      }
    }).catch((error) => {
      setSignupSuccess(false);
      alert("회원가입 실패");
      alert(JSON.stringify(error));
    });
    setSignupId(id);
    setId("");
    setPassword("");
    
  },[id, password]);

  return (
    <div style = {{textAlign: 'center', verticalAlign: 'center',}}>
      <h1> 회원가입해주세요.</h1>
      <form onSubmit={handleSignup}>
        <input value = {id} placeholder = 'id' onChange = {(event) => {
          setId(event.target.value);
        }}></input>
        <br/><br/>
        <input value = {password} placeholder = 'password' onChange = {(event) => {
          setPassword(event.target.value);
        }}></input>
        <br/><br/>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignupForm;