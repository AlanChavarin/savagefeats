'use client'
import { useContext, useEffect } from "react"
import UserContext from "@/context/UserContext"

function Logout(){
    const {user, logout} = useContext(UserContext)

    useEffect(() => {
        logout()
    }, [logout])

    return(
        <div className="flex items-center justify-center flex-1">
            {!user && <>You have been successfully logged out</>}
        </div>
    )
}

export default Logout