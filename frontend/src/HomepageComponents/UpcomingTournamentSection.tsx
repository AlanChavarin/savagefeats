import { errorSchema, eventSchema } from "@/app/schemas/schemas"
import { eventSchemaType } from "@/app/types/types"
import { useEffect, useState } from "react"
import { z } from "zod"
import EventsSectionSmall from "./EventsSectionSmall"
import EventsSectionBig from "./EventsSectionBig"
import { toast } from "react-toastify"


//const responseEventSchema = z.array(eventSchema)

function UpcomingTournamentSection() {
    const [events, setEvents] = useState<eventSchemaType[] | undefined>(undefined)

    useEffect(() => {

        //grab current and future events
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/getcurrentandfutureevents`)
        .then(r => r.json())
        .then(data => {
            const validatedData = z.array(eventSchema).safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setEvents(validatedData.data)
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

    }, [])

    useEffect(() => {
        console.log(events)
    }, [events])

  return ( <>
        {
            events && events.length > 0 && <>
                <div className='block lg:hidden'><EventsSectionSmall events={events} header="Upcoming Tournaments"/></div>
                <div className='hidden lg:block'><EventsSectionBig events={events} header="Upcoming Tournaments"/></div>
            </>
        }
      </>
  )
}
export default UpcomingTournamentSection