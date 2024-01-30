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
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center mt-[32px] mb-[96px]'>
      <SectionBackground image={'hvy.PNG'} top={0}/>
        
        <div className='text-[11px] min-[400px]:text-[16px] min-[540px]:my-[16px] text-white foulfiend text-shadow flex flex-row justify-between align-middle w-[85vw] max-w-[400px] '>
          <img src='savagelandsnewsprofile.jpg' className='w-[64px] h-[64px] min-[540px]:w-[96px] min-[540px]:h-[96px] rounded-full box-shadow translate-y-[-16px]'/>
          <div className='h-[8px] my-auto min-[540px]:mt-[24px]'>
            SavageLand's News
          </div>
        </div>

      

      <div className="w-[90vw] md:w-[564px] mb-[24px]" ref={emblaRef}>
        <div className="flex">

          <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            c
            <div className='h-[50%] w-[35%] absolute left-[0px]'></div>
            <div className='h-[50%] w-[35%] absolute right-[0px]'></div>
          </div>

          <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[50%] w-[35%] absolute left-[0px]'></div>
            <div className='h-[50%] w-[35%] absolute right-[0px]'></div>
          </div>

          <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[50%] w-[35%] absolute left-[0px]'></div>
            <div className='h-[50%] w-[35%] absolute right-[0px]'></div>
          </div>

          <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[50%] w-[35%] absolute left-[0px]'></div>
            <div className='h-[50%] w-[35%] absolute right-[0px]'></div>
          </div>

          <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
            <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/G_Pp41Enahw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[50%] w-[35%] absolute left-[0px]'></div>
            <div className='h-[50%] w-[35%] absolute right-[0px]'></div>
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
  )
}
export default ContentCreatorSectionSmall