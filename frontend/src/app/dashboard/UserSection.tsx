'use client'

import { useState, useEffect, useContext } from "react"
import UserContext from "@/context/UserContext"
import { userSchemaType } from "../types/types"
import { toast } from "react-toastify"
import { errorSchema, userSchema } from "../schemas/schemas"
import { z } from "zod"
import UserComponent from "./UserComponent"

const responseSchema = z.object({
    count: z.number(),
    users: z.array(userSchema)
})

function UserSection() {

    const {user} = useContext(UserContext)
    const [users, setUsers] = useState<userSchemaType[] | undefined>(undefined)

    const grabUsers = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
        })
        .then(r => r.json())
        .then(data => {
            const validatedData = responseSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setUsers(validatedData.data.users)
                return
            }

            if(validatedError.success){
                throw new Error(validatedError.data.errorMessage)
            }

            console.error(validatedData.error.toString())
            console.error(validatedError.error.toString())
            throw new Error('Unexpected data. Check console for further details')
        }).catch(err => {
            toast.error(err.message)
        })
    }

    useEffect(() => {
        if(user?.privilege === 'admin' && user.verified === true){
            grabUsers()
        }
    }, [])

  return (
    <div className="flex flex-col gap-[8px]">
        <div className="font-bold">Users: </div>
        {users && users.map(user => <UserComponent key={user.name + 'usernamekey'} userData={user} grabUsers={() => grabUsers()}/>)}
        {/* <button type="button" className="bg-white hover:bg-gray-200 border-[1px] border-black w-fit flex flex-row justify-center items-center gap-[8px] px-[8px] cursor-pointer mt-[8px]">
            + Generate signup link for new user 
        </button> */}
    </div>
  )
}
export default UserSection