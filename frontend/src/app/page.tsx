'use client'
import HomepageHero from "@/HomepageComponents/HomepageHero"
import UpcomingTournamentsSectionBig from "@/HomepageComponents/UpcomingTournamentsSectionBig"
import UpcomingTournamentsSectionSmall from "@/HomepageComponents/UpcomingTournamentsSectionSmall"
import WinningDecksSection from "@/HomepageComponents/WinningDecksSection"

import { useEffect, useState } from "react"
import { eventSchema, errorSchema, deckSchema, contentCreatorSchema } from "@/app/schemas/schemas"
import { eventSchemaType, deckSchemaType, contentCreatorSchemaType } from "@/app/types/types"
import { z } from "zod"
import { toast } from "react-toastify"
import ContentCreatorSection from "@/HomepageComponents/ContentCreatorSection"
import LatestInFABSection from "@/HomepageComponents/LatestInFABSection"

const responseEventSchema = z.object({
  count: z.number(),
  events: z.array(eventSchema),
})


export default function Home() {

  const [events, setEvents] = useState<eventSchemaType[] | undefined>(undefined)
  const [decks, setDecks] = useState<deckSchemaType[] | undefined>(undefined)
  //const [channelData, setChannelData] = useState<any>(undefined)
  const [creators, setCreators] = useState<contentCreatorSchemaType[] | undefined>(undefined)

  useEffect(() => {

    //grab latest events
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events`)
    .then(r => r.json())
    .then(data => {
      const validatedData = responseEventSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setEvents(validatedData.data.events)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    //grab creator data
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}contentcreators/?&featured=true`)
    .then(r => r.json())
    .then(data => {
      const validatedData = z.array(contentCreatorSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setCreators(validatedData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

  }, [])

  return (
    <main className="flex-1 overflow-hidden pb-[128px] min-h-[512px]" style={{transformStyle: 'preserve-3d'}}>
      <HomepageHero />
      {/* section container */}
      <div className='flex flex-col gap-[196px] min-[480px]:gap-[280px] lg:gap-[384px] justify-between py-[64px] md:py-[128px] lg:py-[256px]'>
        <LatestInFABSection backgroundImage={'hvy.PNG'} />
        {
          events && <>
            <div className='block lg:hidden'><UpcomingTournamentsSectionSmall events={events}/></div>
            <div className='hidden lg:block'><UpcomingTournamentsSectionBig events={events}/></div>
          </>
        }

        <WinningDecksSection/>

        {creators?.map(creator => <ContentCreatorSection creator={creator}/>)}
        
      </div>
    </main>
  )
}
