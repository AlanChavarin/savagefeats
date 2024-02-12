'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '@/components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { ReactNode } from "react"

//{children}: {children: ReactNode}

function StreamServiceSection({images, backgroundImage, children, imageSize} : {images: string[], backgroundImage: string, children: ReactNode, imageSize: ('normal' | 'square')}) {

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
    <div className='w-full h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center py-[32px] md:py-[96px] gap-[16px] md:gap-[64px]'>
      <SectionBackground image={backgroundImage} size={'veryBig'}/>

      {children}

      <div>

        {imageSize === 'normal' && 
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
        }

        {imageSize === 'square' && 
          <div ref={emblaRef} className='w-[266px]'>
            <div className="flex gap-[32px] md:gap-[64px]">
              {images.map(image => 
                <div className='w-full items-center justify-center relative grow-0 shrink-0 flex flex-col gap-[8px]'>
                  <Image width={266} height={266} src={`/servicePagePics/${image}`} alt='BH Orlando' className='box-shadow'/>
                  <p className='text-[13px] md:text-[19px] text-gray-700'>Battle Hardened Orlando</p>
                </div>
              )}
            </div>
          </div>
        }
        

        <div className="flex gap-[16px] items-center justify-center py-[16px]">
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
  )
}
export default StreamServiceSection

//471