'use client'
import HomepageHero from "@/HomepageComponents/HomepageHero"
import TheLatestInFABSection from "@/HomepageComponents/TheLatestInFABSection"

export default function Home() {

  return (
    <main className="flex-1">
      <HomepageHero />
      {/* section conatiner */}
      <div className='flex flex-col gap-[128px] justify-between py-[128px]'>
        <TheLatestInFABSection/>
      </div>
      
    </main>
  )
}
