import { ParallaxBanner } from 'react-scroll-parallax'

function Header() {
  return (
        <ParallaxBanner layers={[{image: '/portfolioPagePics/localgamestoreplayersplaying.jpg', translateY: [-1, 1]}]} style={{willChange: 'transform'}} className='h-[96px] min-[350px]:h-[128px] min-[600px]:h-[256px]'>
            <div className='w-full h-full flex flex-col justify-center items-center relative' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}>
                <h1 className='text-white text-[11px] md:text-[27px] lg:text-[33px] text-shadow' style={{fontFamily: 'foulfiend'}}>Savage Feats' <span className='text-custom-primary'>Production Portfolio</span></h1>
            </div>
        </ParallaxBanner>
  )
}
export default Header
