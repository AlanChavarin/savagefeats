'use client'
import { ParallaxBanner } from 'react-scroll-parallax'

function SectionBackground({image, size}: {image: string, size: ('small' | 'medium' | 'big')}) {
  return (<>
    {
      (size==='small') && 
      <div className='text-white w-full h-[65vw] min-[360px]:h-[256px] lg:h-[384px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1]'>
        <ParallaxBanner layers={[{image, speed: -30, opacity: [.5, .5]}]}>
          <div className='w-full bg-black h-[65vw] min-[360px]:h-[256px] lg:h-[384px]'></div>
        </ParallaxBanner>
      </div>
    }

    {
      (size==='medium') && 
      <div className='text-white w-full h-[65vw] min-[455px]:h-[256px] min-[774px]:h-[400px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1]'>
        <ParallaxBanner layers={[{image, speed: -30, opacity: [.5, .5]}]}>
          <div className='w-full bg-black h-[65vw] min-[455px]:h-[256px] min-[774px]:h-[400px] bg-top' style={{backgroundPosition: '0px -200px'}}></div>
        </ParallaxBanner>
      </div>
    }

    {
      (size==='big') && 
      <div className='text-white w-full h-[65vw] min-[455px]:h-[256px] lg:h-[512px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1]'>
        <ParallaxBanner layers={[{image, speed: -30, opacity: [.5, .5]}]}>
          <div className='w-full bg-black h-[65vw] min-[455px]:h-[256px] lg:h-[512px]'></div>
        </ParallaxBanner>
      </div>
    }
  </>)
}
export default SectionBackground



{/* <div className={`text-white h-[256px] w-full skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] z-[-1]`}
style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('${image}')`, backgroundSize: 'cover', backgroundPosition: `0 ${top}px `}}></div> */}