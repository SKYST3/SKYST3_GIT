import React from 'react';
import AudioRecorder from '../components/AudioRecorder';
import axios from 'axios';

const VoiceRecordingPage = () => {
  const handleSave = async (audioBlob) => {
    console.log("[🔍 오디오 Blob 생성됨]: ", audioBlob);

    // 🔥 FormData에 Blob을 audio/wav로 추가
    const formData = new FormData();
    formData.append('file', audioBlob, `recording_${Date.now()}.wav`);

    try {
      console.log("[🚀 업로드 시작] 백엔드로 전송 중...");

      // 🔥 수정된 부분: userId는 1번으로 하드코딩 (테스트용)
      const userId = 1;
      const response = await axios.post(`http://127.0.0.1:8080/upload-audio/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`[📡 업로드 진행 중]: ${percentCompleted}%`);
        },
      });

      if (response.status === 200) {
        console.log('✅ [업로드 성공]:', response.data);
        alert("업로드가 성공적으로 완료되었습니다!");
      } else {
        console.error('❌ [업로드 실패]');
        alert("업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error('[❌ 업로드 중 에러 발생]:', error.message);
      if (error.response) {
        console.error('[디버그] 서버 응답 코드:', error.response.status);
        console.error('[디버그] 서버 응답 데이터:', error.response.data);
      }
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Voice Recording</h1>
      <AudioRecorder onSave={handleSave} />
    </div>
  );
};

export default VoiceRecordingPage;
