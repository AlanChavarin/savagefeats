import ServicesHero from "./servicePageComponents/ServicesHero"
import ImageSection from "./servicePageComponents/ImageSection"
import GetInTouchButton from "./servicePageComponents/GetInTouchButton"
import TestimonialSection from "./servicePageComponents/TestimonialSection"
import YoutubeVideoCarousel from "@/HomepageComponents/YoutubeVideoCarousel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"
import ContactUsSection from "./servicePageComponents/ContactUsSection"
import { z } from "zod"
import { errorSchema } from "../schemas/schemas"

const responseSchema = z.array(z.object({
  videoid: z.string(),
}))

let youtubeIDs: string[]

async function page() {

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content/portfoliocontent`
  await fetch(url, {cache: 'no-store'})
  .then(r => r.json())
  .then(data => {
    const validatedData = responseSchema.safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
      youtubeIDs = (validatedData.data.map(content => content.videoid))
      return
    }

    if(validatedError.success){
      throw new Error(validatedError.data.errorMessage)
    }

    console.error(validatedData.error)
    console.error(validatedError.error)
    throw new Error('Unexpected data. Check console for further details')
  }).catch(err => {
    console.error(err.message)
  })


  return (
    <main className='flex-1 gap-[280px] md:gap-[512px] flex flex-col items-start pb-[512px] overflow-hidden'>

      <ServicesHero />

      <ImageSection imageSize={'normal'} backgroundImage="/servicePagePics/crazyillusionistboard_usnats.png" images={[
        'protourfinalsStart.png', 
        'AmsterdamnFinals.png', 
        'RosettaWorldPremiere_YukiDraftPov.PNG', 
        'RosettaWorldPremiere_MichaelHamiltonVSLucasOswald.png', 
        'protouramsterdamn_metabreakdown.png',
        'battlehardenedmontreal.jpg', 
        'battlehardenedPhiladelphia.jpg', 
        'Capture1212131.jpg'
      ]} descriptions={[
        'Los Angeles Pro Tour Finals', 
        'Amsterdam Pro Tour Winner', 
        'Draft Pov - Rosetta World Premiere', 
        'Rosetta World Premiere', 
        'Amsterdam Pro Tour Meta Breakdown',
        'Battle Hardened: Montreal', 
        'Battle Hardened: Philadelphia', 
        'Battle Hardened: Orlando'
      ]}> 
        <div className='flex flex-col w-[90vw] md:w-[540px] gap-[8px]'>
          <div className='text-[23px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center md:self-start'>
            Live Streaming Services
          </div>
          <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
            Our livestreaming experts handle everything from camera setup, lighting, and the  networking required for your event&apos;s livestream.
          </div>
        </div>
      </ImageSection>

      <ImageSection imageSize={'normal'} backgroundImage="/servicePagePics/dacrew.jpg" 
      images={[
        'RosettaWorldPremiere_Sam&LucasChamp.PNG', 
        'protourLA_casting.png', 
        'ProtourAmsterdamn_casters.png',
        'RosettaWorldPremiere_Elly&Sam.PNG', 
        'protourLA_casting2.png', 
        'canadiannats_ellyandbrodie2.png',
        'dacrew.jpg'
      ]} descriptions={[
        'Rosetta World Premiere', 
        'Protour Los Angeles', 
        'Protour Amsterdam',
        'Rosetta World Premiere', 
        'Protour Los Angeles', 
        'Canadian Nationals',
        'Battle Hardened: Portland'
      ]}> 
        <div className='flex flex-row gap-[16px] md:gap-[32px] items-center w-[90vw] md:w-[800px] '>

          <div className='flex flex-col gap-[8px]'>
            <div className='text-[23px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center md:self-start'>
              Casting Services
            </div>
            <div className='text-[11px] sm:text-[16px] md:text-[19px] font-bold text-white text-shadow'>
              We work with the most talented and knowledgeable casters to bring the best quality commentary to your event&apos;s livestream. 
            </div>
          </div>

          <div className='hidden md:block'>
            <GetInTouchButton />
          </div>

        </div>
      </ImageSection>

      <ImageSection imageSize={'square'} backgroundImage="/servicePagePics/genis.jpg" images={['thaicardsshop.PNG', 'heavyplay.PNG', 'fabreclogo.png', 'realm_games.png', 'channels4_profile (1).jpg', 'download (1).jpg', 'download.jpg', 'z_zrnyMK_400x400.jpg']} descriptions={['Thai Cards Shop', 'Heavy Play', 'Fab Rec', "Realm Games", 'Fresh and Buds', 'Fab Foundary', 'Kayfabe Cards', 'Team Ascent']}> 
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

      <TestimonialSection backgroundImage="/servicePagePics/tomeofduplicity.jpg" />

      <YoutubeVideoCarousel youtubeIDs={youtubeIDs.slice(0, 5)} backgroundImage='/servicePagePics/protourfinalsStart.png'>

        <div className='flex flex-col gap-[16px]'>
          <div className='text-[27px] sm:text-[39px] md:text-[48px] text-white text-shadow font-bold'>
            Our Latest Events
          </div>
          <div className='text-[13px] sm:text-[19px] md:text-[19px] text-white text-shadow underline font-normal flex justify-center'>
            <a href="/portfolio">
              View the rest of our portfolio &nbsp;
              <FontAwesomeIcon icon={faSquareArrowUpRight}/>
            </a>
          </div>
        </div>
        
      </YoutubeVideoCarousel>

      <ContactUsSection />

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


//['7YnrqxZ8euk', 'yB4Oqze8xaE', 'PjCEux4qspo', 'zMzUgoT7b4Y', '9Dmwn-rxdcc']
