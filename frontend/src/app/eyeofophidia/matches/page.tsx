'use client'
import MatchSearchForm from "./MatchSearchForm"
import { useState, useEffect } from "react"
import { matchSchemaType } from '@/app/types/types'
import MatchThumbnail from "../helperComponents/MatchThumbnail"
import { toast } from "react-toastify"
import { errorSchema, matchSchema } from '@/app/schemas/schemas'
import { z } from "zod"
import { useSearchParams } from 'next/navigation'
import Title from "../helperComponents/Title"
import Pagination from "../helperComponents/Pagination"

const responseSchema = z.object({
  count: z.number(),
  matches: z.array(matchSchema),
})

const limit = 60

function Matches() {
  const [matches, setMatches] = useState<matchSchemaType[] | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const searchParams = useSearchParams()
  
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    if(searchParams.get('query') === 'true'){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches?` + new URLSearchParams(searchParams.toString() + `&limit=${limit}` ).toString()
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
        toast.error(err.message)
      })
    }

    setLoading(false)
  }, [searchParams])


  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px] gap-[48px] pt-[32px]">

      {/* title */}
      <Title subheader="Matches" />

      <MatchSearchForm/>

      {loading && <div>Loading....</div>}
      
      {/* matches container */}


      {!loading && <div className="flex flex-row flex-wrap gap-[24px] justify-center">
        {matches && matches.map(match => 
          <MatchThumbnail match={match} key={match._id}/>
        )}
        {(count===0) && <div>No Matches Found :{'('}</div>}
      </div>}

      {/* pagination */}

      <Pagination count={count} limit={limit}/>
      
    </div>
  )
}
export default Matches