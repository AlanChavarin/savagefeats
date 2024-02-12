'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '@/components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import GetInTouchButton from "./GetInTouchButton"


function CastingServicesSection({images, backgroundImage} : {images: string[], backgroundImage: string}) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 1
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='w-full h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center py-[96px] gap-[64px]'>
      <SectionBackground image={backgroundImage} size={'veryBig'}/>

      <div className='flex flex-row gap-[16px] md:gap-[32px] items-center w-[90vw] md:w-[800px] '>

        <div className='flex flex-col gap-[8px]'>
          <div className='text-[23px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center md:self-start'>
            Casting Services
          </div>
          <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
            We work with the most talented and knowledgeable casters to bring the best quality commentary to your event’s livestream. 
          </div>
        </div>

        <div className='hidden md:block'>
          <GetInTouchButton />
        </div>
        

      </div>

      

      <div ref={emblaRef} className='w-[90vw] sm:w-[471px]'>
        <div className="flex gap-[64px]">

          {images.map(image => 
            <div className='w-full items-center justify-center relative grow-0 shrink-0 flex flex-col gap-[8px]'>
              <Image width={471} height={266} src={`/servicePagePics/${image}`} alt='BH Orlando' className='box-shadow'/>
              <p className='text-[13px] md:text-[19px] text-gray-700'>Battle Hardened Orlando</p>
            </div>
          )}

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
export default CastingServicesSection