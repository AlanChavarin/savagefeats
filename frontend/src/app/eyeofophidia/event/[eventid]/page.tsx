'use client'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { errorSchema, matchSchema, eventSchema, decklistSchema } from '@/app/schemas/schemas'
import { matchSchemaType, eventSchemaType, decklistSchemaType } from "@/app/types/types"
import EventThumbnail from "../../helperComponents/EventThumbnail"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"


function page({params}: {params: {eventid: string}}) {
  const [event, setEvent] = useState<eventSchemaType | undefined>(undefined)
  const [matches, setMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const [decklists, setDecklists] = useState<decklistSchemaType[] | undefined>(undefined)
  const { eventid } = params
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/${eventid}`)
    .then(r => r.json())
    .then(data => {
      const validatedEventData = eventSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedEventData.success){
        setEvent(validatedEventData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedEventData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}matches/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      const validatedMatchData = z.array(matchSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedMatchData.success){
        setMatches(validatedMatchData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedMatchData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      const validatedDecklistData = z.array(decklistSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedDecklistData.success){
        setDecklists(validatedDecklistData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedDecklistData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

  }, [params])


  return (
    <div className="justify-start items-center flex flex-1 flex-col gap-[32px] pb-[64px]">
        {event && <>

            <EventThumbnail size="eventPage" event={event} />

            {/* <div className="text-[39px] font-bold">Matches:</div>  */}

          

            {event.dayRoundArr && event.endDate ? 
                <>
                    {event.dayRoundArr.map((num, i, arr) => <>
                        <div className="text-[30px] md:text-[39px] font-bold">Day {i+1}:</div>
                        <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                        <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                            {/* @ts-ignore */}
                            {matches && matches.slice((arr[i-1] ? arr[i-1] : 0), num).map(match => 
                                <MatchThumbnail match={match} key={match._id}/>
                            )}
                        </div>
                    </>)}
                    <div className="text-[30px] md:text-[39px] font-bold">Top Cut:</div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                    <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                        {matches && matches.filter(match => (match.top8===true)).map(match => 
                            <MatchThumbnail match={match} key={match._id}/>
                        )}
                    </div>
                </>
                :
                <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                    {matches && matches.map(match => 
                        <MatchThumbnail match={match} key={match._id}/>
                    )}
                </div>
            }


            <div className="grid grid-col-2 gap-[24px] justify-center">
                
                {decklists && <>
                    {decklists.length > 0 && <div className="text-[39px] font-bold">Decklists</div>} 
                    {decklists.map(decklist => 
                        <DeckThumbnail decklist={decklist} size={'matchPage'} key={decklist._id}/>
                    )}
                </>}
            </div>

        </>}
    </div>
  )
}
export default page