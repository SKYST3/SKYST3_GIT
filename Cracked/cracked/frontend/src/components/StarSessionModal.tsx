// src/components/StarSessionModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getAllChats, answerQeuestion, createQuestion } from '../api/api';

interface StarSessionModalProps {
    userId: string;
    sessionId: number;
    onClose: () => void;
}

type Chat = {
    id: number;
    question: string;
    answer: string;
};

export default function StarSessionModal({ userId, sessionId, onClose }: StarSessionModalProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    // 세션의 모든 Q&A 불러오기
    useEffect(() => {
        async function fetchChats() {
            const res = await getAllChats(userId, sessionId);
            setChats(res);
        }
        fetchChats();
    }, [userId, sessionId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    // 답변 입력 시 상태 업데이트
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // 답변 제출
    const handleSend = async () => {
        if (!input.trim()) return;
        await answerQeuestion(userId, String(sessionId), input);
        await createQuestion(userId, sessionId);
        const res = await getAllChats(userId, sessionId);
        setChats(res);
        setInput('');
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalSheet onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <ChatBox>
                    {chats.map((chat: Chat, idx: number) => (
                        <div key={idx}>
                            <MsgQ>Q. {chat.question}</MsgQ>
                            <MsgA>A. {chat.answer}</MsgA>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </ChatBox>
                <InputRow>
                    <Input
                        value={input}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                console.log("wtf");
                                e.preventDefault(); // 기본 제출 동작 방지
                                // handleSend();
                            }
                        }}
                        placeholder="답변을 입력하세요..."
                    />
                    <SendBtn onClick={handleSend}>전송</SendBtn>
                </InputRow>
            </ModalSheet>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div`
    position: fixed;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.7);
    z-index: 2000;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 5vh;
`;
const ModalSheet = styled.div`
    background: #222b;
    border-radius: 16px;
    padding: 2rem;
    min-width: 350px;
    max-width: 90vw;
    min-height: 300px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    margin-top: 2vh;
`;
const ChatBox = styled.div`
    flex: 1; overflow-y: auto; margin-bottom: 1rem;
`;
const MsgQ = styled.div`
    text-align: left;
    color: #ffd700;
    margin: 0.5rem 0 0.2rem 0;
    font-size: 1.1rem;
    font-weight: bold;
`;
const MsgA = styled.div`
    text-align: left;
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.1rem;
`;
const InputRow = styled.div`
    display: flex; gap: 0.5rem;
`;
const Input = styled.input`
    flex: 1; padding: 0.5rem; border-radius: 8px; border: none; font-size: 1rem;
`;
const SendBtn = styled.button`
    background: #ffd700; color: #222; border: none; border-radius: 8px; padding: 0.5rem 1rem;
    font-weight: bold; cursor: pointer;
`;