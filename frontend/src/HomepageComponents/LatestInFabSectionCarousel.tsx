'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import YoutubeEmbedContainer from "../components/swiperComponents/YoutubeEmbedContainer"
import { contentSchemaType, eventSchemaType } from "@/app/types/types"
import EventThumbnailFeaturedSlide from "@/app/eyeofophidia/helperComponents/eventThumbnail/EventThumbnailFeaturedSlide"
import EventThumbnailSmallSlide from "@/app/eyeofophidia/helperComponents/eventThumbnail/EventThumbnailSmallSlide"

function LatestInFABSectionCarousel({backgroundImage, contents, events} : { backgroundImage: string, contents: contentSchemaType[], events?: eventSchemaType[]}) {


    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: 0
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const prevOnClick = () => {
        emblaApi?.scrollPrev()
    }

    const nextOnClick = () => {
        emblaApi?.scrollNext()
    }



  return (
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative flex flex-col items-center pt-[32px] gap-[24px] w-full'>
      <SectionBackground image={backgroundImage} size={'small'}/>

      <div className='text-[11px] md:text-[16px] lg:text-[19px] lg:my-[32px] xl:text-[27px] text-white foulfiend text-shadow'>
        The Latest in Flesh and Blood
      </div>

      <div className="w-[90vw] md:w-[564px]" ref={emblaRef}>
        <div className="flex">

            {contents && contents.map(content =>
              <div key={content.videoid} className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
                <div className="h-[50vw] w-[85vw] md:w-[500px] md:h-[282px]">
                  <YoutubeEmbedContainer content={content} />
                </div>
                
              </div>
              )}

            
            {events && events.length > 0 && events.map(event =>
              <div key={event._id} className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
                <div className="h-[50vw] w-[85vw] md:w-[500px] md:h-[282px]">
                  <div className="hidden md:block w-[100%] h-[100%]">
                    <EventThumbnailFeaturedSlide event={event} />
                  </div>
                  <div className="block md:hidden w-[100%] h-[100%]">
                    <EventThumbnailSmallSlide event={event} />
                  </div>
                </div>
              </div>
            )}

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

    </div>
  )
}
export default LatestInFABSectionCarousel