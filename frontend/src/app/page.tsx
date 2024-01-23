'use client'
import HomepageHero from "@/HomepageComponents/HomepageHero"
import TheLatestInFABSection from "@/HomepageComponents/TheLatestInFABSection"
import UpcomingTournamentsSection from "@/HomepageComponents/UpcomingTournamentsSection"

export default function Home() {

  return (
    <main className="flex-1 overflow-hidden pb-[128px]">
      <HomepageHero />
      {/* section conatiner */}
      <div className='flex flex-col gap-[128px] md:gap-[256px] lg:gap-[384px] justify-between py-[64px] md:py-[128px] lg:py-[256px]'>
        <TheLatestInFABSection/>
        <UpcomingTournamentsSection/>
      </div>
      
    </main>
  )
}
