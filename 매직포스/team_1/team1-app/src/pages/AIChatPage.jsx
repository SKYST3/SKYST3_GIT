import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  background-color: white;
  padding: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`;

const IntroCard = styled.div`
  background-color: #f8f9fa;
  padding: 16px;
  margin: 16px;
  border-radius: 12px;
  color: #333;
  font-size: 14px;
`;

const ChatContainer = styled.div`
  height: calc(100vh - 250px);
  overflow-y: auto;
  padding: 16px;
`;

const Message = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.$isUser ? '#C966EC' : '#e9e9e9')};
  color: ${(props) => (props.$isUser ? 'white' : '#333')};
  padding: 12px;
  border-radius: 18px;
  max-width: 60%;
  word-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #eee;
  padding: 12px;
  background-color: white;
  position: sticky;  // 💡 스크롤해도 항상 보이도록
  bottom: 0;         // 💡 화면의 맨 아래에 고정
  z-index: 100;      // 💡 다른 요소보다 위에 표시
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 20px;
  border: none;
  background-color: #C966EC;
  color: white;
  cursor: pointer;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  padding: 0 16px;
`;

const Tag = styled.button`
  background-color: #f3e8ff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  color: #c966ec;
`;

const tags = ['근황이 궁금해', '넌 이런 날씨에 뭐 했어?', '요즘 고민이 있어'];

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  /**
   * 메시지 전송 핸들러
   */
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    console.log("[디버그] 사용자 메시지 전송:", message);
    setInputValue(''); // 입력창 비우기
    const userMessage = { sender: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:8080/chat/1', {
        userQuestion: message,
      });

      console.log("[디버그] 서버 응답 수신:", response.data);

      // ✅ 값이 배열 형태로 오기 때문에 join으로 합치기
      const replyContent = Object.values(response.data).join('');

      // ✅ 최종 메시지 전송
      const aiMessage = {
        sender: 'ai',
        content: replyContent ? replyContent : "응답을 받지 못했습니다.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('[디버그] 서버 오류 발생:', error.message);
      if (error.response) {
        console.error('[디버그] 서버 응답 코드:', error.response.status);
        console.error('[디버그] 서버 응답 데이터:', error.response.data);
      }
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', content: '오류가 발생했습니다. 다시 시도해 주세요.' },
      ]);
    }
  };

  /**
   * Enter 키 입력 처리
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  /**
   * JSX 렌더링
   */
  return (
    <Container>
      <Header>AI 채팅</Header>
      <IntroCard>
        고인과 대화할 수 있어요<br />
        고인의 말투를 학습한 AI와 대화할 수 있는 챗봇입니다.<br />
        <small>*욕설과 비방은 예고없이 삭제되며 형사처벌의 원인이 됩니다.</small>
      </IntroCard>

      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => handleSendMessage(tag)}>
            {tag}
          </Tag>
        ))}
      </TagContainer>

      <ChatContainer>
        {messages.map((message, index) => (
          <Message key={index} $isUser={message.sender === 'user'}>
            <MessageBubble $isUser={message.sender === 'user'}>
              {message.content}
            </MessageBubble>
          </Message>
        ))}
      </ChatContainer>

      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}  // ✅ Enter 키로 전송 처리
          placeholder="대화를 입력하세요"
        />
        <Button onClick={() => handleSendMessage(inputValue)}>전송</Button>
      </InputContainer>
    </Container>
  );
};

export default AIChatPage;
