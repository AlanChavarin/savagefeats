'use client'

import SectionBackground from "@/swiperComponents/SectionBackground"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import DeckThumbnail from "@/eyeofophidiaComponents/DeckThumbnail"

function WinningDecksSectionBig() {

  return (
    <div className='h-[512px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'ripples.jpg'} top={-80}/>

      <div className='flex justify-between w-[900px] my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Winning Decklists
        </div>
        <a className='text-[16px] text-white text-shadow underline' href='eyeofophidia/tournaments'>
          View all winning deck lists
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faChevronRight}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </a>
      </div>

      <div className='flex flex-row gap-[32px] w-[1024px]'>
        <div className="flex flex-col gap-[32px] flex-1">
          <iframe className='box-shadow h-[279px]' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>

          <DeckThumbnail size='featuredSlide'/>
        </div>

        <div className="flex flex-col gap-[32px] flex-1">
          <DeckThumbnail size='normal' />
          <DeckThumbnail size='normal' />
          <DeckThumbnail size='normal' />
          <DeckThumbnail size='normal' />
          <DeckThumbnail size='normal' />
        </div>
      </div>

      

    </div>
  )
}
export default WinningDecksSectionBig
