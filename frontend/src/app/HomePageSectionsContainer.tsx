import LatestInFABSection from "@/HomepageComponents/latestInFabSection/LatestInFABSection"
import LatestTournamentSection from "@/HomepageComponents/eventsSections/LatestTournamentSection"
import UpcomingTournamentSection from "@/HomepageComponents/eventsSections/UpcomingTournamentSection"
import WinningDecksSection from "@/HomepageComponents/deckSections/WinningDecksSection"
import ContentCreatorSection from "@/HomepageComponents/contentSections/ContentCreatorSection"

function HomePageSectionsContainer() {

  return (
    <div className='flex flex-col gap-[128px] min-[480px]:gap-[280px] justify-between py-[96px] sm:py-[128px] md:py-[128px] lg:py-[256px]'>

      <LatestInFABSection backgroundImage={'/hvy.jpg'} backgroundImageBlur={'/hvyBlur.jpg'}/>
      <LatestTournamentSection/>
      <UpcomingTournamentSection/>
      <WinningDecksSection/>
      <ContentCreatorSection/>
      

    </div>
  )
}
export default HomePageSectionsContainer