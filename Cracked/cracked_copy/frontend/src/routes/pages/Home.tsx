// pages/Home.tsx
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserInfo } from '../../api/api'
import { useUserId } from '../../contexts/UserIdContext'

import { ReactTyped } from 'react-typed'

export default function Home() {
    const userId = useUserId()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserInfo() {
            if (userId) {
                const res = await getUserInfo(userId)
                if (res) {
                    navigate('/main')
                }                
            }
        }

        fetchUserInfo()
    }, [userId])

    return (
        <Container>
            <Header>
            <ReactTyped
                strings={[
                    '묘비에 남길 말을 적어보세요.',
                    '죽음을 생각하며 오늘을 살아보세요.',
                    '나의 마지막 한 마디를 남겨주세요.'
                ]}
                loop={true}
                typeSpeed={60}
                backSpeed={30}
                // loop={false}
            />
            </Header>
            <StartButton onClick={() => navigate('/info')}>시작하기</StartButton>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(248, 248, 248, 0);
`

const Header = styled.h1`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
`

const StartButton = styled.button`
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #ECEFCA;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ECEFCA;
    }
`