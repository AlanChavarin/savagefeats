'use client'
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
        <YoutubeVideoCarousel youtubeIDs={['ZKxA3LAZybw', 'IjG3XpmLWCs', 'R2p1qSTQOck', 'zxCaHNrpHLE', 'G_Pp41Enahw']} backgroundImage={'hvy.PNG'}/>
        <div className='block lg:hidden'><UpcomingTournamentsSectionSmall/></div>
        <div className='hidden lg:block'><UpcomingTournamentsSectionBig/></div>
        <div className='block lg:hidden'><WinningDecksSectionSmall /></div>
        <div className='hidden lg:block'><WinningDecksSectionBig /></div>
        <div className='block md:hidden'><ContentCreatorSectionSmall /></div>
        <div className='hidden md:block'><ContentCreatorSectionBig /></div>
      </div>
    </main>
  )
}
