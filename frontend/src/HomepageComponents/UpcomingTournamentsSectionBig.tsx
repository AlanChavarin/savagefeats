'use client'

import SectionBackground from "@/HomepageComponents/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import EventThumbnail from "@/eyeofophidiaComponents/EventThumbnail"


function UpcomingTournamentsSectionBig() {

  const [emblaRef, emblaApi] = useEmblaCarousel({startIndex: 1})

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)


  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='h-[360px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'wildride.jpg'} size={'big'}/>

      <div className='flex justify-between lg:w-[1000px] lg:my-[32px]'>
        <div className='text-[23px]  text-white foulfiend text-shadow'>
          Upcoming Tournaments
        </div>
        <a className='hidden text-[16px] lg:block text-white text-shadow underline' href='eyeofophidia/tournaments'>
          View all upcoming Tournaments
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faChevronRight}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </a>
      </div>


      <div className="w-[430px]" ref={emblaRef}>

        <div className="flex gap-[48px]">

          <div className="h-[430px] basis-[430px] grow-0 shrink-0">
            <EventThumbnail size='featuredSlide'/>
          </div>

          <div className='flex flex-col h-[430px] basis-[340px] grow-0 shrink-0 gap-[48px]'>
            <EventThumbnail size='sideSlide'/>
            <EventThumbnail size='sideSlide'/>
          </div>

          <div className='flex flex-col h-[430px] basis-[340px] grow-0 shrink-0 gap-[48px]'>
            <EventThumbnail size='sideSlide'/>
            <EventThumbnail size='sideSlide'/>
          </div>

          <div className='flex flex-col h-[430px] basis-[340px] grow-0 shrink-0 gap-[48px]'>
            <EventThumbnail size='sideSlide'/>
            <EventThumbnail size='sideSlide'/>
          </div>

        </div>

      </div>
      

      <div className="flex gap-[16px] items-center">
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

    </div>
  )
}
export default UpcomingTournamentsSectionBig



{/* <div className='hidden gap-[16px] lg:flex'>

<div className="h-[256px] basis-[256px] grow-0 shrink-0">
  <EventThumbnail />
</div>

<div className="h-[256px] basis-[256px] grow-0 shrink-0 flex flex-col gap-[16px]">
  <EventThumbnail />
  <EventThumbnail />
</div>

<div className="h-[256px] basis-[256px] grow-0 shrink-0 flex flex-col gap-[16px]">
  <EventThumbnail />
  <EventThumbnail />
</div>

<div className="h-[256px] basis-[256px] grow-0 shrink-0 flex flex-col gap-[16px]">
  <EventThumbnail />
  <EventThumbnail />
</div>

</div> */}