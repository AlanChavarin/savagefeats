'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import YoutubeEmbedContainer from "../components/swiperComponents/YoutubeEmbedContainer"
import { ReactNode } from "react"

function YoutubeVideoCarousel({youtubeIDs, backgroundImage, children} : {youtubeIDs: string[], backgroundImage: string, children: ReactNode}) {

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
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center py-[32px] gap-[24px] w-full'>
      <SectionBackground image={backgroundImage} size={'small'}/>

      {/* <div className='text-[11px] md:text-[16px] lg:text-[19px] lg:my-[32px] xl:text-[27px] text-white foulfiend text-shadow'>
        The Latest in Flesh and Blood
      </div> */}

      {children}

      <div className="w-[90vw] md:w-[564px]" ref={emblaRef}>
        <div className="flex">

          {youtubeIDs.map(id => <>
            <div key={id} className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
              <YoutubeEmbedContainer>
                <iframe className='h-[50vw] w-[85vw] md:w-[500px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
              </YoutubeEmbedContainer>
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
export default YoutubeVideoCarousel