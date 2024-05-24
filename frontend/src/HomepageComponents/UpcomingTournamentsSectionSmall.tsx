'use client'

import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import EventThumbnail from "@/app/eyeofophidia/helperComponents/EventThumbnail"

function UpcomingTournamentsSectionSmall() {

  const [emblaRef, emblaApi] = useEmblaCarousel({startIndex: 1})

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)


  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='h-[65vw] min-[360px]:h-[256px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'wildride.jpg'} size={'big'}/>

      <div className='flex justify-between lg:w-[900px] lg:my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Upcoming Tournaments
        </div>
      </div>


      <div className="w-[90vw] min-[390px]:w-[360px]" ref={emblaRef}>

        <div className="flex gap-[32px]">

          {/* <div className="h-[50vw] basis-[90vw] min-[390px]:h-[202px] min-[390px]:basis-[360px] grow-0 shrink-0 ">
            <EventThumbnail size='smallSlide'/>
          </div>

          <div className="h-[50vw] basis-[90vw] min-[390px]:h-[202px] min-[390px]:basis-[360px] grow-0 shrink-0 ">
            <EventThumbnail size='smallSlide'/>
          </div>

          <div className="h-[50vw] basis-[90vw] min-[390px]:h-[202px] min-[390px]:basis-[360px] grow-0 shrink-0 ">
            <EventThumbnail size='smallSlide'/>
          </div> */}

        </div>

      </div>
      

      <div className="flex gap-[16px] items-center">
        <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
        {scrollSnaps.map((_, index) => (<div key={index}>
          <DotButton
            key={index}
            active={(selectedIndex === index)}
            onClick={() => onDotButtonClick(index)}
          />
        </div>))}
        <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
      </div>

      <a className='block text-[11px] text-blackunderline underline' href='eyeofophidia/tournaments'>
        View all upcoming Tournaments
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faChevronRight}/>
        <FontAwesomeIcon icon={faChevronRight}/>
      </a>

    </div>
  )
}
export default UpcomingTournamentsSectionSmall
