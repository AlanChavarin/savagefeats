'use client'

import SectionBackground from "@/components/swiperComponents/SectionBackground"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import DeckThumbnail from "@/app/eyeofophidia/helperComponents/DeckThumbnail"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../../components/swiperComponents/EmblaCarouselDotButton'
import YoutubeEmbedContainer from "../../components/swiperComponents/YoutubeEmbedContainer"
import { deckSchemaType } from "@/app/types/types"
import chunkArray from "../helpers/ChunkArray"
import Link from "next/link"

function WinningDecksSectionBig({decks, featuredDeck}: {decks: deckSchemaType[] | undefined, featuredDeck: deckSchemaType | undefined}) {

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
      <SectionBackground image="/ripples.jpg" imageBlur="/rippleBlur.jpg" size={'big'} idAddon="bigSectionId"/>

      <div className='flex justify-between w-[1000px] my-[32px]'>
        <Link href='eyeofophidia/decks' className=' text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow hover:text-custom-primary'>
          Winning Decklists
        </Link>
        <a className='hover:text-purple-400 text-[16px] text-white text-shadow underline flex flex-row items-center' href='eyeofophidia/decks'>
          View all winning deck lists
          &nbsp;&nbsp;
          <div>
            <FontAwesomeIcon icon={faChevronRight}/>
            <FontAwesomeIcon icon={faChevronRight}/>
          </div>
          
        </a>
      </div>

      <div className='flex flex-row gap-[48px] w-[1032px]'>
        <div className="flex flex-col gap-[32px] flex-1">

          { featuredDeck?.deckTech && 
            <iframe className='box-shadow h-[279px]' src={`https://www.youtube-nocookie.com/embed/${featuredDeck?.deckTech}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
          }

          {featuredDeck && <DeckThumbnail size='featuredSlide' deck={featuredDeck}/>}
        </div>
        
        <div className='w-[512px] h-full flex flex-col justify-between pr-[8px] overflow-hidden' ref={emblaRef}>
          <div className='flex gap-[32px]'>
            {decks && chunkArray(decks, 5).map((chunk, i) => (<>
              <div key={i + 'chunkWinningDecksSection'} className="flex flex-col gap-[32px] basis-[496px] grow-0 shrink-0">
                {chunk.map(deck => <DeckThumbnail size='normal' deck={deck} key={deck._id}/>)}
              </div>
            </>))}
          </div>

          <div className="flex gap-[16px] w-full items-center justify-center">
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
        
      </div>

      

    </div>
  )
}
export default WinningDecksSectionBig
