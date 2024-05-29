'use client'

//nextjs
import Link from "next/link"
import Image from "next/image"


//font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

function Sidebar({buttonClickEvent} : {buttonClickEvent: () => void}) {
  return (
    <div className="h-full bg-black w-[256px] md:w-[256px] absolute top-0 right-0 text-white z-[10]">
      <div className="text-[27px] flex flex-col text-white m-[16px] gap-[16px] *:font-bold *:cursor-pointer *:flex *:place-items-center">
        <Link href="/" className="cursor-pointer hover:bg-color">
          <Image src={'/SVGWHITE.png'} width={96} height={32} alt='savage feats'/>
        </Link>
        <Link href="/eyeofophidia/matches" className="hover:text-custom-primary">
          Matches
        </Link>
        <Link href="/eyeofophidia/events" className="hover:text-custom-primary">
          Events
        </Link>
        <Link href="/eyeofophidia/decklists" className="hover:text-custom-primary">
          Decklists
        </Link>
        <Link href="/content" className="hover:text-custom-primary">
          Content
        </Link>
        
        <Link href="/services" className="hover:text-custom-primary">
          Production <br/> Services
        </Link>
        <Link href="/portfolio" className="hover:text-custom-primary">
          Portfolio
        </Link>
        <Link href="/shop" className="hover:text-custom-primary">
          Shop
        </Link>
        <button onClick={() => buttonClickEvent()}>
          <FontAwesomeIcon icon={faX} className="absolute right-[24px] top-[24px] text-[33px]"/>
        </button>
        
      </div>
    </div>
  )
}
export default Sidebar