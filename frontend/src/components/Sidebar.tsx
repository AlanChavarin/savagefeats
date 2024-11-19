'use client'
//nextjs
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'

//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faX } from "@fortawesome/free-solid-svg-icons"

//context
import { useContext } from "react"
import UserContext from "@/context/UserContext"

function Sidebar({buttonClickEvent, className}: {buttonClickEvent: () => void, className?: string}) {

  const {user} = useContext(UserContext)
  const pathname = usePathname()

  return (
    <div className={className}>
      <div className="h-screen bg-black w-[256px] md:w-[256px] fixed top-0 right-0 text-white z-[10] transition-transform duration-300 ease-in-out transform translate-x-0 overflow-y-auto">
        <div className="text-[27px] flex flex-col text-white m-[16px] gap-[16px] *:font-bold *:cursor-pointer *:flex *:place-items-center">

          <Link href="/" className="cursor-pointer hover:bg-color">
            <Image src={'/SVGWHITE.png'} width={96} height={32} alt='savage feats'/>
          </Link>

          { pathname?.startsWith('/eyeofophidia') && <>
            <Link href="/eyeofophidia/matches" className="hover:text-custom-primary">
            Matches
            </Link>
            <Link href="/eyeofophidia/events" className="hover:text-custom-primary">
              Events
            </Link>
            <Link href="/eyeofophidia/decks" className="hover:text-custom-primary">
              Decklists
            </Link>
          </>}

          <Link href="/services" className="hover:text-custom-primary">
            Production <br/> Services
          </Link>
          <Link href="/portfolio" className="hover:text-custom-primary">
            Portfolio
          </Link>

          { !pathname?.startsWith('/eyeofophidia') && <>
            <Link href="/eyeofophidia/matches" className="hover:text-custom-primary">
              Matches
            </Link>
            <Link href="/eyeofophidia/events" className="hover:text-custom-primary">
              Events
            </Link>
            <Link href="/eyeofophidia/decks" className="hover:text-custom-primary">
              Decklists
            </Link>
          </>}

          { user && <>
            <Link href="/eyeofophidia/postevent" className="hover:text-custom-primary">
              Post Event
            </Link>
            <Link href="/eyeofophidia/postmatch" className="hover:text-custom-primary">
              Post Match
            </Link>
            <Link href="/eyeofophidia/postdeck" className="hover:text-custom-primary">
              Post Deck
            </Link>
            <Link href="/eyeofophidia/postdraft" className="hover:text-custom-primary">
              Post Draft
            </Link>
            <Link href="/logout" className='text-white hover:text-custom-primary'>
              Logout
            </Link>
          </>}
          <button onClick={() => buttonClickEvent()}>
            <FontAwesomeIcon icon={faX} className="absolute right-[24px] top-[24px] text-[33px]"/>
          </button>
          
        </div>
      </div>
    </div>
  )
}
export default Sidebar