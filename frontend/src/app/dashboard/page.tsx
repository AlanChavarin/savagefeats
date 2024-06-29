'use client'

import { useContext, useState } from "react"
import UserContext from "@/context/UserContext"
import UserSection from "./UserSection"
import ContentCreatorSection from "./ContentCreatorSection"
import LiveStreamSection from "./LiveStreamSection"
import ReportsSection from "./ReportsSection"
import PortfolioSection from "./PortfolioSection"

const sections: ('users' | 'contents' | 'liveStreams' | 'reports' | 'portfolio')[] = ['users', 'contents', 'liveStreams', 'reports', 'portfolio']

function Dashboard() {
    const {user} = useContext(UserContext)

    const [section, setSection] = useState<'users' | 'contents' | 'liveStreams' | 'reports' | 'portfolio'>('users')

  return (
    <>
        { (user && user.privilege === 'admin') ?
            <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px] items-center w-[100%] justify-start">
                <div className="bg-white box-shadow-extra-small border-[1px] flex flex-col gap-[16px] border-black p-[16px] h-[100%] w-[512px]">
                    <div>!Refresh this page after every change!</div>
                    <div className={`flex flex-flex-row gap-[8px] flex-wrap`}>
                        {sections.map(key => <div>
                            {section === key ? 
                                <div onClick={() => setSection(key)} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-custom-primary box-shadow-extra-small flex items-center justify-center">
                                    {key}
                                </div>
                                :
                                <div onClick={() => setSection(key)} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-white box-shadow-extra-small flex items-center justify-center">
                                    {key}
                                </div>            
                            }
                        </div>)}
                    </div>
                    {section==='users' && <UserSection />}
                    {section==='contents' && <ContentCreatorSection />}
                    {section==='liveStreams' && <LiveStreamSection/>}
                    {section==='reports' && <ReportsSection/>}
                    {section==='portfolio' && <PortfolioSection/>}
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