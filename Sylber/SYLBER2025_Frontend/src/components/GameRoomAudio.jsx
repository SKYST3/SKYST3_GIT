import React from 'react';
import { useEffect, useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import { sendAudioApi, getNextApi , getUserInfoApi, getRoundApi} from '../apis/usersApi';
import RecordButton from '../assets/Record Button.png';
import StopButton from '../assets/Stop Button.png';
import PlayButton from '../assets/Play Button.png';
import SubmitButton from '../assets/Submit Button.png';
import './GameRoomAudio.css';

const GameRoomAudio = () => {
    const {username} = useParams();
    const {room_code} = useParams();
    const {round} = useParams();

    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const [timeRemaining, setTimeRemaining] = useState(30); // 60 seconds
    const [peopleLeft, setPeopleLeft] = useState(0);
    
    const [prevText, setPrevText] = useState('');

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

    useEffect(() => {
        getRoundApi(room_code).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setPrevText(response.data.prev_content.data);
            }
        });
    }, []);

    const getNext = () => {
            getNextApi(room_code).then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    if(response.data.round > round){
                        navigate(`../${username}/room/${room_code}/text/${response.data.round}`);
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

    const onRecAudio = async () => {
        
        if (isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
        } else {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];
            recorder.start();
            setIsRecording(true);

            recorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                const newAudioUrl = URL.createObjectURL(blob);
                setAudioBlob(blob);
                setAudioUrl(newAudioUrl);
            };

            setMediaRecorder(recorder);
        }
    }

    const recordStart = () => {
        if (!isRecording) {
            onRecAudio();
        }
    }

    const recordStop = () => {
        if (isRecording) {
            onRecAudio();
        }
    }


    const onPlayAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }

    const onSubmitAudio = () => {
        if (audioUrl) {
            const sound = new File([audioBlob], "recording.wav");
            console.log(sound);
            sendAudioApi(room_code, sound, round).then((response) => {
                if (response.status === 200) {

                }
            });
        }
    }

    return (
    <div className="GameTextRecordPage">
      <div className="GTRGameMainWindow">
        
        <div className="GTRRoundNumberFrame">
          <span className="GTRStageNumberText">Round {round}</span>
        </div>
  
        <div className="TextAndRecordFrame">
          
          <div className="ReadTextFrame">
            <span className="PreviousAnswerText">{prevText}</span>
          </div>
  
          <div className="RecordVoiceFrame">
            <div className="RecordButtonFrame">
              <button className="RecordButton" onClick = {recordStart}>
                <img
                    className="RecordButton"
                    src = {RecordButton}// 실제 이미지 경로에 맞게 수정 필요
                />
              </button>
            </div>
  
            <span className="RecordTimeRemaining">{peopleLeft}</span>
  
            <div className="StopButtonFrame">
              <button className="StopButton" onClick={recordStop}>
                <img
                    className="StopButton"
                    src = {StopButton}// 실제 이미지 경로에 맞게 수정 필요
                />
              </button>
            </div>
          </div>
        </div>
  
        <div className="PlayOrSubmitFrame">
          <div className="PlayButtonFrame">
            <button className="PlayButton" onClick = {onPlayAudio}>
              <img
                  className="PlayButton"
                  src = {PlayButton}// 실제 이미지 경로에 맞게 수정 필요
              />
            </button>
          </div>
  
          <div className="SubmitButtonFrame">
            <button className="SubmitButton" onClick = {onSubmitAudio}>
              <img
                  className="SubmitButton"
                  src = {SubmitButton}// 실제 이미지 경로에 맞게 수정 필요
              />
            </button>
          </div>
        </div>
  
        <div className="GTRRoundRemainTimeFrame">
          <span className="GTRTimeRemaining">{timeRemaining}</span>
        </div>
  
      </div>
    </div>

    );
}

export default GameRoomAudio;