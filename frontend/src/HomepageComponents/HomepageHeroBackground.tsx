'use client'
import { ParallaxBanner } from 'react-scroll-parallax'
import { Providers } from '@/app/Providers'

function HomepageHeroBackground() {
  return (
    <Providers>
      <ParallaxBanner 
      layers={
        [{image: '/mulch.jpg', translateY: ((typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-30, 30])}]
      } className="h-full" />
    </Providers>
  )
}
export default HomepageHeroBackground