import { useEffect, useState } from "react"
import styled from "styled-components"
import { answerQeuestion, createQuestion, createSession, getAllChats, getAllSessions } from "../api/api"
import { getUserIdImediately } from "../contexts/UserIdContext"

type Chat = {
    id: number
    question: string
    answer: string
}

export default function StarBox() {

    // const userid = useUserId()
    const [sessions, setSessions] = useState<number[]>([])
    const [chats, setChats] = useState<Chat[]>([])

    useEffect(() => {
        const id = getUserIdImediately()
        if (!id) return
        
        async function fetchSessions() {
            const res = await getAllSessions(id as string)
            const sessionIds = res.map((s) => s.id)
            setSessions(sessionIds)

            await Promise.all(
                sessionIds.map(async (session) => {
                    const res = await getAllChats(id as string, session)
                    const newChats: Chat[] = res.map((chat) => ({
                        id: chat.id,
                        question: chat.question,
                        answer: chat.answer,
                    }))
                    return newChats
                })
            ).then((results) => {
                const allChats = results.flat()
                setChats(allChats)
            })

        }

        fetchSessions()
    }, [])


    const handleNewQuestion = async () => {
        const id = getUserIdImediately()
        if (!id) return
        const res = await createSession(id as string, "#FF0000", 0, 0, 100)
        if (!res) return
        setSessions((prev) => [...prev, res.id])

        const questionRes = await createQuestion(id as string, res.id)
        if (!questionRes) return

        setChats((prev) => [...prev, { id: res.id, question: questionRes.question, answer: "" }])
    }

    const handleAnswerChange = (sessionId: number, answer: string) => {
        setChats((prev) => {
            const updatedChats = prev.map((chat) => {
                if (chat.id === sessionId) {
                    return { ...chat, answer: answer }
                }
                return chat
            })
            return updatedChats
        })
    }

    const handleAnswerSubmit = async (sessionId: number, answer: string) => {
        const id = getUserIdImediately()
        if (!id) return

        const res = await answerQeuestion(id as string, String(sessionId), answer)
        if (!res) return
        setChats((prev) => {
            const updatedChats = prev.map((chat) => {
                if (chat.id === sessionId) {
                    return { ...chat, answer: answer }
                }
                return chat
            })
            return updatedChats
        })
    }

    return (
        <Container>
            <Header>솔직한 이야기에 도움이 될 만한 질문을 던져요</Header>
            <SessionContainer>
                {sessions.map((session) => (
                    <SessionBox key={session}>
                        {chats.filter(chat => chat.id === session).map((chat) => (
                            <div key={chat.id}>
                                <p>질문: {chat.question}</p>
                                <p>답변: {chat.answer}</p>
                                <input
                                    type="text"
                                    placeholder="답변을 입력하세요"
                                    onChange={(e) => handleAnswerChange(chat.id, e.target.value)}
                                />
                                <button onClick={() => handleAnswerSubmit(chat.id, chat.answer)}>답변 제출</button>
                            </div>
                        ))}
                    </SessionBox>
                ))}
            </SessionContainer>
            <CreateButtion onClick={() => handleNewQuestion()} >질문 생성</CreateButtion>
        </Container>
    ) 
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
`
const Header = styled.h2`
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.5rem;
    color: white;
`

const SessionContainer = styled.div`
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-in-out;
    max-height: 30vh;
    overflow-y: auto;
`

const SessionBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`


const CreateButtion = styled.button`
    padding: 0.75rem 1.5rem;
`

// const StarIcon = styled.div``