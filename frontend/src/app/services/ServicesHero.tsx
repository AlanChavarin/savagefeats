'use client'
import IFrameBackground from './IFrameBackground'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faVideo, faRectangleAd, faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import GetInTouchButton from './servicePageComponents/GetInTouchButton'

function ServicesHero() {

  return (
    <div className='w-full relative items-center min-[1500px]:h-auto overflow-hidden'>

      <IFrameBackground />

      <div className='flex flex-col justify-between items-center'>

        <div className='flex flex-col gap-[64px] min-[1900px]:gap-[96px] items-center absolute top-0 left-0 w-full z-[2] py-[32px] lg:py-[128px]'>

          <div className='flex flex-col gap-[16px]'>
            <Image src={'/SVGWHITE.png'} alt='savage feats logo' width={512} height={128} className='w-[80vw] md:w-[512px] min-[1900px]:w-[768px]'/>
            <h1 className="text-white text-[16px] ssm:text-[16px] sm:text-[23px] xl:text-[33px] text-balance w-full text-center leading-[48px] text-shadow" style={{fontFamily: 'foulfiend'}}>
              Production Services
            </h1>
          </div>

          <div className='flex flex-col lg:flex-row gap-[24px] lg:gap-[64px] text-white font-bold *:text-shadow text-[27px] min-[1900px]:text-[33px] items-center'>
            <div className='flex flex-row gap-[16px] items-center'>
              <div className='relative'>
                <FontAwesomeIcon icon={faVideo} />
                <FontAwesomeIcon icon={faVideo} className='text-black absolute z-[-1] top-[12px] left-[4px]'/>
              </div>
              <div>Live Streaming</div>
            </div>
            <div className='flex flex-row gap-[16px] items-center'>
              <div className='relative'>
                <FontAwesomeIcon icon={faMicrophone} />
                <FontAwesomeIcon icon={faMicrophone} className='text-black absolute z-[-1] top-[12px] left-[4px]'/>
              </div>
              <div>Casting</div>
            </div>
            <div className='flex flex-row gap-[16px] items-center'>
              <div className='relative'>
                <FontAwesomeIcon icon={faRectangleAd} />
                <FontAwesomeIcon icon={faRectangleAd} className='text-black absolute z-[-1] top-[12px] left-[4px]'/>
              </div>
              <div>Live Streaming</div>
            </div>
          </div>

          <GetInTouchButton />

          

        </div>
        
      </div>

      <div className='flex justify-between text-white w-[90%] xl:w-[1200px] translate-y-[-0px] z-[2] absolute bottom-[64px] left-[50%] translate-x-[-50%]'>
        <FontAwesomeIcon icon={faChevronDown} className='h-[64px] lg:h-[128px]'/>
        <FontAwesomeIcon icon={faChevronDown} className='h-[64px]  lg:h-[128px]' />
      </div>
      
    </div>
  )
}
export default ServicesHero

// <ParallaxBanner layers={[{image: '/serviceHeroImage.PNG', translateY:[-25, 25]}]} style={{willChange: 'transform'}}>
//     <div className='w-full h-[900px] relative'
//     style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}> 
        
//     </div>
// </ParallaxBanner>