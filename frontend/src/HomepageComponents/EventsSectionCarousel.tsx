'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import EventThumbnailSmallSlide from "@/app/eyeofophidia/helperComponents/eventThumbnail/EventThumbnailSmallSlide"
import { eventSchemaType } from "@/app/types/types"
import EventThumbnailFeaturedSlide from "@/app/eyeofophidia/helperComponents/eventThumbnail/EventThumbnailFeaturedSlide"
import chunkArray from "./helpers/ChunkArray"
import EventThumbnailSideSlide from "@/app/eyeofophidia/helperComponents/eventThumbnail/EventThumbnailSideSlide"

function EventsSectionCarousel({events, header, backgroundImage, backgroundImageBlur}: {events: eventSchemaType[] | undefined, header: string, backgroundImage: string, backgroundImageBlur?: string}) {

  const [emblaRef, emblaApi] = useEmblaCarousel({startIndex: 1})
  const [emblaRefBig, emblaApiBig] = useEmblaCarousel({startIndex: 1})

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const { selectedIndex: selectedIndexBig, scrollSnaps: scrollSnapsBig, onDotButtonClick: onDotButtonClickBig } = useDotButton(emblaApiBig)

  const prevOnClick = () => {
    emblaApi?.scrollPrev()
    emblaApiBig?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
    emblaApiBig?.scrollNext()
  }

  return (
    <div className='h-[65vw] min-[360px]:h-[256px] relative bg-red flex flex-col items-center py-[32px] gap-[24px] lg:mb-[256px]'>
      <SectionBackground image={backgroundImage} imageBlur={backgroundImageBlur} size={'big'}/>

      <div className='flex justify-between lg:w-[900px] lg:my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          {header}
        </div>
        <a className='hover:text-purple-400 hidden text-[16px] lg:block text-white text-shadow underline' href='eyeofophidia/events?query=true'>
          View all Events
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faChevronRight}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </a>
      </div>

      <div className="w-[90vw] min-[390px]:w-[360px] lg:hidden" ref={emblaRef}>
        <div className="flex gap-[32px]">
            { events && events.slice(0, 5).map(event => <>
                <div key={event._id} className="block lg:hidden h-[50vw] basis-[90vw] min-[390px]:h-[202px] min-[390px]:basis-[360px] grow-0 shrink-0 ">
                  <EventThumbnailSmallSlide event={event} key={event._id}/>
                </div>
            </>)}            
        </div>
      </div>

      <div className="hidden lg:block w-[430px]" ref={emblaRefBig}>
        <div className="flex gap-[32px]">
            {events && <>
              <div className="hidden lg:block h-[430px] basis-[430px] grow-0 shrink-0" >
                <EventThumbnailFeaturedSlide event={events[0]}/>
              </div>

              {chunkArray(events.slice(1), 2).map((chunk, i) => 
                <div key={i + 'chunkArr'} className='hidden lg:flex flex-col h-[430px] basis-[340px] grow-0 shrink-0 gap-[48px] justify-start'>
                  {chunk.map(event => <EventThumbnailSideSlide key={event._id} event={event}/>) }
                </div>
            )}</>}       
        </div>
      </div>
      
      <div className="flex gap-[16px] items-center">
        <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>

            <div className="flex gap-[16px] lg:hidden">
              {scrollSnaps.map((_, index) => (<div key={index + 'small'}>
                <DotButton
                  key={index + 'small'}
                  active={(selectedIndex === index)}
                  onClick={() => onDotButtonClick(index)}
                />
              </div>))}
            </div>

            <div className="hidden lg:flex gap-[16px]">
              {scrollSnapsBig.map((_, index) => (<div key={index + 'big'}>
                <DotButton
                  key={index + 'big'}
                  active={(selectedIndexBig === index)}
                  onClick={() => onDotButtonClickBig(index)}
                />
              </div>))}
            </div>
        

        <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
      </div>

      <a className='hover:text-purple-400 lg:hidden block text-[11px] text-blackunderline underline' href='eyeofophidia/events?query=true'>
        View all upcoming Tournaments
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faChevronRight}/>
      </a>

    </div>
  )
}
export default EventsSectionCarousel
