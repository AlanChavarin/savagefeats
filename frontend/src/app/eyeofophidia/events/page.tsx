'use client'
import Title from "../helperComponents/Title"
import EventSearchForm from "./EventSearchForm"
import { useState, useEffect } from "react"
import { eventSchemaType } from "@/app/types/types"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { eventSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import Pagination from "../helperComponents/Pagination"
import EventThumbnail from "../helperComponents/EventThumbnail"

const responseSchema = z.object({
  count: z.number(),
  events: z.array(eventSchema),
})

const limit = 40

function Events() {

  const [events, setEvents] = useState<eventSchemaType[] | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const searchParams = useSearchParams()

  useEffect(() => {
    if(searchParams.get('query') === 'true'){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events?` + new URLSearchParams(searchParams.toString() + `&limit=${limit}` ).toString()
      fetch(url)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        const validatedData = responseSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          setEvents(validatedData.data.events)
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

  // useEffect(() => {
  //   console.log(events)
  //   console.log(count)
  // }, [events, count])

  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px] gap-[48px] pt-[32px]">
      <Title subheader="Events"/>
      <EventSearchForm />

      {/* event thumbnail container */}
      <div className="flex flex-row flex-wrap gap-[24px] justify-center">
        {events && events.map(event => <div key={event._id}>
            <EventThumbnail event={event} size={"normal"}/>
          </div>
        )}
        {(count===0) && <div>No Events Found :{'('}</div>}
      </div>

      <Pagination count={count} limit={limit}/>
    </div>
  )
}
export default Events