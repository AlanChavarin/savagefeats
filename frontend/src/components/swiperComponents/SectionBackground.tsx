'use client'
import { Providers } from '@/app/Providers'
//import { ParallaxBanner } from 'react-scroll-parallax'
import Image from "next/image"
import { useEffect, useState } from "react"

function ParallaxContainer({image, idAddon}: {image: string, idAddon?: string}){

  const [position, setPosition] = useState<number>(0)

  useEffect(() => {
    const element = document.getElementById(`${image}_parallaxContainer_${idAddon}`)
    if (!element) return

    function handleParallax() {
      //let initialTop = element.offsetTop;
      // @ts-ignore
      let rect = element.getBoundingClientRect()
      //let viewportHeight = window.innerHeight

      // if(image==="https://cdna.artstation.com/p/assets/images/images/063/946/404/large/ray-of-sand-screenshot-20230614-074615.jpg?1686743879"){
      //   console.log(window.scrollY, rect.y)
      // }


      let scrolled = -rect.y*.7
      if(window.innerWidth > 600){
        setPosition(scrolled)
      } else {
        setPosition(0)
      }
    }

    window.addEventListener('scroll', handleParallax)

    return () => {
      window.removeEventListener('scroll', handleParallax)
    }

  }, [])

  return ( 
    <div id={image + '_parallaxContainer_' + idAddon} className='h-[100vh] w-[100%] relative translate-y-[-10vh]' style={{top: position}}>
      <Image 
        alt="background Image"
        src={image}
        fill
        sizes="100%"
        className={`object-cover opacity-50`}
      />
    </div>
  )
}

function SectionBackground({image, size, idAddon}: {image: string, size: ('small' | 'medium' | 'big' | 'veryBig'), idAddon?: string}) {

  return (<Providers>
    {
      (size==='small') && 
      <div className='text-white w-full h-[60vw] min-[370px]:h-[256px] lg:h-[384px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1] overflow-hidden bg-black'>
        {/* <ParallaxBanner layers={[{image, translateY: (typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-30, 30], opacity: [.5, .5]}]} style={{willChange: 'transform'}}>
          <div className='w-full bg-black h-[65vw] min-[360px]:h-[256px] lg:h-[384px]'></div>
        </ParallaxBanner> */}
        <ParallaxContainer image={image} idAddon={idAddon}/>

      </div>
    }

    {
      (size==='medium') && 
      <div className='text-white w-full h-[65vw] min-[455px]:h-[256px] min-[774px]:h-[400px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1] overflow-hidden bg-black'>
        {/* <ParallaxBanner layers={[{image, translateY: (typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-30, 30], opacity: [.5, .5]}]} style={{willChange: 'transform'}}>
          <div className='w-full bg-black h-[65vw] min-[455px]:h-[256px] min-[774px]:h-[400px] bg-top' style={{backgroundPosition: '0px -200px'}}></div>
        </ParallaxBanner> */}
        <ParallaxContainer image={image} idAddon={idAddon}/>
      </div>
    }

    {
      (size==='big') && 
      <div className='text-white w-full h-[65vw] min-[455px]:h-[256px] lg:h-[512px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1] overflow-hidden bg-black'>
        {/* <ParallaxBanner layers={[{image, translateY: (typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-30, 30], opacity: [.5, .5]}]} style={{willChange: 'transform'}}>
          <div className='w-full bg-black h-[65vw] min-[455px]:h-[256px] lg:h-[512px]'></div>
        </ParallaxBanner> */}
        <ParallaxContainer image={image} idAddon={idAddon}/>
      </div>
    }

    {
      (size==='veryBig') && 
      <div className='text-white w-full h-[80vw] min-[455px]:h-[256px] md:h-[512px] skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] bottom-[0px] z-[-1] overflow-hidden bg-black'>
        {/* <ParallaxBanner layers={[{image, translateY: (typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-30, 30], opacity: [.5, .5]}]} style={{willChange: 'transform'}}>
          <div className='w-full bg-black h-[80vw] min-[455px]:h-[256px] md:h-[512px]'></div>
        </ParallaxBanner> */}
        <ParallaxContainer image={image} idAddon={idAddon}/>
      </div>
    }
  </Providers>)
}
export default SectionBackground



{/* <div className={`text-white h-[256px] w-full skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] z-[-1]`}
style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('${image}')`, backgroundSize: 'cover', backgroundPosition: `0 ${top}px `}}></div> */}