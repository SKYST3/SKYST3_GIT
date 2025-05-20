// src/components/AudioRecorder.jsx
import React, { useState, useRef } from 'react';
import Recorder from 'recorder-js';

const AudioRecorder = ({ userId, onUploadDone }) => {
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    recorderRef.current = new Recorder(audioContext);
    await recorderRef.current.init(stream);
    recorderRef.current.start();
    console.log('[🔍] 녹음 시작');
    setRecording(true);
  };

  const stopRecording = async () => {
    const { blob, buffer } = await recorderRef.current.stop();
    console.log('[🔍] 녹음 중지, Blob:', blob);
    setRecording(false);

    // WAV Blob 타입 확인
    console.log(' • size:', blob.size, 'type:', blob.type);

    // 업로드
    const formData = new FormData();
    formData.append('file', blob, `recording_${Date.now()}.wav`);
    console.log('[🔍] FormData에 Blob 추가 완료');

    try {
      console.log('[🚀] 업로드 시작:', `http://127.0.0.1:8080/upload-audio/${userId}`);
      const res = await fetch(`http://127.0.0.1:8080/upload-audio/${userId}`, {
        method: 'POST',
        body: formData
      });
      console.log('[🔍] 서버 응답 상태:', res.status);
      if (res.ok) {
        console.log('[✅] 업로드 성공');
        onUploadDone && onUploadDone(true);
      } else {
        console.error('[❌] 업로드 실패', await res.text());
        onUploadDone && onUploadDone(false);
      }
    } catch (e) {
      console.error('[❌] 업로드 중 에러:', e);
      onUploadDone && onUploadDone(false);
    }
  };

  return (
    <div>
      {recording
        ? <button onClick={stopRecording}>녹음 중지</button>
        : <button onClick={startRecording}>녹음 시작</button>
      }
    </div>
  );
};

export default AudioRecorder;
