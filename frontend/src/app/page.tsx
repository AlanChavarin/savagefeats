// 'use client'

import HomepageHero from "@/HomepageComponents/HomepageHero"
import UpcomingTournamentsSectionBig from "@/HomepageComponents/UpcomingTournamentsSectionBig"
import UpcomingTournamentsSectionSmall from "@/HomepageComponents/UpcomingTournamentsSectionSmall"
import WinningDecksSectionSmall from "@/HomepageComponents/WinningDecksSectionSmall"
import WinningDecksSectionBig from "@/HomepageComponents/WinningDecksSectionBig"
import ContentCreatorSectionSmall from "@/HomepageComponents/ContentCreatorSectionSmall"
import ContentCreatorSectionBig from "@/HomepageComponents/ContentCreatorSectionBig"
import YoutubeVideoCarousel from "@/HomepageComponents/YoutubeVideoCarousel"

export default function Home() {

  return (
    <main className="flex-1 overflow-hidden pb-[128px]" style={{transformStyle: 'preserve-3d'}}>
      <HomepageHero />
      {/* section conatiner */}
      <div className='flex flex-col gap-[196px] min-[480px]:gap-[280px] lg:gap-[384px] justify-between py-[64px] md:py-[128px] lg:py-[256px]'>
        <YoutubeVideoCarousel youtubeIDs={['ZKxA3LAZybw', 'IjG3XpmLWCs', 'R2p1qSTQOck', 'zxCaHNrpHLE', 'G_Pp41Enahw']} backgroundImage={'hvy.PNG'}>
          <div className='text-[11px] md:text-[16px] lg:text-[19px] lg:my-[32px] xl:text-[27px] text-white foulfiend text-shadow'>
            The Latest in Flesh and Blood
          </div>
        </YoutubeVideoCarousel>
        <div className='block lg:hidden'><UpcomingTournamentsSectionSmall/></div>
        <div className='hidden lg:block'><UpcomingTournamentsSectionBig/></div>
        <div className='block lg:hidden'><WinningDecksSectionSmall /></div>
        <div className='hidden lg:block'><WinningDecksSectionBig /></div>
        <div className='block lg:hidden'><ContentCreatorSectionSmall channelId='UCI5yJdQ4y8r_3J9JCiyHIzQ'/></div>
        <div className='hidden lg:block'><ContentCreatorSectionBig channelId='UCI5yJdQ4y8r_3J9JCiyHIzQ'/></div>
      </div>
    </main>
  )
}
