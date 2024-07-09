
import HomepageHero from "@/HomepageComponents/HomepageHero"
import LatestTournamentSection from "@/HomepageComponents/LatestTournamentSection"
import UpcomingTournamentSection from "@/HomepageComponents/UpcomingTournamentSection"
import WinningDecksSection from "@/HomepageComponents/WinningDecksSection"

// import { useEffect, useState } from "react"
import { errorSchema,  contentCreatorSchema } from "@/app/schemas/schemas"
import { contentCreatorSchemaType } from "@/app/types/types"
import { z } from "zod"
import { toast } from "react-toastify"
import ContentCreatorSection from "@/HomepageComponents/ContentCreatorSection"
import LatestInFABSection from "@/HomepageComponents/LatestInFABSection"


let creators: contentCreatorSchemaType[]

export default async function Home() {

  //const [creators, setCreators] = useState<contentCreatorSchemaType[] | undefined>(undefined)

  //grab creator data
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}contentcreators/?&featured=true`, {cache: "no-store"})
  .then(r => r.json())
  .then(data => {
    const validatedData = z.array(contentCreatorSchema).safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
      creators = validatedData.data
      return
    }

    if(validatedError.success){
      throw new Error(validatedError.data.errorMessage)
    }

    console.error(validatedData.error)
    console.error(validatedError.error)
    throw new Error('Unexpected data. Check console for further details')
  }).catch(err => {
    toast.error(err.message)
  })

  return (
    <main className="flex-1 overflow-hidden pb-[128px] min-h-[512px]" style={{transformStyle: 'preserve-3d'}}>
      <HomepageHero />

      <div className='flex flex-col gap-[196px] min-[480px]:gap-[280px] justify-between py-[64px] md:py-[128px] lg:py-[256px]'>

        <LatestInFABSection backgroundImage={'hvy.jpg'} />
        
        <LatestTournamentSection/>

        <UpcomingTournamentSection/>

        <WinningDecksSection/>

        {creators?.map(creator => <ContentCreatorSection creator={creator} key={creator._id}/>)}
        
      </div>
    </main>
  )
}
