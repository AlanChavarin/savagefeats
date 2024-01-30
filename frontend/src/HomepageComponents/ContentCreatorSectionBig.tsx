'use client'

import SectionBackground from "@/HomepageComponents/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

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
      <SectionBackground image={'hvy.PNG'} top={0}/>
    

      <div className='flex flex-row gap-[32px]'>
        <div className='text-[23px] mb-[32px] text-white foulfiend text-shadow flex flex-col justify-top items-center gap-[32px] translate-y-[-32px]'>
          <img src='savagelandsnewsprofile.jpg' className='w-[256px] h-[256px] rounded-full box-shadow'/>
          <div className=''>SavageLand's News</div>
        </div>

        <div className='flex flex-col items-center justify-center gap-[32px] translate-y-[32px]'>
          <div className='foulfiend text-white text-[19px] text-shadow'>Savage Lands News' latest content</div>
          <div className="w-[673px] overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[32px] mr-[8px] mb-[8px]">

              <div className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0'>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
              </div>

              <div className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0'>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                <iframe className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
              </div>

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

        </div>
      </div>
    </div>
  )
}
export default ContentCreatorSectionSmall