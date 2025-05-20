// src/pages/Info.tsx
import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { getPortraitImage, submitUserInfo } from '../../api/api'
import { useUserId } from '../../contexts/UserIdContext'

import {FaUserCircle} from "react-icons/fa"

export default function Info() {
    const { user, setUser } = useUser()
    const userId = useUserId()

    const navigate = useNavigate()

    const [photo, setPhoto] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [name, setName] = useState(user.name ?? '')
    const [gender, setGender] = useState(user.gender ?? '')
    const [age, setAge] = useState(user.age ? String(user.age) : '')

    const isFormComplete = photo && name && gender && age

    useEffect(() => {
        console.log("현재 입력 값:", { photo, name, gender, age })
    }, [photo, name, gender, age])

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfileClick = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setPhoto(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleNext = () => {
        
        if (!photo) return

        async function upload() {
            if (userId && photo) {
                const res = await submitUserInfo(userId, {
                    name: name,
                    gender: gender,
                    age: Number(age),
                    photoBinary: photo,   // ✅ File or Blob 전달
                })

                if (res) {
                    console.log("업로드 성공")
                    const portraitUrl = await getPortraitImage(userId)
                    setUser({
                        ...user,
                        name,
                        gender,
                        age: Number(age),
                        photoFile: photo,                                     // ✅ 서버 업로드용 File
                        photoUrl: URL.createObjectURL(photo),                 // ✅ 화면 미리보기용 URL
                        portraitUrl: portraitUrl,                              // ✅ 서버에서 가져온 영정사진 URL
                    })

                    navigate('/main')
                }
            }
        }

        
        upload()        
    }

    return (
        <Container>
            <ProfileWrapper onClick={handleProfileClick}>
                {previewUrl ? (
                    <ProfileImage src={previewUrl} alt="프로필 미리보기" />
                ) : (
                    <FaUserCircle size={140} color="#fff" />
                )}
                <HiddenInput
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                />
            </ProfileWrapper>
            <Title>나의 정보 입력</Title>
            <Form>
                <Label>이름</Label>
                <Input
                    type="text"
                    placeholder="이름을 입력하세요"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                    }
                />

                <Label>성별</Label>
                <Select
                    value={gender}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setGender(e.target.value)
                    }
                >
                    <option value="">선택하세요</option>
                    <option>남성</option>
                    <option>여성</option>
                    <option>기타</option>
                </Select>

                <Label>나이</Label>
                <Input
                    type="number"
                    placeholder="나이를 입력하세요"
                    value={age}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAge(e.target.value)
                    }
                />
                <br />

                {isFormComplete && (
                    <NextButton onClick={handleNext}>다음으로</NextButton>
                )}
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    height: 100vh;
    background-color: rgba(248, 248, 248, 0);
`

const Title = styled.h2`
    font-size: 2.3rem;
    color: #fff;
    margin-bottom: 2rem;
    font-family: 'Noto Sans KR', sans-serif;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    color: #fff;
    gap: 1rem;
    width: 300px;
`

const Label = styled.label`
    font-size: 1.2rem;
    color: #fff;
    font-family: 'Noto Sans KR', sans-serif;
`

const Input = styled.input`
    font-size: 1.1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: #fff;
`

const Select = styled.select`
    font-size: 1.1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
    font-family: 'Noto Sans KR', sans-serif;
`

const NextButton = styled.button`
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #ECEFCA;
    color: #213448;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color:rgb(172, 174, 145);
    }
`

const ProfileWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    width: 170px;
    height: 170px;
    border-radius: 10%;
    object-fit: cover;
    border: 4px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`;

const HiddenInput = styled.input`
    display: none;
`;