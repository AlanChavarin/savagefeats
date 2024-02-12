'use client'

import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import YoutubeEmbedContainer from "../components/swiperComponents/YoutubeEmbedContainer"
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
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center mt-[32px] mb-[96px] gap-[16px]'>
      <SectionBackground image={'alpharampage.PNG'} size={'big'}/>
        
      <div className=' min-[540px]:my-[16px] text-white foulfiend text-shadow flex flex-row justify-between align-middle w-[85vw]'>
        {/* <img src='savagelandsnewsprofile.jpg' className='w-[64px] h-[64px] min-[540px]:w-[96px] min-[540px]:h-[96px] rounded-full box-shadow translate-y-[-16px]'/> */}

        <div className='rounded-full box-shadow cursor-pointer w-[64px] h-[64px] min-[350px]:w-[96px] min-[350px]:h-[96px] min-[600px]:w-[180px] min-[600px]:h-[180px] lg:w-[256px] lg:h-[256px] relative'>
          <Image src='/savagelandsnewsprofile.jpg' alt='Savage Lands News Icon' layout='fill' className='rounded-full'/>
        </div>

        <div className='h-[8px] self-center flex-1 text-center text-[11px] min-[400px]:text-[19px]'>
          SavageLand&apos;s News
        </div>
      </div>

      

      <div className="w-[90vw] min-[500px]:w-[500px] min-[500px]:h-[253px] mb-[24px]" ref={emblaRef}>
        <div className="flex">
          <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
            <YoutubeEmbedContainer>
              <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            </YoutubeEmbedContainer>
          </div>

          <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
            <YoutubeEmbedContainer>
              <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            </YoutubeEmbedContainer>
          </div>

          <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
            <YoutubeEmbedContainer>
              <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            </YoutubeEmbedContainer>
          </div>

          <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            <YoutubeEmbedContainer>
              <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/G_Pp41Enahw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
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
  )
}
export default ContentCreatorSectionSmall