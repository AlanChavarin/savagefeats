'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import YoutubeEmbedContainer from "../components/swiperComponents/YoutubeEmbedContainer"
import { ReactNode } from "react"
import { eventSchemaType } from "@/app/types/types"
import EventThumbnail from "@/app/eyeofophidia/helperComponents/EventThumbnail"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import { eventSchema } from "@/app/schemas/schemas"


const responseLatestInFABSchema = z.object({
    videoIds: z.array(z.string()),
    events: z.array(eventSchema),
  })

function LatestInFABSection({backgroundImage} : { backgroundImage: string}) {

    const [youtubeIDs, setYoutubeIds] = useState<string[] | undefined>(undefined)
    const [events, setEvents] = useState<eventSchemaType[] | undefined>(undefined)

    useEffect(() => {
        //grab latest in fab data
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/latestinfleshandblood`)
        .then(r => r.json())
        .then(data => {
        const validatedData = responseLatestInFABSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            setYoutubeIds(validatedData.data.videoIds)
            setEvents(validatedData.data.events)
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
        }).catch(err => {
            toast(err.message)
        })
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
        startIndex: 2
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const prevOnClick = () => {
        emblaApi?.scrollPrev()
    }

    const nextOnClick = () => {
        emblaApi?.scrollNext()
    }



  return (
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center py-[32px] gap-[24px] w-full'>
      <SectionBackground image={backgroundImage} size={'small'}/>

      <div className='text-[11px] md:text-[16px] lg:text-[19px] lg:my-[32px] xl:text-[27px] text-white foulfiend text-shadow'>
        The Latest in Flesh and Blood
      </div>

      <div className="w-[90vw] md:w-[564px]" ref={emblaRef}>
        <div className="flex">

            {youtubeIDs && youtubeIDs.map(id =>
              <div key={id} className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
              <YoutubeEmbedContainer>
                  <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
              </YoutubeEmbedContainer>
            </div>)}

            
            {events && events.map(event =>
              <div key={event._id} className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
                <div className="h-[50vw] w-[85vw] md:w-[500px] md:h-[282px]">
                  <div className="hidden md:block w-[100%] h-[100%]">
                    <EventThumbnail size='featuredSlide' event={event}/>
                  </div>

                  <div className="block md:hidden w-[100%] h-[100%]">
                    <EventThumbnail size='sideSlide' event={event}/>
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
export default LatestInFABSection