'use client'

import SectionBackground from "@/components/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

function UpcomingTournamentsSection() {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='h-[65vw] md:h-[312px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'wildride.jpg'} top={-80}/>

      <div className='flex justify-between lg:w-[900px] lg:my-[32px]'>
        <div className='text-[11px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Upcoming Tournaments
        </div>
        <a className='hidden text-[16px] lg:block text-white text-shadow underline' href='eyeofophidia/tournaments'>
          View all upcoming Tournaments
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faChevronRight}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </a>
      </div>

      {/* <div className="w-[80vw] md:w-[564px]" ref={emblaRef}>
        <div className="grid grid-flow-col grid-auto-rows-80">

          <div className="h-[64px] w-[64px] bg-red-100">hello world</div>
          <div className="h-[64px] w-[64px] bg-red-100">hello world</div>

        </div>
      </div> */}

      <div className="w-[80px]" ref={emblaRef}>
        <div className="flex">

          <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">
            <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>
            <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>
          </div>
          <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>
          <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>
          <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>
          <div className="h-[64px] w-[64px] bg-red-100 basis-[64px] grow-0 shrink-0 mx-[16px]">hello world</div>

        </div>
      </div>

      <div className="flex gap-[16px] border-2 items-center">
        <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
        {scrollSnaps.map((_, index) => (<>
          <DotButton
            key={index}
            active={(selectedIndex === index)}
            onClick={() => onDotButtonClick(index)}
          />
        </>))}
        <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
      </div>

      <a className='block text-[11px] lg:hidden text-blackunderline underline' href='eyeofophidia/tournaments'>
        View all upcoming Tournaments
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faChevronRight}/>
        <FontAwesomeIcon icon={faChevronRight}/>
      </a>

    </div>
  )
}
export default UpcomingTournamentsSection