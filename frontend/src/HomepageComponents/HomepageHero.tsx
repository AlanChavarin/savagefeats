import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrophy, faList, faEye, faVideo, faChevronDown, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import HomepageHeroBackground from "./HomepageHeroBackground"

function HomepageHero() {

  return (
      <div className='relative w-full bg-fill py-[32px] sm:py-[64px] flex flex-col items-center  gap-[32px] sm:gap-[96px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}> 

        <div className="h-full w-full absolute z-[-1] top-0">
          <HomepageHeroBackground />    
        </div>

        <div className='w-[90%] ssm:w-[512px] flex flex-col gap-[16px] sm:gap-[32px] items-center'>
          <Image src={'/SVGWHITE.png'} alt='savage feats logo' width={512} height={128} className='w-full'/>
          <h1 className="text-white text-[16px] ssm:text-[23px] sm:text-[27px] text-balance w-full text-center leading-[32px] ssm:leading-[48px] text-shadow" style={{fontFamily: 'foulfiend'}}>
            THE TOURNAMENT HUB FOR <span className='text-custom-tertiary'>FLESH</span> AND <span className='text-custom-tertiary'>BLOOD</span>
          </h1>
        </div>

        <div className="w-full items-center flex flex-col gap-[24px] sm:gap-[32px] sm:grid sm:grid-cols-2 lg:flex lg:flex-row text-white xl:w-[1200px] justify-between">

          <div className='flex sm:flex-col items-center m-auto w-[290px] sm:w-[224px] xl:w-[256px] gap-[16px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faTrophy} className='text-[48px] xl:text-[64px]'/>
            <div className='hidden sm:block text-[27px] xl:text-[33px] font-bold'>Tournament Info</div>
            <div className='hidden sm:block text-[13px] xl:text-[16px] text-center drop-shadow-xl'>
              Browse our <span className='font-bold'>comprehensive database</span> of past and future <span className='font-bold'>tournaments</span>. Easiest way to get information about <span className='font-bold'>upcoming tournaments</span>.
            </div>
            <div className='sm:hidden text-[13px] xl:text-[16px] text-center drop-shadow-xl'>
              Browse our <span className='font-bold'>comprehensive database</span> of <span className='font-bold'>tournaments, feature matches, and decklists</span>.
            </div>
          </div>

          <div className='hidden sm:flex flex-col items-center m-auto w-[224px] xl:w-[256px] gap-[16px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faList} className='text-[48px] xl:text-[64px]'/>
            <div className='text-[27px] xl:text-[33px] font-bold'>Decklists</div>
            <div className='text-[13px] xl:text-[16px] text-center drop-shadow-xl'>
              Easily access the top winning <span className='font-bold'>deck lists</span> from recent tournaments
            </div>
          </div>

          <div className='hidden sm:flex flex-col items-center m-auto w-[224px] xl:w-[256px] gap-[16px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faEye} className='text-[48px] xl:text-[64px]'/>
            <div className='text-[27px] xl:text-[33px] font-bold'>Matches</div>
            <div className='text-[13px] xl:text-[16px] text-center drop-shadow-xl' >Search for all streamed <span className='font-bold'>Flesh and Blood feature matches</span> from across different official and community run events.</div>
          </div>

          <div className='flex sm:flex-col items-center m-auto w-[290px] sm:w-[224px] xl:w-[256px] gap-[16px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faYoutube} className='text-[48px] xl:text-[64px]'/>
            <div className='hidden sm:block text-[27px] xl:text-[33px] font-bold'>Content</div>
            <div className='hidden sm:block text-[13px] xl:text-[16px] text-center drop-shadow-xl'>From deck techs, to upcoming livestreams, get a curated list of the latest in <span className='font-bold'>Flesh and Blood content</span>.</div>
            <div className='sm:hidden text-[13px] xl:text-[16px] text-center drop-shadow-xl'>Get the latest in <span className='font-bold'>Flesh and Blood content</span>.</div>
          </div>
        </div>

        <div className='flex flex-col items-center m-auto justify-between text-white text-center'>
          <div className='flex sm:flex-col items-center w-[290px] sm:w-[80%] md:w-[384px] gap-[16px]' style={{textShadow: '4px 4px 2px black'}}>
            <FontAwesomeIcon icon={faVideo} className='text-[48px] md:text-[64px]'/>
            <div className='hidden sm:block text-[27px] xl:text-[33px] font-bold'>Production Services</div>
            <div className='text-[13px] xl:text-[16px] text-center drop-shadow-xl'>
                We also offer <span className='font-bold'>production services!</span> <br/>
                Feel free to check out our <a href='/services' className='font-bold underline hover:text-purple-500'>services page here &nbsp; <FontAwesomeIcon icon={faUpRightFromSquare} className="text-[13px] " /></a> 
            </div>
          </div>
        </div>
        <div className='flex justify-between text-white w-[90%] xl:w-[1200px]'>
          <FontAwesomeIcon icon={faChevronDown} className='text-[64px] lg:text-[128px]'/>
          <FontAwesomeIcon icon={faChevronDown} className='text-[64px]  lg:text-[128px]' />
        </div>
      </div>
  )
}
export default HomepageHero


{/* <ParallaxBanner layers={[{image: '/mulch.jpg', translateY:[-25, 25]}]} style={{willChange: 'transform'}}>

</ParallaxBanner> */}

// style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}
