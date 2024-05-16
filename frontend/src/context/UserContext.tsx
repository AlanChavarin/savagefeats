'use client'
import { createContext, useState, useEffect, ReactNode} from 'react'

interface User {
  name: string
  privilege: string
  verified: string
}

// Define a type for the context value
interface UserContextType {
    user: User | null
    logout: () => void
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
interface UserProviderProps {
    children: ReactNode
  }


  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<null | User>(null)

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            fetch('http://localhost:5000/api/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
            .then((data: User) => {
                setUser(data)
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
