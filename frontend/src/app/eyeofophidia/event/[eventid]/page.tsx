'use client'
import { toast } from "react-toastify"
import { errorSchema, matchSchema, eventSchema, deckSchema, draftSchema } from '@/app/schemas/schemas'
import { matchSchemaType, eventSchemaType, deckSchemaType, draftSchemaType } from "@/app/types/types"
import EventThumbnail from "../../helperComponents/eventThumbnail/EventThumbnail"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"
import { useState, useEffect } from "react"
import { calculateLastFormat, calculateLastRound, calculateLastTwitch } from "../../helpers/LastHelpers"
import filter from "../../helpers/filterHelper"
import DraftThumbnail from "../../helperComponents/DraftThumbnail"

function Event({params}: {params: {eventid: string}}) {
  const [event, setEvent] = useState<eventSchemaType | undefined>(undefined)
  const [matches, setMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const [decks, setDecks] = useState<deckSchemaType[] | undefined>(undefined)
  const [drafts, setDrafts] = useState<draftSchemaType[] | undefined>(undefined)
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

      console.error(validatedEventData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}matches/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      //console.log(data)
      const validatedMatchData = z.array(matchSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedMatchData.success){
        setMatches(validatedMatchData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedMatchData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}drafts/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      const validatedDraftData = z.array(draftSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedDraftData.success){
        setDrafts(validatedDraftData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedDraftData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      //console.log(data)
      const validatedDecklistData = z.array(deckSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedDecklistData.success){
        setDecks(validatedDecklistData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedDecklistData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

  }, [params])

  return (
    <div className="justify-start items-center flex flex-1 flex-col gap-[32px] pb-[64px]">
        {event && <>

            <EventThumbnail size="eventPage" event={event} lastRound={calculateLastRound(matches)} lastFormat={calculateLastFormat(matches)} lastTwitch={calculateLastTwitch(matches)}/>

            {/* <div className="text-[39px] font-bold">Matches:</div>  */}

            {event.liveStream && (!matches || matches.length === 0) && !event.twitch &&
              <div className="w-[660px] h-[360px]">
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${event.liveStream}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            }

            {event.liveStream && (!matches || matches.length === 0) && event.twitch &&
              <div className="w-[660px] h-[360px]">
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://player.twitch.tv/?video=${event.liveStream}&parent=${process.env.NODE_ENV==='production' ? 'www.eyeofophidia.net' : 'localhost'}`}></iframe>
                </div>
              </div>
            }

            

            {event.dayRoundArr && event.endDate ? 
                <>
                    {event.dayRoundArr.map((_, i) => 
                      <>
                        <div className="text-[30px] md:text-[39px] font-bold">Day {i+1}:</div>
                        <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                        <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                            {matches && matches.filter(match => filter(match, i, event))
                                .map(match => (
                                  <MatchThumbnail key={match._id} match={match}/>
                                ))}
                            {matches && (matches.filter(match => filter(match, i, event)).length < 1) && <>No Vods Available :{'('}</>}
                        </div>
                      </>
                    )}

                    <div className="text-[30px] md:text-[39px] font-bold">Top Cut:</div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                    <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                        {matches && matches.filter(match => (match.top8===true)).map(match => 
                            <MatchThumbnail match={match} key={match._id}/>
                        )}
                    </div>
                </>
                :
                <>
                  {(matches && matches.filter(match => !match.top8).length > 0) && <>
                    <div className="text-[30px] md:text-[39px] font-bold">Swiss</div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                  </>}
                  <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                      {matches && matches.filter(match => !match.top8).map(match => 
                          <MatchThumbnail match={match} key={match._id}/>
                      )}
                  </div>

                  {(matches && matches.filter(match => match.top8).length > 0) && <>
                    <div className="text-[30px] md:text-[39px] font-bold">Top Cut</div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                  </>}

                  <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                      {matches && matches.filter(match => match.top8).map(match => 
                          <MatchThumbnail match={match} key={match._id}/>
                      )}
                  </div>
                </>
            }

            {decks && decks.length > 0 && <>
              <div className="text-[39px] font-bold text-center">Decklists</div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </>} 

            <div className="grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-[24px] w-[90%] md:w-fit">
                {decks && <>
                    {decks.map(deck => 
                        <DeckThumbnail deck={deck} size={'normal'} key={deck._id}/>
                    )}
                </>}
            </div>

            
            {(drafts && drafts.length > 0) && 
              <>
                <div className="text-[39px] font-bold text-center">Draft</div>
                <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
              </>
            }
            
            {drafts && drafts.map(draft => <DraftThumbnail draft={draft} key={draft._id}/>)}

            {decks && decks.length > 0 && <>
              <div className="text-[39px] font-bold text-center">Related Content</div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </>} 

            <div className={`grid grid-cols-1 lg:grid-cols-${decks?.filter(deck => deck.deckTech).length === 1 ? '1' : '2'} flex-wrap gap-[24px] w-[90%] md:w-fit`}>
                {decks && <>
                  {decks.filter(deck => deck.deckTech).map(deck => 
                      <div className="w-[330px] h-[180px]">
                        <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                          <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${deck.deckTech}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                      </div>
                  )}
                </>}
            </div>

        </>}
    </div>
  )
}
export default Event