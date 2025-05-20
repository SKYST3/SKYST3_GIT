import { useUserContext } from '../contexts/UserContext'

export default function useUser(): ReturnType<typeof useUserContext> {
    return useUserContext()
}