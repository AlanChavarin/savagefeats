'use client'

import SectionBackground from "@/HomepageComponents/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import DeckThumbnail from "@/eyeofophidiaComponents/DeckThumbnail"

function WinningDecksSectionSmall() {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)


  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='h-[80vw] min-[360px]:h-[320px] relative bg-red flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'ripples.jpg'} top={-80}/>

      <div className='flex justify-between lg:w-[900px] lg:my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Winning Decklists
        </div>
      </div>


      <div className="w-[90vw] min-[390px]:w-[360px]" ref={emblaRef}>
        <div className="flex gap-[32px]">

          <div className="basis-[90vw] min-[390px]:basis-[360px] grow-0 shrink-0 flex flex-col gap-[16px]">
            <iframe className='w-full box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <DeckThumbnail size='smallSlide' />
          </div>

          <div className="basis-[90vw] min-[390px]:basis-[360px] grow-0 shrink-0 flex flex-col gap-[16px]">
            <DeckThumbnail size='smallSlide' />
            <DeckThumbnail size='smallSlide' />
            <DeckThumbnail size='smallSlide' />
          </div>

          <div className="basis-[90vw] min-[390px]:basis-[360px] grow-0 shrink-0 flex flex-col gap-[16px]">
            <DeckThumbnail size='smallSlide' />
            <DeckThumbnail size='smallSlide' />
            <DeckThumbnail size='smallSlide' />
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

      <a className='block text-[11px] text-black underline' href='eyeofophidia/tournaments'>
        View all winning deck lists
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faChevronRight}/>
        <FontAwesomeIcon icon={faChevronRight}/>
      </a>

    </div>
  )
}
export default WinningDecksSectionSmall
