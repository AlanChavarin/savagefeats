'use client'
import YoutubeEmbedContainer from "@/components/swiperComponents/YoutubeEmbedContainer"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from "@/components/swiperComponents/EmblaCarouselDotButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { splitIntoGroupsOfFour } from "./splitIntoGroupsOfFour"
import { contentSchemaType } from "@/app/types/types"

function ContentCreatorSectionCarousel({contents, channelName, size}: {contents: contentSchemaType[], channelName: string, size: ('big' | 'small')}) {

    const [contentFours, setContentFours] = useState<contentSchemaType[][]>([])

    useEffect(() => {
      setContentFours(splitIntoGroupsOfFour(contents))
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

  return (<>

        {size==='small' && <>
          <div className="w-[90vw] min-[500px]:w-[500px] min-[500px]:h-[253px] mb-[24px]" ref={emblaRef}>
            <div className="flex">
              {contents.slice(0, 4).map(content => 
                <div key={content._id} className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
                  <div className="h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px]">
                    <YoutubeEmbedContainer content={content} />
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
        </>}
    
        

        {size==="big" && 
        
        <div className='flex flex-col items-center justify-center gap-[32px] translate-y-[32px]'>

            <div className='foulfiend text-white text-[19px] text-shadow my-[16px]'>{channelName} latest content</div>

            <div className="w-[680px] overflow-hidden" ref={emblaRef}>
              <div className="flex gap-[32px] mb-[8px]">

                {contentFours && contentFours.map(contentArray =>
                
                  <div key={contentArray[0]._id} className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0 pr-[8px]'>
                    {contentArray.map(content => 
                      <div key={content._id} className="w-[320px] h-[180px]">
                        <YoutubeEmbedContainer content={content} />
                      </div>
                    )}
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
        </div>}
  </>)}


export default ContentCreatorSectionCarousel