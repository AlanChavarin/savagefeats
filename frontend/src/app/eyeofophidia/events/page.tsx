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
import { checkIfHappeningNow, checkIfFuture, checkIfPast } from "../helpers/checkIfHappeningNow"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

const responseSchema = z.object({
  count: z.number(),
  events: z.array(eventSchema),
})

const limit = 40

function Events() {

  const [events, setEvents] = useState<eventSchemaType[] | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const searchParams = useSearchParams()

  const [pastEventsDropdown, setPastEventsDropdown] = useState<boolean>(true)
  const [futureEventsDropdown, setFutureEventsDropdown] = useState<boolean>(true)
  const [currentEventsDropdown, setCurrentEventsDropdown] = useState<boolean>(true)


  useEffect(() => {
    if(searchParams.get('query') === 'true'){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events?` + new URLSearchParams(searchParams.toString() + `&limit=${limit}` ).toString()
      fetch(url)
      .then(r => r.json())
      .then(data => {
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

      {/* event thumbnail container for past events */}
      {events &&
        <div className="flex flex-col gap-[32px] items-center">
          {/* current events */}
          {!searchParams.get('pastEventsOnly') && events.filter(event => checkIfHappeningNow(event)).length > 0 && <>
            <div className="flex flex-col gap-[16px] items-center cursor-pointer" onClick={() => setCurrentEventsDropdown(!currentEventsDropdown)}>
              <div className="text-[39px] font-bold text-center flex flex-row gap-[16px] items-center select-none">
                Happening Now 
                <FontAwesomeIcon icon={currentEventsDropdown ? faCaretDown : faCaretUp}/>
              </div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </div>
            { currentEventsDropdown && 
              <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                {events.filter(event => checkIfHappeningNow(event)).map(event => <div key={event._id}>
                    <EventThumbnail event={event} size={"normal"}/>
                  </div>
                )}
              </div>
            }
            
          </>}
          

          {/* future events */}
          {!searchParams.get('pastEventsOnly') && events.filter(event => checkIfFuture(event)).length > 0 && <>
            <div className="flex flex-col gap-[16px] items-center cursor-pointer" onClick={() => setFutureEventsDropdown(!futureEventsDropdown)}>
              <div className="text-[39px] font-bold text-center flex flex-row gap-[16px] items-center select-none">
                Future Events
                <FontAwesomeIcon icon={futureEventsDropdown ? faCaretDown : faCaretUp}/>
              </div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </div>
            {futureEventsDropdown &&
              <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                {events.filter(event => checkIfFuture(event)).map(event => <div key={event._id}>
                    <EventThumbnail event={event} size={"normal"}/>
                  </div>
                )}
              </div>
            }
          </>
          }
          

          {/* past events */}
          {events.filter(event => checkIfPast(event)).length > 0 && <>
            <div className="flex flex-col gap-[16px] items-center cursor-pointer" onClick={() => setPastEventsDropdown(!pastEventsDropdown)}>
              <div className="text-[39px] font-bold text-center flex flex-row gap-[16px] items-center select-none">
                Past Events
                <FontAwesomeIcon icon={pastEventsDropdown ? faCaretDown : faCaretUp}/>
              </div>
              <div className="w-[70%] md:w-[384px] border-[1px] border-black"></div>
            </div>
            {pastEventsDropdown && 
              <div className="flex flex-row flex-wrap gap-[24px] justify-center">
                {events.filter(event => checkIfPast(event)).map(event => <div key={event._id}>
                    <EventThumbnail event={event} size={"normal"}/>
                  </div>
                )}
              </div>
            }
          </>
            
          }

          {(count===0) && <div>No Events Found :{'('}</div>}
          
        </div>
      }

      <Pagination count={count} limit={limit}/>
    </div>
  )
}
export default Events