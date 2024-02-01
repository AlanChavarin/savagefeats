'use client'

import SectionBackground from "@/HomepageComponents/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import YoutubeEmbedContainer from "./swiperComponents/YoutubeEmbedContainer"
import Image from "next/image"

function ContentCreatorSectionSmall() {

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
    <div className='h-[320px] relative bg-red flex flex-col items-center mt-[32px]'>
      <SectionBackground image='alpharampage.PNG' size='medium'/>
    
      <div className='flex flex-row gap-[32px]'>
        <div className='text-[16px] lg:text-[23px] mb-[32px] text-white foulfiend text-shadow flex flex-col justify-top items-center gap-[32px] translate-y-[-32px]'>
          <div className='rounded-full box-shadow cursor-pointer w-[180px] h-[180px] lg:w-[256px] lg:h-[256px] relative'>
            <Image src='/savagelandsnewsprofile.jpg' alt='Savage Lands News Icon' layout='fill' className='rounded-full'/>
          </div>
          
          <div className='text-center lg:text-left'>SavageLand&apos;s News</div>
        </div>

        <div className='flex flex-col items-center justify-center gap-[32px] translate-y-[32px]'>
          <div className='foulfiend text-white text-[19px] text-shadow'>Savage Lands News&apos; latest content</div>
          <div className="w-[673px] overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[32px] mr-[8px] mb-[8px]">

              <div className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0'>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
              </div>

              <div className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0'>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
                <YoutubeEmbedContainer>
                  <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </YoutubeEmbedContainer>
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
      </div>
    </div>
  )
}
export default ContentCreatorSectionSmall