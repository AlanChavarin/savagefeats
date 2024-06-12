'use client'
import HomepageHero from "@/HomepageComponents/HomepageHero"
import UpcomingTournamentsSectionBig from "@/HomepageComponents/UpcomingTournamentsSectionBig"
import UpcomingTournamentsSectionSmall from "@/HomepageComponents/UpcomingTournamentsSectionSmall"
import WinningDecksSectionSmall from "@/HomepageComponents/WinningDecksSectionSmall"
import WinningDecksSectionBig from "@/HomepageComponents/WinningDecksSectionBig"
// import ContentCreatorSectionSmall from "@/HomepageComponents/ContentCreatorSectionSmall"
// import ContentCreatorSectionBig from "@/HomepageComponents/ContentCreatorSectionBig"
import YoutubeVideoCarousel from "@/HomepageComponents/YoutubeVideoCarousel"
import { getYoutubeIds } from "@/HomepageComponents/helpers/getYoutubeIds"
import { getChannelData } from "@/HomepageComponents/helpers/getChannelData"

import { useEffect, useState } from "react"
import { eventSchema, errorSchema, deckSchema, contentCreatorSchema } from "@/app/schemas/schemas"
import { eventSchemaType, deckSchemaType, contentCreatorSchemaType } from "@/app/types/types"
import { z } from "zod"
import { toast } from "react-toastify"
import ContentCreatorSection from "@/HomepageComponents/ContentCreatorSection"

const responseEventSchema = z.object({
  count: z.number(),
  events: z.array(eventSchema),
})

const responseDeckSchema = z.object({
  count: z.number(),
  decklists: z.array(deckSchema),
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

    //grab latest decks
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&limit=20`)
    .then(r => r.json())
    .then(data => {
      const validatedData = responseDeckSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setDecks(validatedData.data.decklists)
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
        <YoutubeVideoCarousel youtubeIDs={['ZKxA3LAZybw', 'IjG3XpmLWCs', 'R2p1qSTQOck', 'zxCaHNrpHLE', 'G_Pp41Enahw']} backgroundImage={'hvy.PNG'}>
          <div className='text-[11px] md:text-[16px] lg:text-[19px] lg:my-[32px] xl:text-[27px] text-white foulfiend text-shadow'>
            The Latest in Flesh and Blood
          </div>
        </YoutubeVideoCarousel>

        {
          events && <>
            <div className='block lg:hidden'><UpcomingTournamentsSectionSmall events={events}/></div>
            <div className='hidden lg:block'><UpcomingTournamentsSectionBig events={events}/></div>
          </>
        }

        {
          decks && <>
            <div className='block lg:hidden'><WinningDecksSectionSmall decks={decks}/></div>
            <div className='hidden lg:block'><WinningDecksSectionBig decks={decks}/></div>
          </>
        }

        {creators?.map(creator => <ContentCreatorSection creator={creator}/>)}

        {/* { (youtubeIds1) && <>
          <div className='block lg:hidden'><ContentCreatorSectionSmall youtubeIds={youtubeIds1} channelName="Savage Lands News"/></div>
          <div className='hidden lg:block'><ContentCreatorSectionBig  youtubeIds={youtubeIds1} channelName="Savage Lands News"/></div>
          </>
        }

        { (youtubeIds2) && <>
          <div className='block lg:hidden'><ContentCreatorSectionSmall youtubeIds={youtubeIds2} channelName="Mansant"/></div>
          <div className='hidden lg:block'><ContentCreatorSectionBig  youtubeIds={youtubeIds2} channelName="Mansant"/></div>
          </>
        } */}

        {/* <div className='block lg:hidden'><ContentCreatorSectionSmall channelId="UCI5yJdQ4y8r_3J9JCiyHIzQ"/></div>
        <div className='hidden lg:block'><ContentCreatorSectionBig  channelId="UCI5yJdQ4y8r_3J9JCiyHIzQ"/></div> */}
        
      </div>
    </main>
  )
}
