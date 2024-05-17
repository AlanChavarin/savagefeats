'use client'
import { createContext, useState, useEffect, ReactNode} from 'react'
import { z } from "zod"
import { errorSchema } from '@/app/schemas/schemas'
import { toast } from 'react-toastify'

//schema for incoming user data
const userSchema = z.object({
    name: z.string(),
    privilege: z.string(),
    verified: z.boolean(),
})

type User = z.infer<typeof userSchema>

// Define a type for the context value
interface UserContextType {
    user: User | null,
    logout: (() => void),
    initUser: (() => void) //scans local storage for token
}

// Create the context with a default value
const UserContext = createContext<UserContextType>({user: null, logout: () => null, initUser: () => null});

// Create a provider component
interface UserProviderProps {
    children: ReactNode
}
  
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const initUser = () => {
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
                const validatedData = userSchema.safeParse(data)
                const validatedError = errorSchema.safeParse(data)
                
                if(validatedData.success){
                    setUser(validatedData.data)
                    return
                }

                if(validatedError.success){
                    throw new Error(validatedError.data.errorMessage)
                }

                throw new Error('unexpected data error')
            })
            .catch(err => {
                toast(err.message)
                console.log(err.message)
            })
        }
    }

    
    useEffect(() => {
        initUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, logout, initUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
function setError(arg0: string, arg1: { message: any }) {
    throw new Error('Function not implemented.')
}

