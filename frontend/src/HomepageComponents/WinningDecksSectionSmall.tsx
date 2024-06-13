'use client'

import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import DeckThumbnail from "@/app/eyeofophidia/helperComponents/DeckThumbnail"
import YoutubeEmbedContainer from "../components/swiperComponents/YoutubeEmbedContainer"
import { deckSchemaType } from "@/app/types/types"
import chunkArray from "./helpers/ChunkArray"

function WinningDecksSectionSmall({decks, featuredDeck}: {decks: deckSchemaType[] | undefined, featuredDeck: deckSchemaType | undefined}) {

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
      <SectionBackground image={'ripples.jpg'} size={'big'}/>
      <div className='flex justify-between lg:w-[900px] lg:my-[32px]'>
        <div className='text-[13px] md:text-[16px] lg:text-[19px] xl:text-[23px] text-white foulfiend text-shadow'>
          Winning Decklists
        </div>
      </div>

      <div className="w-[90vw] min-[390px]:w-[360px]" ref={emblaRef}>
        <div className="flex gap-[32px]">

          <div className="basis-[90vw] min-[390px]:basis-[360px] grow-0 shrink-0 flex flex-col gap-[16px]">
            <YoutubeEmbedContainer>
              <iframe className='w-full box-shadow' src={`https://www.youtube-nocookie.com/embed/ZKxA3LAZybw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            </YoutubeEmbedContainer>
            {featuredDeck && <DeckThumbnail size='smallSlide' deck={featuredDeck}/>}
          </div>

          {decks && chunkArray(decks, 3).map((chunk, i) => (<>
            {chunk.length === 3 && <div key={i + 'chunkWinningDeckSectionSmall'} className="basis-[90vw] min-[390px]:basis-[360px] grow-0 shrink-0 flex flex-col justify-between">
              {chunk.map(deck => <DeckThumbnail size='smallSlide' deck={deck} key={deck._id}/>)}
            </div>}
          </>))}

        </div>
      </div>
      

      <div className="flex gap-[16px] items-center">
        <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
        {scrollSnaps.map((_, index) => (<div key={index + 'dotbutton'}>
          <DotButton
            key={index + 'dotbutton2'}
            active={(selectedIndex === index)}
            onClick={() => onDotButtonClick(index)}
          />
        </div>))}
        <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
      </div>

      <a className='block text-[11px] text-black underline hover:text-purple-400' href='eyeofophidia/decks'>
        View all winning deck lists
        &nbsp;&nbsp;
        <FontAwesomeIcon icon={faChevronRight}/>
        <FontAwesomeIcon icon={faChevronRight}/>
      </a>

    </div>
  )
}
export default WinningDecksSectionSmall
