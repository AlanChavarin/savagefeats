'use client'
import { ParallaxBanner } from 'react-scroll-parallax'
import { Providers } from '@/app/Providers'

function HomepageHeroBackground() {
  return (
    <Providers>
      <ParallaxBanner 
      layers={
        [{image: '/mulch.jpg', translateY: ((typeof window !== "undefined" && window.innerWidth < 600) ? [0, 0] : [-25, 25])}]
      } className="h-full" />
    </Providers>
  )
}
export default HomepageHeroBackground