'use client'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { errorSchema, matchSchema } from '@/app/schemas/schemas'
import { matchSchemaType } from "@/app/types/types"
import EventThumbnail from "../../helperComponents/EventThumbnail"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"


function page({params}: {params: {matchid: string}}) {
  const [match, setMatch] = useState<matchSchemaType | undefined>(undefined)
  const [relatedMatches, setRelatedMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const { matchid } = params
 
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/${matchid}?&includeRelatedMatches=true`
    fetch(url)
    .then(r => r.json())
    .then(data => {
      const validatedData = matchSchema.safeParse(data)
      const validatedRelatedMatches = z.array(matchSchema).safeParse(data.relatedMatches)
      console.log(validatedRelatedMatches.data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setMatch(validatedData.data)
        if(validatedRelatedMatches.success){
          setRelatedMatches(validatedRelatedMatches.data)
        }
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

  }, [params])


  return (
    <div className="w-[100%] justify-center flex flex-1">
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start lg:justify-self-center gap-[24px] p-[24px] max-w-[1800px] mb-[128px]">
        {/* video container */}
        <div className="flex-1 w-[100%]">
          <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
            {(match && !match.twitch) && 
              <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${match.link}?start=${match.timeStamp===0 ? 1 : match.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            }

            {(match && match.twitch) && 
              <iframe src={`https://player.twitch.tv/?video=${match.link}&time=${match.twitchTimeStamp ? match.twitchTimeStamp : '1s'}&parent=${process.env.NODE_ENV==='production' ? 'www.eyeofophidia.net' : 'localhost'}`}></iframe>
            }
          </div>
        </div>
        
        {/* details container */}
        {match && <div className="w-[90%] flex flex-col gap-[32px] max-w-[400px]">

            <EventThumbnail event={match.event} size={"matchPage"} />

            <div className="text-[23px] font-bold">Decklists: </div>

            <DeckThumbnail size="matchPage" />
            <DeckThumbnail size="matchPage" />

            <div className="text-[23px] font-bold">More Matches: </div>

            {relatedMatches && 
              <>
                {relatedMatches.map(match => <MatchThumbnail match={match} maxWidth={true}/>)}
              </>
            }

          </div>}
      </div>
    </div>
  )
}
export default page