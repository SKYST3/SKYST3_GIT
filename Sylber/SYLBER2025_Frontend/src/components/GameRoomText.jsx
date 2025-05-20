//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './GameRoomText.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { getRoundApi, sendTextApi , getUserInfoApi, getNextApi} from '../apis/usersApi';
import RecordButton from '../assets/Record Button.png';
import StopButton from '../assets/Stop Button.png';
import PlayButton from '../assets/Play Button.png';
import SubmitButton from '../assets/Submit Button.png';
import ListenImage from '../assets/Listen Image.png';
import DeleteButton from '../assets/Delete Button.png';



function GameRoomText() {const {username} = useParams();
  const {room_code} = useParams();
  const {round} = useParams();

  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [timeRemaining, setTimeRemaining] = useState(30); // 60 seconds
  const [peopleLeft, setPeopleLeft] = useState(0);

  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

    useEffect(() => {
        getUserInfoApi(username).then((response) => {
            if (response.status === 200) {
                console.log(response.data.username);
                if(response.data.room_code !== room_code){
                    navigate(`../${username}/main`);
                }
            }
        });
    }, []);

  useEffect(
    () => {
      getRoundApi(room_code).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          const byteArray = new Uint8Array(response.data.prev_content.data);
          const blob = new Blob([byteArray], { type: 'audio/wav' });
          const newAudioUrl = URL.createObjectURL(blob);
          setAudioBlob(blob);
          setAudioUrl(newAudioUrl);
        }
      });
    }
  );
    

  const onPlayAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }

  const getNext = () => {
              getNextApi(room_code).then((response) => {
                  if (response.status === 200) {
                      console.log(response.data);
                      if(response.data.round > round){
                          navigate(`../${username}/room/${room_code}/audio/${response.data.round}`);
                      }
                      if(response.data === 'end'){
                          navigate(`../${username}/room/${room_code}/end`);
                      }
                      setTimeRemaining(response.data.time_left);
                      setPeopleLeft(response.data.user_done);
                  }
              });
          }
      
      useEffect(() => {
              const intervalId = setInterval(() => {
                  getNext();
                  // call your function here
              }, 1000);
      
              // Clean up the interval on component unmount
              return () => clearInterval(intervalId);
          }, []); // empty dependency array = run once on mount

    const onSubmitAnswer = () => {
        alert(answer);
        if (answer) {
            sendTextApi(room_code, answer, round).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setAnswer('');
                }
            });
        }
    }

  return (
    <div className="GameVoiceTextPage">
      <div className="GVTGameMainWindow">
        
        <div className="GVTRoundNumberFrame">
          <span className="GVTStageNumberText">Round {round}</span>
        </div>
  
        <div className="ListenAndAnswerFrame">
          
          <div className="ListenVoiceFrame">
            <div className="ListenImageFrame">
              <button className="ListenImage" onClick = {onPlayAudio}>
                <img className='ListenImage' src= {ListenImage}/>
              </button>
            </div>
          </div>
  
          <div className="AnswerFrame">
            <div className="AnswerTextFrame">
              <input className="AnswerHere" placeholder='answer here' value={answer}
                    onChange={(e) => setAnswer(e.target.value)}>
              </input>
            </div>
          </div>
  
        </div>
  
        <div className="DeleteOrSubmitFrame">
          <div className="DeleteButtonFrame">
            <button className="DeleteButton" onClick = {() => setAnswer('')}>
              <img className='DeleteButton' src= {DeleteButton}/>
            </button>
          </div>
          <div className="SubmitButtonFrame">
            <button className="SubmitButton" onClick = {onSubmitAnswer}>
              <img className='SubmitButton' src= {SubmitButton}/>
            </button>
          </div>
        </div>
  
        <div className="GVTRoundRemainTimeFrame">
          <span className="GVTRoundTimeRemaining">{timeRemaining}</span>
        </div>
  
      </div>
    </div>
  );
}

export default GameRoomText;