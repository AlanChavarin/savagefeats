'use client'
import dynamic from "next/dynamic"
import LazyComponentWrapper from "@/HomepageComponents/LazyComponentWrapper"
import LoadingSection from "@/HomepageComponents/LoadingSection"

const DynamicLatestInFABSection = dynamic(() => import("@/HomepageComponents/LatestInFABSection"), {
    ssr: true,
    loading: () => <LoadingSection />
  })
  
  const DynamicLatestTournamentSection = dynamic(() => import("@/HomepageComponents/LatestTournamentSection"), {
    ssr: true,
    loading: () => <LoadingSection />
  })
  
  const DynamicUpcomingTournamentSection = dynamic(() => import("@/HomepageComponents/UpcomingTournamentSection"), {
    ssr: true,
    loading: () => <LoadingSection />
  })
  
  const DynamicWinningDecksSection = dynamic(() => import("@/HomepageComponents/WinningDecksSection"), {
    ssr: true,
    loading: () => <LoadingSection />
  })
  
  const DynamicContentCreatorSection = dynamic(() => import("@/HomepageComponents/ContentCreatorSection"), {
    ssr: true,
    loading: () => <LoadingSection />
  })


function HomePageSectionsContainer() {


  return (
    <div className='flex flex-col gap-[128px] min-[480px]:gap-[280px] justify-between py-[96px] sm:py-[128px] md:py-[128px] lg:py-[256px]'>

      <LazyComponentWrapper>
        <DynamicLatestInFABSection backgroundImage={'/hvy.jpg'} backgroundImageBlur={'/hvyBlur.jpg'}/>
      </LazyComponentWrapper>

      <LazyComponentWrapper>
        <DynamicLatestTournamentSection/>
      </LazyComponentWrapper>

      <LazyComponentWrapper>
        <DynamicUpcomingTournamentSection/>
      </LazyComponentWrapper>

      <LazyComponentWrapper>
        <DynamicWinningDecksSection/>
      </LazyComponentWrapper>

      <LazyComponentWrapper>
        <DynamicContentCreatorSection/> 
      </LazyComponentWrapper>
      
    </div>
  )
}
export default HomePageSectionsContainer