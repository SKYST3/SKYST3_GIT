// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState } from 'react'
import type { userInfo } from '../types/type'


interface UserContextType {
    user: userInfo
    setUser: (user: userInfo) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<userInfo>({
        name: '',
        photoUrl: '',
        photoFile: undefined,   // ✅ 초기값 undefined
        gender: '',
        age: undefined,
        portraitUrl: '',
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}