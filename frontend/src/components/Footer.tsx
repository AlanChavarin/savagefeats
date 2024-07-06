'use client'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { useContext } from "react"
import UserContext from "@/context/UserContext"
import { faFlag } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

function Footer() {
  const {user} = useContext(UserContext)
  return (
    <div className="bg-black text-white flex flex-col items-center">

      <div className="m-auto flex flex-col place-items-center justify-center text-[11px] w-full py-[32px] gap-[32px] md:gap-[0px] lg:gap-[64px] *:w-[256px]
        md:flex-row md:text-[13px] ">

        <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
          <FontAwesomeIcon icon={faFlag} className="text-[48px]"/>
          <div>
              <p>Error in our database?</p>
              <br />
              <p>Please submit a <b>report</b> with us <Link href='/reports' className="font-bold underline hover:text-purple-500">here.</Link> </p>
          </div>
        </div>
        <div className="text-center flex flex-col gap-[16px] justify-center align-middle md:order-2">
          <Image src={'/SVGWHITE.png'} width={144} height={32} alt='savage feats' className="m-auto"/>
          <div className="flex gap-[32px] justify-center align-middle">
            <a target="_blank" href="https://twitter.com/SavageFeats" className="flex align-middle text-[32px]"><FontAwesomeIcon icon={faTwitter}/></a>
            <a target="_blank" href="https://youtube.com/@SavageFeats/featured" className="flex align-middle text-[32px]"><FontAwesomeIcon icon={faYoutube}/></a>
            {user && <div>Logged in as <span className="font-bold">{user.name}</span>, permissions: <span className="font-bold">{user.privilege}</span></div>}
          </div>
        </div>

        <div className="text-center md:order-1">
          <span className="text-custom-primary">Savage Feats</span> is both the central hub for all things competitive Flesh and Blood and the premier production company for Flesh and Blood Tournaments. Created by fans, for fans. 
        </div>

        <div className="text-center md:order-3">
          <span className="text-custom-primary">Savage Feats</span> is in no way affiliated with <a target="_blank" href="https://www.fabtcg.com"><span className="underline">Legend Story Studios®</span>. <span className="underline">Flesh and Blood™</span></a> is a registered trademark of Legend Story Studios. Flesh and Blood™ and all associated images are copyright © Legend Story Studios. All rights reserved.
        </div>

        
      </div>

    </div>
  )
}
export default Footer