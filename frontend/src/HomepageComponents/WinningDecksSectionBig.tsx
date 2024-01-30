'use client'

import SectionBackground from "@/HomepageComponents/swiperComponents/SectionBackground"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import DeckThumbnail from "@/eyeofophidiaComponents/DeckThumbnail"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './swiperComponents/EmblaCarouselDotButton'

function WinningDecksSectionBig() {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)


  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='h-[512px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'ripples.jpg'} top={-80}/>

      <div className='flex justify-between w-[1000px] my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Winning Decklists
        </div>
        <a className='text-[16px] text-white text-shadow underline' href='eyeofophidia/tournaments'>
          View all winning deck lists
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faChevronRight}/>
          <FontAwesomeIcon icon={faChevronRight}/>
        </a>
      </div>

      <div className='flex flex-row gap-[48px] w-[1032px]'>
        <div className="flex flex-col gap-[32px] flex-1">
          <iframe className='box-shadow h-[279px]' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>

          <DeckThumbnail size='featuredSlide'/>
        </div>
        
        <div className='w-[512px] h-full flex flex-col justify-between pr-[8px] overflow-hidden' ref={emblaRef}>
          <div className='flex gap-[32px]'>
            <div className="flex flex-col gap-[32px] basis-[496px] grow-0 shrink-0">
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
            </div>

            <div className="flex flex-col gap-[32px] basis-[496px] grow-0 shrink-0">
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
            </div>

            <div className="flex flex-col gap-[32px] basis-[496px] grow-0 shrink-0">
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
              <DeckThumbnail size='normal' />
            </div>
          </div>

          <div className="flex gap-[16px] w-full items-center justify-center">
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
export default WinningDecksSectionBig
