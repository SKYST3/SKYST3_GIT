// src/pages/VoiceLearningPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Camera } from 'lucide-react';
import AudioRecorder from '../components/AudioRecorder';

const Container = styled.div`
  display: flex; flex-direction: column; padding: 16px; gap: 20px;
`;
const QuestionCard = styled.div`
  background: #f8f9fa; padding: 16px; border-radius: 12px;
  display: flex; justify-content: space-between; align-items: center;
`;
const QuestionText = styled.div`
  font-size: 16px; font-weight: bold;
`;
const UserBadge = styled.div`
  background: #c966ec; color: white; border-radius: 50%;
  padding: 8px 12px; font-size: 14px;
`;
const CameraButton = styled.button`
  width: 100%; height: 200px; background: #f3e8ff; border: none;
  border-radius: 12px; display: flex; justify-content: center;
  align-items: center; cursor: pointer;
`;
const ResultMessage = styled.div`
  margin-top: 16px; color: ${props => props.success ? 'green' : 'red'};
`;

const VoiceLearningPage = () => {
  const [uploadResult, setUploadResult] = useState(null);
  const userId = 1; // 테스트용

  return (
    <Container>
      <h2>오늘의 질문</h2>
      <QuestionCard>
        <div>
          <QuestionText>
            힘든 하루하루를 버틸 수 있게 만든 건 어떤 순간들 덕분이었나요?
          </QuestionText>
          <div>준비가 되면 3분 이상 촬영해주세요.</div>
        </div>
        <UserBadge>민정</UserBadge>
      </QuestionCard>

      <CameraButton>
        <Camera size={48} />
      </CameraButton>

      {/* AudioRecorder에 userId 전달, onUploadDone 콜백 등록 */}
      <AudioRecorder
        userId={userId}
        onUploadDone={(success) => setUploadResult(success)}
      />

      {uploadResult !== null && (
        <ResultMessage success={uploadResult}>
          {uploadResult ? '업로드가 완료되었습니다!' : '업로드에 실패했습니다.'}
        </ResultMessage>
      )}
    </Container>
  );
};

export default VoiceLearningPage;
