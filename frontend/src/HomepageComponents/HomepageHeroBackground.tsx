'use client'
import { ParallaxBanner } from 'react-scroll-parallax'
import { Providers } from '@/app/Providers'

function HomepageHeroBackground() {
  return (
    <Providers>
      <ParallaxBanner layers={[{image: '/mulch.jpg', translateY:[-25, 25]}]} style={{willChange: 'transform'}} className="h-full" />
    </Providers>
  )
}
export default HomepageHeroBackground