// src/pages/Grave.tsx
import styled, { keyframes } from 'styled-components'
import {  useEffect, useState } from 'react'
import { getUserIdImediately } from '../../contexts/UserIdContext'
import { exploreOtherGrave } from '../../api/api'
import graveIcon from '../../assets/grave-icon.png'
import graveBack from '../../assets/grave-back.png'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


export default function Grave() {

    const [isModalOpen, setIsModalOpen] = useState(false) // ✅ modal 상태
    const [epitaph, setEpitaph] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        fetchNextGraveContent()
    }, [])

    const fetchNextGraveContent = async () => {
        const id = getUserIdImediately()
        if (!id) return
        const res = await exploreOtherGrave(id as string)
        if (res) {
            setIsModalOpen(false)
            setEpitaph(res.grave_content)

        } else {
            console.log("묘비문을 가져오는 데 실패했습니다.")
        }
    }

    const onClickNextGrave = async () => {
        setEpitaph('')
        await fetchNextGraveContent()
    }
    

    return (
        <Container>
            <GraveIconWrapper>
                <HomeButton onClick={() => navigate('/main')}>
                    <FaHome size={50} color="white"/>
                </HomeButton>

                <GraveIcon onClick={() => setIsModalOpen(true)}>
                    <img src={graveIcon} alt="묘비 아이콘" style={{ width: 300, height: 300 }} />
                </GraveIcon>
                
                <ArrowButton onClick={() => onClickNextGrave()}>
                    <FaArrowAltCircleRight size={50} color="white"/>
                </ArrowButton>
            </GraveIconWrapper>


            {isModalOpen && (
                    <ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <ModalSheet onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <GraveBackImg src={graveBack} alt="묘비 배경" />
                            <EpitaphInput
                                readOnly
                                value={epitaph}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEpitaph(e.target.value)}
                                placeholder=""
                            />
                        </ModalSheet>
                    </ModalOverlay>
                )}


        </Container>
    )
}

const Container = styled.div`
    display: flex;
    height: 100vh;
`

const HomeButton = styled.div`
    position: absolute;
    left: -15rem;
    top: 100%;
    transform: translateY(-80%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-50%) scale(1.2);   // ✅ hover 시 확대
    }
`


const GraveIconWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const GraveIcon = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ArrowButton = styled.div`
    position: absolute;
    right: -15rem;
    top: 100%;
    transform: translateY(-80%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-50%) scale(1.2);   // ✅ hover 시 확대
    }
`

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: flex-end;          // ✅ 아래서 시작
`

const ModalSheet = styled.div`
    position: relative;
    background: none;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 1/1.2; // 묘비 이미지 비율에 맞게 조정
    margin: 0 auto;
    // box-shadow: 0 -4px 15px rgba(0,0,0,0.2);
    animation: ${slideUp} 0.3s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

// const ModalTitle = styled.h2`
//     font-size: 1.3rem;
//     margin-bottom: 1rem;
//     text-align: center;
// `

const EpitaphInput = styled.textarea`
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 55%; // 묘비 중앙에 오도록 조정 (이미지에 따라 값 조정)
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    background: rgba(255,255,255,0.0);
    border: none;
    color: rgba(255,255,255,0.7);
    font-family: 'YiSunShinRegular';
    font-style: normal;

    font-size: 1.5rem;
    text-align: center;
    resize: none;
    outline: none;
    // font-family: 'Noto Sans KR', sans-serif;
    // 필요시 box-shadow, padding 등 추가
`

const GraveBackImg = styled.img`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
    pointer-events: none;
    user-select: none;
`