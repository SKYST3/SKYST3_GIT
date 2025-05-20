// src/contexts/UserIdContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'

const UserIdContext = createContext<string | null>(null)

export const useUserId = () => useContext(UserIdContext)

export const UserIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    let storedId = localStorage.getItem('userId')
    if (!storedId) {
      storedId = generateUserId()
      localStorage.setItem('userId', storedId)
    }
    setUserId(storedId)
  }, [])

  return (
    <UserIdContext.Provider value={userId}>
      {children}
    </UserIdContext.Provider>
  )
}

export const getUserIdImediately = () => {
    const storedId = localStorage.getItem('userId')
    if (storedId) {
        return storedId
    }
}

const generateUserId = () => {
  const randomString = Math.random().toString(36).substring(2, 10)
  const timestamp = Date.now().toString(36)
  return `${randomString}-${timestamp}`
}