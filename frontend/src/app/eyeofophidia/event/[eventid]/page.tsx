'use client'
import { toast } from "react-toastify"
import { errorSchema, matchSchema, eventSchema, deckSchema, draftSchema, contentSchema } from '@/app/schemas/schemas'
import { matchSchemaType, eventSchemaType, deckSchemaType, draftSchemaType, contentSchemaType } from "@/app/types/types"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"
import { useState, useEffect } from "react"
import { calculateLastFormat, calculateLastRound, calculateLastTwitch } from "../../helpers/LastHelpers"
import filter from "../../helpers/filterHelper"
import DraftThumbnail from "../../helperComponents/DraftThumbnail"
import { Hourglass } from 'react-loader-spinner'
import EventThumbnailEventPage from "../../helperComponents/eventThumbnail/EventThumbnailEventPage"
import { draftFilterSwiss } from "./draftFilter"


function Event({params}: {params: {eventid: string}}) {
  const [event, setEvent] = useState<eventSchemaType | undefined>(undefined)
  const [matches, setMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const [decks, setDecks] = useState<deckSchemaType[] | undefined>(undefined)
  const [drafts, setDrafts] = useState<draftSchemaType[] | undefined>(undefined)
  const [liveContent, setLiveContent] = useState<contentSchemaType[] | undefined>(undefined)
  const { eventid } = params

  const [loading, setLoading] = useState({
    event: true,
    matches: true,
    drafts: true,
    decks: true,
    content: true,
  })
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/${eventid}`)
    .then(r => r.json())
    .then(data => {
      const validatedEventData = eventSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedEventData.success){
        setEvent(validatedEventData.data)
        setLoading(prev => ({...prev, event: false}))
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedEventData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(prev => ({...prev, event: false}))
      toast.error(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}matches/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      //console.log(data)
      const validatedMatchData = z.array(matchSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedMatchData.success){
        setMatches(validatedMatchData.data)
        setLoading(prev => ({...prev, matches: false}))
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedMatchData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(prev => ({...prev, matches: false}))
      toast.error(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}drafts/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      const validatedDraftData = z.array(draftSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedDraftData.success){
        setDrafts(validatedDraftData.data)
        setLoading(prev => ({...prev, drafts: false}))
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedDraftData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(prev => ({...prev, drafts: false}))
      toast.error(err.message)
    })

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      //console.log(data)
      const validatedDecklistData = z.array(deckSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedDecklistData.success){
        setDecks(validatedDecklistData.data)
        setLoading(prev => ({...prev, decks: false}))
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedDecklistData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(prev => ({...prev, decks: false}))
      toast.error(err.message)
    })

    // get live content

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/byevent/${eventid}`)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      const validatedContentData = z.array(contentSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedContentData.success){
        setLiveContent(validatedContentData.data)
        setLoading(prev => ({...prev, content: false}))
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedContentData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(prev => ({...prev, content: false}))
      toast.error(err.message)
    })

  }, [params])
  

  return (
    <div className="justify-start items-center flex flex-1 flex-col gap-[16px] sm:gap-[24px] pb-[64px]">

        {loading.event && <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        />}

        {event && <>
            <EventThumbnailEventPage event={event} lastRound={calculateLastRound(matches)} lastFormat={calculateLastFormat(matches)} lastTwitch={calculateLastTwitch(matches)}/>

            {/* <div className="text-[39px] font-bold">Matches:</div>  */}


            {event.liveBroadcastContent !== 'none' && liveContent?.map(content => 
              <div className="flex-1 w-[100%] max-w-[700px]" key={content._id}>
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${content.videoid}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            )}

            {/* {event.liveStream && (!matches || matches.length === 0) && !event.liveStream.startsWith('http') && !event.twitch &&
              <div className="flex-1 w-[100%] max-w-[700px]">
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${event.liveStream}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            } */}

            

            {/* {event.liveStream && (!matches || matches.length === 0) && event.liveStream.startsWith('http') && !event.twitch &&
              <a href={event.liveStream} target="_blank" className="hover:text-purple-500 underline font-bold text-[19px]">Event will be streamed here</a>
            } */}


            {event.liveStream && (!matches || matches.length === 0) && event.twitch &&
              <div className="flex-1 w-[100%]">
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://player.twitch.tv/?channel=${event.liveStream}&parent=${process.env.NODE_ENV==='production' ? 'www.savagefeats.com' : 'localhost'}`}></iframe>
                </div>
              </div>
            }


          {loading.matches && <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['Black', 'Black']}
          />}

            {event.dayRoundArr && event.endDate ? 
                <>
                    {event.dayRoundArr.map((day, i) => 
                      <div className="flex flex-col items-center gap-[24px]" key={day}>
                        <div className="text-[30px] md:text-[39px] font-bold" >Day {i+1}:</div>
                        <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>

                        <div className="flex flex-row flex-wrap gap-[24px] justify-center w-full">
                          {/* 
                            // @ts-ignore */}
                          {drafts && drafts.filter(draft => day && event.dayRoundArr && draftFilterSwiss(draft, day, i, event.dayRoundArr)).map(draft => <DraftThumbnail draft={draft} key={draft._id}/>)}
                        </div>

                        <div className="flex flex-row flex-wrap gap-[24px] justify-center" >
                            
                            {matches && matches.filter(match => filter(match, i, event)).map(match => (<MatchThumbnail key={match._id} match={match}/>))}
                            {matches && (matches.filter(match => filter(match, i, event)).length < 1) && <>No Vods Available :{'('}</>}
                        </div>
                      </div>
                    )}

                    <div className="text-[30px] md:text-[39px] font-bold">Top Cut:</div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                    <div className="flex flex-row flex-wrap gap-[24px] justify-center w-full">
                      {drafts && drafts.filter(draft => draft.top8).map(draft => <DraftThumbnail draft={draft} key={draft._id}/>)}
                    </div>
                    <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                        {matches && matches.filter(match => (match.top8===true)).map(match => 
                            <MatchThumbnail match={match} key={match._id}/>
                        )}
                    </div>
                </>
                :
                <>
                  {(matches && matches.filter(match => !match.top8).length > 0) && <>
                    <div className="text-[30px] md:text-[39px] font-bold">Swiss: </div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                  </>}
                  <div className="flex flex-row flex-wrap gap-[24px] justify-center w-full">
                    {drafts && drafts.filter(draft => !draft.top8).map(draft => 
                    <DraftThumbnail draft={draft} key={draft._id}/>)}
                  </div>
                  <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                      {matches && matches.filter(match => !match.top8).map(match => 
                          <MatchThumbnail match={match} key={match._id}/>
                      )}
                  </div>

                  {(matches && matches.filter(match => match.top8).length > 0) && <>
                    <div className="text-[30px] md:text-[39px] font-bold">Top Cut: </div>
                    <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
                  </>}

                  <div className="flex flex-row flex-wrap gap-[24px] justify-center w-full">
                    {drafts && drafts.filter(draft => draft.top8).map(draft => 
                    <DraftThumbnail draft={draft} key={draft._id}/>)}
                  </div>

                  <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                      {matches && matches.filter(match => match.top8).map(match => 
                          <MatchThumbnail match={match} key={match._id}/>
                      )}
                  </div>
                </>
            }


            {loading.decks && <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={['Black', 'Black']}
            />}

            {decks && decks.length > 0 && <>
              <div className="text-[39px] font-bold text-center">Decklists</div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </>} 

            <div className="grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-[24px] w-[90%] justify-items-center max-w-[1050px]">
                {decks && <>
                    {decks.map(deck => 
                        <DeckThumbnail deck={deck} size={'normal'} key={deck._id}/>
                    )}
                </>}
            </div>

            
            {/* {(drafts && drafts.filter(draft => draft.top8).length > 0) && 
              <>
                <div className="text-[39px] font-bold text-center">Draft</div>
                <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
              </>
            } */}
            
            {/* {drafts && drafts.filter(draft => draft.top8).map(draft => <DraftThumbnail draft={draft} key={draft._id}/>)} */}

            {decks && decks.length > 0 && decks?.filter(deck => deck.deckTech).length > 0 && <>
              <div className="text-[39px] font-bold text-center">Related Content</div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </>} 

            <div className={`grid grid-cols-1 lg:grid-cols-${decks?.filter(deck => deck.deckTech).length === 1 ? '1' : '2'} flex-wrap gap-[24px] w-[90%] md:w-fit`}>
                {decks && <>
                  {decks.filter(deck => deck.deckTech).map(deck => 
                      <div className="w-[330px] h-[180px]" key={deck._id}>
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