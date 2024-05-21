'use client'
import MatchSearchForm from "./matchSearchForm"
import { useState, useEffect } from "react"
import { matchSchemaType } from '@/app/types/types'
import MatchThumbnail from "../helperComponents/MatchThumbnail"
import { toast } from "react-toastify"
import { errorSchema, matchSchema } from '@/app/schemas/schemas'
import { z } from "zod"
import { useSearchParams } from 'next/navigation'
import PaginationButton from "../helperComponents/PaginationButton"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const responseSchema = z.object({
  count: z.number(),
  matches: z.array(matchSchema),
})

const limit = 60

function matches() {
  const [matches, setMatches] = useState<matchSchemaType[] | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const searchParams = useSearchParams()

  useEffect(() => {
    if(searchParams.get('query') === 'true'){
      const url = `http://localhost:5000/api/matches?` + new URLSearchParams(searchParams.toString() + `&limit=${limit}` ).toString()
      fetch(url)
      .then(r => r.json())
      .then(data => {
        const validatedData = responseSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          setMatches(validatedData.data.matches)
          setCount(validatedData.data.count)
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
    }

  }, [searchParams])

  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px] gap-[48px] pt-[32px]">

      {/* title */}
      <div className="text-[33px] md:text-[68px] font-bold flex flex-row items-center gap-[12px] md:gap-[24px] relative">
        <FontAwesomeIcon icon={faEye} />
        <div>Eye Of Ophidia</div>
        <div className="absolute text-[19px] md:text-[39px] underline right-[8px] md:right-[16px] bottom-[-14px] md:bottom-[-20px]">Matches</div>
      </div>

      <MatchSearchForm/>
      
      {/* matches container */}

      <div className="flex flex-row flex-wrap gap-[24px] justify-center">
        {matches && matches.map(match => 
          <MatchThumbnail match={match} key={match._id}/>
        )}
        {(count===0) && <div>No Matches Found :{'('}</div>}
      </div>

      {/* pagination */}

      {(count && count>0) && 
        <div className="flex flex-row gap-[8px] flex-wrap justify-center w-[75%]">
          {count && Array.from(Array(Math.floor(count/limit + 1)), (_, i) => <>
            <PaginationButton page={i}/>
          </>)}
        </div>
      }
      
    </div>
  )
}
export default matches