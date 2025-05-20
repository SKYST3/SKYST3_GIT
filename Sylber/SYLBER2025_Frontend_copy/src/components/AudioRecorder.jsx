import React, { useState, useEffect } from 'react';
import { sendAudioApi} from '../apis/usersApi';


function AudioRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    
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
    const onPlayAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    }
    const onDownloadAudio = () => {
        if (audioBlob) {
            console.log(audioUrl);
            const a = document.createElement('a');
            a.href = audioUrl;
            a.download = 'recording.wav';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // URL.revokeObjectURL(audioUrl); // 메모리 해제
        }
    }
    const onSubmitAudio = () => {
        if (audioUrl) {
            const sound = new File([audioUrl], "recording.wav");
            console.log(sound);
        }
    }
        

    // useEffect(() => {
    //     if (audioBlob) {
    //         const formData = new FormData();
    //         formData.append('audio', audioBlob, 'recording.wav');

    //         // 여기에 서버에 업로드하는 API 호출을 추가하세요.
    //         // 예: uploadAudio(formData);
    //     }
    // }, [audioBlob]);




  
  return (
    <>
      <button onClick={onRecAudio}>녹음</button>
      <button onClick={onPlayAudio}>재생</button>
      <button onClick={onDownloadAudio}>다운로드</button>
      <button onClick={onSubmitAudio}>전송</button>
    </>
  );
}

export default AudioRecorder;