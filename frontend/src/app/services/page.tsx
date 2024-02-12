'use client'
import ServicesHero from "./ServicesHero"
import ImageSection from "./servicePageComponents/ImageSection"
import GetInTouchButton from "./servicePageComponents/GetInTouchButton"
import TestimonialSection from "./servicePageComponents/TestimonialSection"
import YoutubeVideoCarousel from "@/HomepageComponents/YoutubeVideoCarousel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"

function page() {
  return (
    <main className='flex-1 gap-[384px] md:gap-[512px] flex flex-col items-start pb-[512px] overflow-hidden'>

      <ServicesHero />

      <ImageSection imageSize={'normal'} backgroundImage="servicePagePics/Capture1212131.PNG" images={['123234345.PNG', 'Captu32423535re.PNG', 'Capture1212131.PNG']}> 
        <div className='flex flex-col w-[90vw] md:w-[540px] gap-[8px]'>
          <div className='text-[23px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center md:self-start'>
            Live Streaming Services
          </div>
          <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
            Our livestreaming experts handle everything from camera setup, lighting, and the  networking required for your event's livestream.
          </div>
        </div>
      </ImageSection>

      <ImageSection imageSize={'normal'} backgroundImage="servicePagePics/dacrew.PNG" images={['wrtedrtyu.PNG', 'F1BJ5X9aIAAtQXU.jpg', 'dacrew.PNG']}> 
        <div className='flex flex-row gap-[16px] md:gap-[32px] items-center w-[90vw] md:w-[800px] '>

          <div className='flex flex-col gap-[8px]'>
            <div className='text-[23px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center md:self-start'>
              Casting Services
            </div>
            <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
              We work with the most talented and knowledgeable casters to bring the best quality commentary to your event's livestream. 
            </div>
          </div>

          <div className='hidden md:block'>
            <GetInTouchButton />
          </div>

        </div>
      </ImageSection>

      <ImageSection imageSize={'square'} backgroundImage="servicePagePics/bRyAk0h.jpg" images={['channels4_profile (1).jpg', 'download (1).jpg', 'download.jpg', 'z_zrnyMK_400x400.jpg']}> 
        <div className='flex flex-row gap-[16px] md:gap-[32px] items-center justify-center w-[90vw] md:w-[800px] '>

          <div className='hidden md:block'>
            <GetInTouchButton />
          </div>

          <div className='flex flex-col gap-[8px]'>
            <div className='text-[21px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center'>
              We Handle Sponsorships
            </div>
            <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
              We have connections with many partners willing to help sponsor your event. 
            </div>
          </div> 

        </div>
      </ImageSection>

      <TestimonialSection backgroundImage="servicePagePics/bRyAk0h.jpg" />

      <YoutubeVideoCarousel youtubeIDs={['7YnrqxZ8euk', 'yB4Oqze8xaE', 'PjCEux4qspo', 'zMzUgoT7b4Y', '9Dmwn-rxdcc']} backgroundImage='servicePagePics/123234345.PNG'>
        <div className='flex flex-col gap-[16px]'>
          <div className='text-[27px] sm:text-[39px] md:text-[48px] text-white text-shadow font-bold'>
            Our Latest Events
          </div>
          <div className='text-[13px] sm:text-[19px] md:text-[23px] text-white text-shadow underline font-normal'>
            View the rest of our portfolio Hardened <span> </span> <span> </span>
            <FontAwesomeIcon icon={faSquareArrowUpRight}/>
          </div>
        </div>
        
      </YoutubeVideoCarousel>

    </main>
  )
}
export default page


// 98
// 82
// 68
// 57
// 48
// 39
// 33
// 27
// 23
// 19
// 16
// 13
// 11
