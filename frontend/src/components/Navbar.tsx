'use client'
//nextjs
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faBars } from "@fortawesome/free-solid-svg-icons"

//components
import Sidebar from "./Sidebar"

//context
import { useContext } from "react"
import UserContext from "@/context/UserContext"

function Navbar() {

    const {user} = useContext(UserContext)

    const pathname = usePathname()

    const [sidebarToggle, setSidebarToggle] = useState<Boolean>(false)

    const buttonClickEvent = () => {
        setSidebarToggle(!sidebarToggle)
    }

    const [servicesDropdownToggle, setServicesDropdownToggle] = useState<Boolean>(false)
    const [adminDropdownToggle, setAdminDropdownToggle] = useState<Boolean>(false)

    const servicesDropdownToggleEvent = () => {
        setServicesDropdownToggle(!servicesDropdownToggle)
    }

    const adminDropdownToggleEvent = () => {
        setAdminDropdownToggle(!adminDropdownToggle)
    }

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if(!target.getAttribute('data-dropdown')){
            setServicesDropdownToggle(false)
            setAdminDropdownToggle(false)
        }
    }

    useEffect(() => {
        window.addEventListener('mousedown', handleOutsideClick)
    }, [])

    useEffect(() => {
        if(sidebarToggle){
            setSidebarToggle(!sidebarToggle)
        }

        if(servicesDropdownToggle){
            setServicesDropdownToggle(!servicesDropdownToggle)
        }
    }, [pathname])


  return (
    <div className="bg-black h-[64px] flex place-items-center justify-center">
        <div className="max-w-[1200px] w-[85%] hidden md:flex place-items-center justify-between h-full ml-[32px]">
            <Link href="/" className="cursor-pointer hover:bg-color">
                <Image src={'/SVGWHITE.png'} width={96} height={32} alt='savage feats'/>
            </Link>
            <div className="hidden md:flex text-white place-items-center h-full *:mx-[16px] xl:*:mx-[32px] *:text-center  *:font-bold lg:text-[16px] xl:text-[19px] *:cursor-pointer *:h-full *:flex *:place-items-center">
                <Link href="/eyeofophidia/matches" className="hover:text-custom-primary">
                    Matches
                </Link>
                <Link href="/eyeofophidia/events" className="hover:text-custom-primary">
                    Events
                </Link>
                <Link href="/eyeofophidia/decks" className="hover:text-custom-primary">
                    Decklists
                </Link>
                <Link href="/reports" className="hover:text-custom-primary">
                    Reports
                </Link>
                {/* <Link href="/content" className="hover:text-custom-primary">
                    Content
                </Link> */}
                {/* <Link href="/shop" className="hover:text-custom-primary">
                    Shop
                </Link> */}
                
                
                <div className='relative'>
                    <button data-dropdown={true} className="hover:text-custom-primary relative h-full flex gap-[8px] items-center" onClick={() => servicesDropdownToggleEvent()}>
                        Services
                        <FontAwesomeIcon data-dropdown={true} icon={servicesDropdownToggle ? faCaretDown : faCaretUp} width='16px'/>
                    </button>
                    {servicesDropdownToggle && 
                        <div data-dropdown={true} className='z-10 absolute top-[100%] right-[0px] bg-black flex flex-col gap-[16px] p-[16px] w-[256px]'>
                            <Link data-dropdown={true} href="/services" className='text-white hover:text-custom-primary'>
                                Production Services
                            </Link>
                            <Link data-dropdown={true} href="/portfolio" className='text-white hover:text-custom-primary'>
                                Production Portfolio
                            </Link>
                            <Link data-dropdown={true} href="/services#contact" className='text-white hover:text-custom-primary'>
                                Contact Us!
                            </Link>
                        </div>
                    }
                </div>

                {user &&
                    <div className='relative'>
                        <button data-dropdown={true} className="hover:text-custom-primary relative h-full flex gap-[8px] items-center" onClick={() => adminDropdownToggleEvent()}>
                        Admin
                        <FontAwesomeIcon data-dropdown={true} icon={adminDropdownToggle ? faCaretDown : faCaretUp} width='16px'/>
                    </button>
                    {adminDropdownToggle && 
                        <div data-dropdown={true} className='z-10 absolute top-[100%] right-[0px] bg-black flex flex-col gap-[16px] p-[16px] w-[196px]'>
                            <Link data-dropdown={true} href="/dashboard" className='text-white hover:text-custom-primary'>
                                Dashboard
                            </Link>
                            <Link data-dropdown={true} href="/eyeofophidia/postevent" className='text-white hover:text-custom-primary'>
                                Post Event
                            </Link>
                            <Link data-dropdown={true} href="/eyeofophidia/postmatch" className='text-white hover:text-custom-primary'>
                                Post Match
                            </Link>
                            <Link data-dropdown={true} href="/eyeofophidia/postdraft" className='text-white hover:text-custom-primary'>
                                Post Deck
                            </Link>
                            <Link data-dropdown={true} href="/eyeofophidia/postdraft" className='text-white hover:text-custom-primary'>
                                Post Draft
                            </Link>
                            <Link data-dropdown={true} href="/logout" className='text-white hover:text-custom-primary'>
                                Logout
                            </Link>
                        </div>
                    }
                    </div>

                }
            </div>
        </div>

        <div className='flex md:hidden justify-between w-full align-middle mx-[12px]'>
            <Link href="/" className="cursor-pointer hover:bg-color">
                <Image src={'/favicon.png'} width={48} height={48} alt='savage feats'/>
            </Link>
            <button className='text-white flex flex-col justify-center' onClick={() => buttonClickEvent()}>
                <FontAwesomeIcon icon={faBars} className='text-[32px]'/>
            </button>
        </div>

        {sidebarToggle && <Sidebar buttonClickEvent={buttonClickEvent}/>}
        
    </div>
  )
}
export default Navbar