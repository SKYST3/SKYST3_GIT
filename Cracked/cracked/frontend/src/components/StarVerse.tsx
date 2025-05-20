import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Star from './Star';
import StarSessionModal from './StarSessionModal';
import { getAllSessions, createSession, createQuestion } from '../api/api';

function getRandomColor() {
    // 원하는 색상 팔레트가 있다면 배열로 지정해도 됩니다.
    const colors = [
        "#FFD700", // gold
        "#00BFFF", // deep sky blue
        "#FF69B4", // hot pink
        "#ADFF2F", // green yellow
        "#FFA500", // orange
        "#FFFFFF", // white
        "#B0C4DE", // light steel blue
        "#FF4500", // orange red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomSize() {
    // 12~32px 사이 랜덤 크기
    return Math.floor(Math.random() * 20) + 12;
}

export default function StarVerse({ userId }) {
    const [stars, setStars] = useState([]); // [{id, x, y}]
    const [selectedStar, setSelectedStar] = useState(null); // {id, x, y}
    const [modalOpen, setModalOpen] = useState(false);

    // 최초 별 목록 불러오기
    useEffect(() => {
        async function loadStars() {
            const starList = await getAllSessions(userId);
            setStars(starList);
        }
        loadStars();
    }, [userId]);

    const handleSkyClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!userId) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const color = getRandomColor();
        const size = getRandomSize();

        // 1. 세션(별) 생성
        const newSession = await createSession(userId, color, x, y, size);
        if (!newSession) return;

        // 2. 질문 생성
        await createQuestion(userId, newSession.id);

        // 3. 별 목록 새로고침
        const starList = await getAllSessions(userId);
        setStars(starList);
    };

    // 별 클릭 시 세션 모달 오픈
    const handleStarClick = (star) => {
        setSelectedStar(star);
        setModalOpen(true);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedStar(null);
    };

    return (
        <StarVerseWrapper>
            <Sky onClick={handleSkyClick}>
                {stars.map(star => (
                    <Star
                        key={star.id}
                        x={star.x}
                        y={star.y}
                        color={star.color}
                        size={star.size}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleStarClick(star);
                        }}
                    />
                ))}
                {modalOpen && selectedStar && (
                    <StarSessionModal
                        userId={userId}
                        sessionId={selectedStar.id}
                        onClose={handleCloseModal}
                    />
                )}
            </Sky>
        </StarVerseWrapper>
    );
}

const StarVerseWrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 50vh; // 별 배경이 차지할 영역 (예: 상단 50%)
    overflow: hidden;
    z-index: 0;
`;

const Sky = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    overflow: hidden;
    cursor: crosshair;
`;
