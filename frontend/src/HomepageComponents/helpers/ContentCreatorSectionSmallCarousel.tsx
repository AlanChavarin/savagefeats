'use client'
import YoutubeEmbedContainer from "@/components/swiperComponents/YoutubeEmbedContainer"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from "@/components/swiperComponents/EmblaCarouselDotButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { splitIntoGroupsOfFour } from "./splitIntoGroupsOfFour"
import { ChannelData } from "./getChannelData"

function ContentCreatorSectionSmallCarousel({youtubeIds, channelData}: {youtubeIds: string[], channelData: ChannelData}) {

    const [youtubeIdsFours, setYoutubeIdsFours] = useState<string[][]>([])

    useEffect(() => {
      setYoutubeIdsFours(splitIntoGroupsOfFour(youtubeIds))
    }, [])

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
    <div className='flex flex-col items-center justify-center gap-[32px] translate-y-[32px]'>
          <div className='foulfiend text-white text-[19px] text-shadow my-[16px]'>{channelData.name} latest content</div>
          <div className="w-[681px] overflow-hidden pr-[8px]" ref={emblaRef}>
            <div className="flex gap-[32px] mr-[8px] mb-[8px]">

              {youtubeIdsFours && youtubeIdsFours.map(idArray => <>
              
                <div className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0 pr-[8px]'>
                  {idArray.map(id => <>
                  
                    <YoutubeEmbedContainer>
                      <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                    </YoutubeEmbedContainer>

                  </>)}
                </div>

              </>)}
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
export default ContentCreatorSectionSmallCarousel