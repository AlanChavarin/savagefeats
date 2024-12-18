'use client'
import { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify"
import { errorSchema, matchSchema, deckSchema } from '@/app/schemas/schemas'
import { matchSchemaType } from "@/app/types/types"
import EventThumbnailNormal from "../../helperComponents/eventThumbnail/EventThumbnailNormal"
import DeckThumbnail from "../../helperComponents/DeckThumbnail"
import { z } from "zod"
import MatchThumbnail from "../../helperComponents/MatchThumbnail"
import UserContext from "@/context/UserContext"
import EditButton from "../../helperComponents/EditButton"
import { Hourglass } from 'react-loader-spinner'


function Match({params}: {params: {matchid: string}}) {
  const [match, setMatch] = useState<matchSchemaType | undefined>(undefined)
  const [relatedMatches, setRelatedMatches] = useState<matchSchemaType[] | undefined>(undefined)
  const { matchid } = params
  const [loading, setLoading] = useState(true)

  const {user} = useContext(UserContext)
 
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/${matchid}?&includeRelatedMatches=true`
    fetch(url)
    .then(r => r.json())
    .then(data => {
      const validatedData = matchSchema.safeParse(data)
      const validatedRelatedMatches = z.array(matchSchema).safeParse(data.relatedMatches)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setMatch(validatedData.data)
        if(validatedRelatedMatches.success){
          setRelatedMatches(validatedRelatedMatches.data)
        }
        setLoading(false)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      setLoading(false)
      toast.error(err.message)
    })
  }, [params])


  return (
    <div className="w-[100%] justify-center flex flex-1 relative">

      {loading && <div className="absolute top-[25%]"><Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        /></div>}


      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start lg:justify-self-center gap-[24px] md:p-[24px] max-w-[1800px] mb-[128px]">
        {/* video container */}
        <div className="flex-1 w-[100%]">
          <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
            {(match && !match.twitch) && 
              <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${match.link}?start=${match.timeStamp===0 ? 1 : match.timeStamp}&rel=0`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            }

            {(match && match.twitch) && 
              <iframe className="absolute w-[100%] h-[100%]" src={`https://player.twitch.tv/?video=${match.link}&time=${match.twitchTimeStamp ? match.twitchTimeStamp : '1s'}&parent=${process.env.NODE_ENV==='production' ? 'www.savagefeats.com' : 'localhost'}`}></iframe>
            }
          </div>
        </div>

        
        
        {/* details container */}
        {match && <div className="w-[90%] flex flex-col gap-[32px] max-w-[400px]">

            <EventThumbnailNormal event={match.event} size={"matchPage"} />

            { user &&
              <div className="flex flex-row items-center gap-[12px]">
                <div>Admin Tools: </div>
                <EditButton text="Edit Match" link={`/eyeofophidia/postmatch?&matchid=${match._id}`}/>
              </div>
            }

            {/* <div className="text-[23px] font-bold flex flex-row justify-center">
              {match.top8 ?
                <>{match.top8Round}</>
                :
                <>Round: {match.swissRound}</>
              }
            </div> */}

            <div className="text-[23px] font-bold">Current Match: </div>

            <MatchThumbnail key={match._id} match={match} maxWidth={true} />


            {(match.player1deckData || match.player2deckData) && <div className="text-[23px] font-bold">Decklists: </div>}
            {match.player1deckData && <DeckThumbnail size="matchPage" deck={match.player1deckData}/>}
            {match.player2deckData && <DeckThumbnail size="matchPage" deck={match.player2deckData}/>}

            <div className="text-[23px] font-bold">More Matches: </div>

            {relatedMatches && 
              <>
                {relatedMatches.map(match => <MatchThumbnail key={match._id} match={match} maxWidth={true} />)}
              </>
            }

            <div className="text-[23px] font-bold">Related Content: </div>

            {match.player1deckData?.deckTech && 
              <>
                {/* video container */}
                <div className="flex-1 w-[100%]">
                  <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                    <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${match.player1deckData.deckTech}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  </div>
                </div>
              </>
            }

            {match.player2deckData?.deckTech && 
              <>
                {/* video container */}
                <div className="flex-1 w-[100%]">
                  <div className="relative w-[100%] pb-[56.25%] h-[0%] box-shadow">
                    <iframe className="absolute w-[100%] h-[100%]" src={`https://www.youtube-nocookie.com/embed/${match.player2deckData.deckTech}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                  </div>
                </div>
              </>
            }

            {!(match.player1deckData || match.player2deckData) && <div className="text-[16px] text-gray-400">Decklists Unavailable</div>}

          </div>}
      </div>
    </div>
  )
}
export default Match