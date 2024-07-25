'use client'
import { useContext, useEffect, useState } from "react"
import UserContext from "@/context/UserContext"
import UserSection from "./UserSection"
import ContentCreatorSection from "./ContentCreatorSection"
import LiveStreamSection from "./LiveStreamSection"
import ReportsSection from "./ReportsSection"
import PortfolioSection from "./PortfolioSection"
import { useSearchParams, useRouter } from "next/navigation"

const sections: ('users' | 'contents' | 'liveStreams' | 'reports' | 'portfolio')[] = ['reports' , 'users', 'contents', 'liveStreams', 'portfolio']

function Dashboard() {
    const {user} = useContext(UserContext)
    const searchParams = useSearchParams()
    const router = useRouter()

    const setSection = (key: string) => {
        router.push(`?section=${key}`)
    }

    useEffect(() => {
        if(searchParams?.get('section') === null){
            setSection('reports')
            console.log('1')
        }

    }, [])


  return (
    <>
        { (user && user.privilege === 'admin') ?
            <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px] items-center w-[100%] justify-start">
                <div className="bg-white box-shadow-extra-small border-[1px] flex flex-col gap-[16px] border-black p-[16px] h-[100%] w-full lg:w-[1024px]">
                    <div>!Refresh this page after every change!</div>
                    <div className={`flex gap-[8px] flex-wrap`}>
                        {sections.map(key => <div key={key}>
                            {searchParams?.get('section') === key ? 
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
                    {searchParams?.get('section')==='reports' && <ReportsSection/>}
                    {searchParams?.get('section')==='users' && <UserSection />}
                    {searchParams?.get('section')==='contents' && <ContentCreatorSection />}
                    {searchParams?.get('section')==='liveStreams' && <LiveStreamSection/>}
                    {searchParams?.get('section')==='portfolio' && <PortfolioSection/>}
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