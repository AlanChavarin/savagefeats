'use client'

import { useContext } from "react"
import UserContext from "@/context/UserContext"
import UserSection from "./UserSection"
import ContentCreatorSection from "./ContentCreatorSection"
import LiveStreamSection from "./LiveStreamSection"
import ReportsSection from "./ReportsSection"

function Dashboard() {
    const {user} = useContext(UserContext)
  return (
    <>
        { (user && user.privilege === 'admin') ?
            <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px] items-center w-[100%] justify-start">
                <div className="bg-white box-shadow-extra-small border-[1px] flex flex-col gap-[16px] border-black p-[16px] h-[100%] max-w-[512px]">
                    <div>!Refresh this page after every change!</div>
                    <UserSection />
                    <ContentCreatorSection />
                    <LiveStreamSection/>
                    <ReportsSection/>
                </div>
            </div>
            :
            <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px] items-center  w-[100%] justify-center">
                You do not have permission to access this page
            </div>

        }
    </>
  )
}
export default Dashboard