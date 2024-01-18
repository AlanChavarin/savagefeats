'use client'
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrophy, faList, faEye } from "@fortawesome/free-solid-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"

export default function Home() {

  return (
    <main className="flex-1">
      <div className='w-full h-[1000px] bg-fill py-[128px] flex flex-col items-center gap-[96px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('/mulch.jpg')`, backgroundPosition: 'center -192px'}}>
        <div className='flex flex-col gap-[32px] items-center'>
          <Image src={'/SVGWHITE.png'} alt='savage feats logo' width={512} height={128}/>
          <h1 className="text-white text-[27px] text-balance w-[512px] text-center leading-[48px]" style={{fontFamily: 'foulfiend'}}>
            THE TOURNAMENT HUB FOR <span className='text-custom-tertiary'>FLESH</span> AND <span className='text-custom-tertiary'>BLOOD</span>
          </h1>
        </div>
        <div className="flex items-start justify-between text-white w-[1200px]">
          <div className='flex flex-col items-center w-[256px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faTrophy} className='h-[64px] m-[16px]'/>
            <div className='text-[33px] font-bold'>Tournament Info</div>
            <div className='text-[16px] text-center drop-shadow-xl' >Browse our <span className='font-bold'>comprehensive database</span> of past and future <span className='font-bold'>tournaments</span>. Easiest way to get information about <span className='font-bold'>upcoming tournaments</span>.</div>
          </div>
          <div className='flex flex-col items-center w-[256px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faList} className='h-[64px] m-[16px]'/>
            <div className='text-[33px] font-bold'>Decklists</div>
            <div className='text-[16px] text-center drop-shadow-xl' >Easily access the top winning <span className='font-bold'>deck lists</span> from recent tournaments</div>
          </div>
          <div className='flex flex-col items-center w-[256px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faEye} className='h-[64px] m-[16px]'/>
            <div className='text-[33px] font-bold'>Matches</div>
            <div className='text-[16px] text-center drop-shadow-xl' >Search for all streamed <span className='font-bold'>Flesh and Blood feature matches</span> from across different official and community run events.</div>
          </div>
          <div className='flex flex-col items-center w-[256px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faYoutube} className='h-[64px] m-[16px]'/>
            <div className='text-[33px] font-bold'>Content</div>
            <div className='text-[16px] text-center drop-shadow-xl'>From deck techs, player interviews, to upcoming livestreams, get a curated list of the latest in <span className='font-bold'>Flesh and Blood content</span>.</div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </main>
  )
}
