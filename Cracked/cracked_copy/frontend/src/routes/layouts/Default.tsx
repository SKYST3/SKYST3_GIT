// src/layouts/AppLayout.tsx
import type { ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../styles/theme'
import { UserIdProvider } from '../../contexts/UserIdContext'
import { UserProvider } from '../../contexts/UserContext'

interface Props {
    children: ReactNode
}

export default function AppLayout({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <UserIdProvider>
                <UserProvider>
                  <Layout>{children}</Layout> 
                </UserProvider>
            </UserIdProvider>
        </ThemeProvider>
    )
}

const Layout = styled.div`
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    // background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    padding: 0%;
`