import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfoApi, roomJoinRequestApi,roomCreateRequestApi, roomLeaveRequestApi } from '../apis/usersApi';
import { useNavigate } from 'react-router-dom';
import './MainScreen.css';
import arrow from '../assets/Arrow.png'; // 실제 이미지 경로에 맞게 수정 필요

//const seedPos = {seedX: window.innerWidth/2, seedY: window.innerHeight/2};
function MainScreen() {
  const {username} = useParams();
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfoApi(username).then((response) => {
      if (response.status === 200) {
        console.log(response.data.username);
        if(response.data.room_code !== null){
          console.log(response.data.code);
          roomLeaveRequestApi(response.data.room_code).then((response) => {

          }).catch((error) => {
            alert("방 나가기 실패");
          });
        }
      }
    }).catch((error) => { 
      alert("존재하지 않는 사용자입니다.");
      navigate(`../`);
    });
  }, []);

  const roomCreateRequest = () => {
    roomCreateRequestApi().then((response) => {
      if (response.status === 200) {
        console.log(response.data.code);
        navigate(`../${username}/room/${response.data.code}/waiting`);
      }
    }).catch((error) => {
      alert("방 생성 실패");
      alert(JSON.stringify(error));
    });
  }

  const roomJoinRequest = useCallback((room_code) => {
    roomJoinRequestApi(room_code).then((response) => {
      if (response.status === 200) {
        console.log(response.data.code);
        navigate(`../${username}/room/${response.data.code}/waiting`);
      }
    }).catch((error) => {
      alert("방 참가 실패");
      alert(JSON.stringify(error));
    });
  });

  return (
    <div className="start-page">
    <div className="game-name-frame">
      <span className="game-name-text">Catch Voice</span>
    </div>

    <div className="room-enter-frame">
      <div className="room-code-frame">
        <input
          className="pre-room-code-text"
          type="text"
          placeholder="XXXXX"
          value={code}
          maxLength={5}
          onChange={(event) => setCode(event.target.value)}
        />
        <div className="room-enter-button" onClick={() => roomJoinRequest(code)}>
          <img
            className="room-enter-arrow"
            src = {arrow}// 실제 이미지 경로에 맞게 수정 필요
          />
        </div>
      </div>
    </div>

    <div className="room-frame">
      <button className="make-room-button" onClick={roomCreateRequest}>
        <div className="make-room-text">Make Room!</div>
      </button>
    </div>
  </div>

  );
}

export default MainScreen;
