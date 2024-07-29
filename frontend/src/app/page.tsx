
import HomepageHero from "@/HomepageComponents/HomepageHero"
import LatestTournamentSection from "@/HomepageComponents/LatestTournamentSection"
import UpcomingTournamentSection from "@/HomepageComponents/UpcomingTournamentSection"
import WinningDecksSection from "@/HomepageComponents/WinningDecksSection"
import ContentCreatorSection from "@/HomepageComponents/ContentCreatorSection"
import LatestInFABSection from "@/HomepageComponents/LatestInFABSection"

export default async function Home() {

  return (
    <main className="flex-1 overflow-hidden pb-[128px] min-h-[512px]" style={{transformStyle: 'preserve-3d'}}>
      <HomepageHero />

      <div className='flex flex-col gap-[128px] min-[480px]:gap-[280px] justify-between py-[96px] sm:py-[128px] md:py-[128px] lg:py-[256px]'>

        <LatestInFABSection backgroundImage={'/hvy.jpg'} />
        
        <LatestTournamentSection/>

        <UpcomingTournamentSection/>

        <WinningDecksSection/>

        <ContentCreatorSection/>
        
      </div>
    </main>
  )
}
