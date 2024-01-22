'use client'

import SectionBackground from "@/components/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '../components/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

function TheLatestInFABSection() {

  const [emblaRef, emblaApi] = useEmblaCarousel()

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const prevOnClick = () => {
    emblaApi?.scrollPrev()
    console.log(selectedIndex)
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
    console.log(selectedIndex)
  }

  

  return (
    <div className='relative bg-red h-[192px] flex flex-col items-center py-[32px] gap-[24px]'>
      <SectionBackground image={'hvy.PNG'}/>

      <div className='text-[11px] text-white foulfiend text-shadow'>
        The Latest in Flesh and Blood
      </div>

      <div className="w-[272px]" ref={emblaRef}>

        <div className="flex">
          <div className="h-[146px] flex items-center justify-center relative" style={{flex: '0 0 272px'}}>
            <iframe className='w-[256px] h-[144px]' src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[16px] w-[256px] absolute bottom-[40px]'></div>
            <div className='h-[24px] w-[256px] absolute top-[32px]'></div>
            <div className='h-[36px] w-[100px] absolute left-[8px]'></div>
            <div className='h-[36px] w-[100px] absolute right-[8px]'></div>
          </div>
          <div className="h-[146px] flex items-center justify-center relative" style={{flex: '0 0 272px'}}>
            <iframe className='w-[256px] h-[144px]' src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[16px] w-[256px] absolute bottom-[40px]'></div>
            <div className='h-[24px] w-[256px] absolute top-[32px]'></div>
            <div className='h-[36px] w-[100px] absolute left-[8px]'></div>
            <div className='h-[36px] w-[100px] absolute right-[8px]'></div>
          </div>
          <div className="h-[146px] flex items-center justify-center relative" style={{flex: '0 0 272px'}}>
            <iframe onClick={() => console.log('onclicked!!')} className='w-[256px] h-[144px]' src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='h-[16px] w-[256px] absolute bottom-[40px]'></div>
            <div className='h-[24px] w-[256px] absolute top-[32px]'></div>
            <div className='h-[36px] w-[100px] absolute left-[8px]'></div>
            <div className='h-[36px] w-[100px] absolute right-[8px]'></div>
          </div>
          <div className="h-[146px] flex items-center justify-center relative" style={{flex: '0 0 272px'}}>
            <iframe className='w-[256px] h-[144px] z-10' src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            <div className='z-20 w-[256px] h-[144px] border-2 absolute' onClick={() => console.log('onclicked!')}></div>
          </div>
        </div>

      </div>

      <div className="flex gap-[16px] border-2 items-center">
        <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px]'/>
        {scrollSnaps.map((_, index) => (<>
          <DotButton
            key={index}
            active={(selectedIndex === index)}
            onClick={() => onDotButtonClick(index)}
          />
        </>))}
        <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px]'/>
      </div>

    </div>
  )
}
export default TheLatestInFABSection