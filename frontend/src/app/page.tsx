import HomepageHero from "@/HomepageComponents/HomepageHero"
import HomePageSectionsContainer from "./HomePageSectionsContainer"
// import LatestInFABSection from "@/HomepageComponents/LatestInFABSection"
// import LatestTournamentSection from "@/HomepageComponents/LatestTournamentSection"
// import UpcomingTournamentSection from "@/HomepageComponents/UpcomingTournamentSection"
// import WinningDecksSection from "@/HomepageComponents/WinningDecksSection"
// import ContentCreatorSection from "@/HomepageComponents/ContentCreatorSection"

export default async function Home() {

  return (
    <main className="flex-1 overflow-hidden pb-[128px] min-h-[512px]" style={{transformStyle: 'preserve-3d'}}>
      <HomepageHero />
      <HomePageSectionsContainer/>

      {/* <div className='flex flex-col gap-[128px] min-[480px]:gap-[280px] justify-between py-[96px] sm:py-[128px] md:py-[128px] lg:py-[256px]'>
        <LatestInFABSection backgroundImage={'/hvy.jpg'} backgroundImageBlur={'/hvyBlur.jpg'}/>
        <LatestTournamentSection/>
        <UpcomingTournamentSection/>
        <WinningDecksSection/>
        <ContentCreatorSection/> 
      </div> */}

    </main>
  )
}
