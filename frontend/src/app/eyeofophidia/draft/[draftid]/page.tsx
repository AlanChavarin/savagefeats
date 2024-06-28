'use client'
import { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify"
import { errorSchema, matchSchema, draftSchema } from '@/app/schemas/schemas'
import { draftSchemaType, matchSchemaType } from "@/app/types/types"
import EventThumbnail from "../../helperComponents/eventThumbnail/EventThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"
import UserContext from "@/context/UserContext"
import EditButton from "../../helperComponents/EditButton"

function Draft({params}: {params: {draftid: string}}) {
  const [draft, setDraft] = useState<draftSchemaType | undefined>(undefined)
  const [relatedMatches, setRelatedMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const { draftid } = params

  const {user} = useContext(UserContext)
 
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}drafts/${draftid}?&includeRelatedMatches=true`
    fetch(url)
    .then(r => r.json())
    .then(data => {
      const validatedData = draftSchema.safeParse(data)
      const validatedRelatedMatches = z.array(matchSchema).safeParse(data.relatedMatches)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setDraft(validatedData.data)
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
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start lg:justify-self-center gap-[24px] md:p-[24px] max-w-[1800px] mb-[128px]">
        {/* video container */}
        <div className="flex-1 w-[100%]">
          <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
            {(draft && !draft.twitch) && 
              <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${draft.link}?start=${draft.timeStamp===0 ? 1 : draft.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            }

            {(draft && draft.twitch) && 
              <iframe className="absolute w-[100%] h-[100%]" src={`https://player.twitch.tv/?video=${draft.link}&time=${draft.twitchTimeStamp ? draft.twitchTimeStamp : '1s'}&parent=${process.env.NODE_ENV==='production' ? 'www.eyeofophidia.net' : 'localhost'}`}></iframe>
            }
          </div>
        </div>
        
        {/* details container */}
        {draft && <div className="w-[90%] flex flex-col gap-[32px] max-w-[400px]">

            <EventThumbnail event={draft.event} size={"matchPage"} />

            { user &&
              <div className="flex flex-row items-center gap-[12px]">
                <div>Admin Tools: </div>
                <EditButton text="Edit Draft" link={`/eyeofophidia/postdraft?&draftid=${draft._id}`}/>
              </div>
            }

            <div className="text-[23px] font-bold flex flex-row justify-center">
              {draft.top8 ?
                <>{draft.top8 && "Top 8 Draft"}</>
                :
                <>Draft Before Round: {draft.swissRound}</>
              }
            </div>

            <div className="text-[23px] font-bold">Related Matches: </div>

            {relatedMatches && 
              <>
                {relatedMatches.map(match => <MatchThumbnail key={match._id} match={match} maxWidth={true} />)}
              </>
            }

          </div>}
      </div>
    </div>
  )
}
export default Draft