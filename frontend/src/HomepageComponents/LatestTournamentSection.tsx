import { errorSchema, eventSchema } from "@/app/schemas/schemas"
import { eventSchemaType } from "@/app/types/types"
import { useEffect, useState } from "react"
import { z } from "zod"
import EventsSectionSmall from "./EventsSectionSmall"
import EventsSectionBig from "./EventsSectionBig"
import { toast } from "react-toastify"


const responseEventSchema = z.object({
    count: z.number(),
    events: z.array(eventSchema),
  })

function LatestTournamentSection() {
    const [events, setEvents] = useState<eventSchemaType[] | undefined>(undefined)

    useEffect(() => {

        //grab latest events
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events?&limit=9&emptyEvent=false`)
        .then(r => r.json())
        .then(data => {
        const validatedData = responseEventSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            setEvents(validatedData.data.events)
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

    

  return ( <>
        {
            events && <>
                <div className='block lg:hidden'><EventsSectionSmall events={events} header="Latest Tournaments"/></div>
                <div className='hidden lg:block'><EventsSectionBig events={events} header="Latest Tournaments"/></div>
            </>
        }
      </>
  )
}
export default LatestTournamentSection