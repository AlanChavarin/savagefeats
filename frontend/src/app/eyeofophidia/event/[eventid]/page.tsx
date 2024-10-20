'use client'
import { toast } from "react-toastify"
import { errorSchema, matchSchema, eventSchema, deckSchema, draftSchema, contentSchema, generalEventSectionSchema } from '@/app/schemas/schemas'
import { matchSchemaType, eventSchemaType, deckSchemaType, draftSchemaType, contentSchemaType, generalEventSectionSchemaType } from "@/app/types/types"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"
import { useState, useEffect } from "react"
import { calculateLastFormat, calculateLastRound, calculateLastTwitch } from "../../helpers/LastHelpers"
import DraftThumbnail from "../../helperComponents/DraftThumbnail"
import { Hourglass } from 'react-loader-spinner'
import EventThumbnailEventPage from "../../helperComponents/eventThumbnail/EventThumbnailEventPage"
import Link from "next/link"
import GeneralEventSection from "../../helperComponents/GeneralEventSection"

const responseSchema = z.object({
  event: eventSchema.optional(),
  matches: z.array(z.array(matchSchema)).optional(),
  decklists: z.array(deckSchema).optional(),
  drafts: z.array(z.array(draftSchema)).optional(),
  liveContent: z.array(contentSchema).optional(),
  deckTech: z.array(contentSchema).optional(),
  generalEventSections: z.array(generalEventSectionSchema).optional()
})

function Event({params}: {params: {eventid: string}}) {
  const [event, setEvent] = useState<eventSchemaType | undefined>(undefined)
  const [matches, setMatches] = useState<matchSchemaType[][] | undefined>(undefined)
  const [decks, setDecks] = useState<deckSchemaType[] | undefined>(undefined)
  const [drafts, setDrafts] = useState<draftSchemaType[][] | undefined>(undefined)
  const [liveContent, setLiveContent] = useState<contentSchemaType[] | undefined>(undefined)
  const [deckTechs, setDeckTechs] = useState<contentSchemaType[] | undefined>(undefined)
  const [generalEventSections, setGeneralEventSections] = useState<generalEventSectionSchemaType[] | undefined>(undefined)
  const { eventid } = params

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/getEventPageData/${eventid}`)
    .then(r => r.json())
    .then(data => {
      const validatedEventData = responseSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedEventData.success){
        setEvent(validatedEventData.data.event)
        setMatches(validatedEventData.data.matches)
        setDecks(validatedEventData.data.decklists)
        setDrafts(validatedEventData.data.drafts)
        setLiveContent(validatedEventData.data.liveContent)
        setDeckTechs(validatedEventData.data.deckTech)
        setGeneralEventSections(validatedEventData.data.generalEventSections)
        setLoading(false)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedEventData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(false)
      toast.error(err.message)
    })
  }, [params])
  

  return (
    <div className="justify-start items-center flex flex-1 flex-col gap-[16px] sm:gap-[24px] pb-[64px]">

        {loading && <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        />}

        {event && <>
            <EventThumbnailEventPage event={event} lastRound={calculateLastRound(matches?.flat())} lastFormat={calculateLastFormat(matches?.flat())} lastTwitch={calculateLastTwitch(matches?.flat())}/>

            {/* <div className="text-[39px] font-bold">Matches:</div>  */}

            {liveContent?.map(content => 
              <div className="flex-1 w-[100%] max-w-[700px]" key={content._id}>
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${content.videoid}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
              </div>
            )}


            {event.liveStream && (!matches || matches.flat.length === 0) && event.twitch &&
              <div className="flex-1 w-[100%] max-w-[700px]">
                <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                  <iframe className="absolute w-[100%] h-[100%]" src={`https://player.twitch.tv/?channel=${event.liveStream}&parent=${process.env.NODE_ENV==='production' ? 'www.savagefeats.com' : 'localhost'}`}></iframe>
                </div>
              </div>
            }

            {event.liveStream && event.streamed && (!matches || matches.flat.length === 0) && !event.twitch &&
              <Link href={event.liveStream} target="_blank" className="relative h-[200px] sm:h-[250px] w-[90%] max-w-[400px] md:w-[400px] flex flex-col justify-start items-center box-shadow text-white text-shadow-small hover:cursor-pointer font-bold" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('/fab_live_stream.webp')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>
              <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[14px] sm:text-[16px] flex justify-center items-center z-[1] pointer-events-none'>
                Stream Link</div>
      
              {/* absolute positioned elements */}
              <div className="absolute w-[100%] h-[100%] bg-black opacity-[30%] hover:opacity-[50%]"></div>
              
            </Link>
            }

            {matches?.map((matchArray, day) => 
              <div className="flex flex-col items-center gap-[24px]" key={day}>
                <div className="text-[30px] md:text-[39px] font-bold">
                  {matches.length === day+1 ? <>Top Cut:</> : <>Day {day+1}:</>}                          
                </div>
                <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>

                <div className="flex flex-row flex-wrap gap-[24px] justify-center w-full">
                  { drafts && drafts[day]?.map(draft => <DraftThumbnail draft={draft} key={draft._id} />)}
                </div>

                <div className="flex flex-row flex-wrap gap-[24px] justify-center" >
                    {matchArray && matchArray.map(match => <MatchThumbnail key={match._id} match={match}/>)}
                    {matchArray.length === 0 && <>No Vods Available :{'('}</>}
                </div>
              </div>
            )}


            {generalEventSections && generalEventSections.length > 0 && <div className="flex flex-col items-center w-[95%] max-w-[1050px] gap-[18px] md:gap-[24px]">
              {generalEventSections.map(generalEventSection => <GeneralEventSection eventName={event.name} generalEventSection={generalEventSection} key={generalEventSection._id}/>)}
            </div>}

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

            {deckTechs && deckTechs.length > 0 && <>
              <div className="text-[39px] font-bold text-center">Related Content</div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </>} 

            <div className={`grid grid-cols-1 lg:grid-cols-${(deckTechs && deckTechs.length === 1) ? '1' : '2'} flex-wrap gap-[24px] w-[90%] md:w-fit`}>
              {deckTechs && deckTechs.map(deckTech => 
                <div className="w-[330px] h-[180px]" key={deckTech._id}>
                  <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                    <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${deckTech.videoid}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  </div>
                </div>
              )}
            </div>

        </>}
    </div>
  )
}
export default Event