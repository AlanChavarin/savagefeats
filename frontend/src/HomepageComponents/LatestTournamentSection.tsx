import { errorSchema, eventSchema } from "@/app/schemas/schemas"
import { eventSchemaType } from "@/app/types/types"
import { z } from "zod"
import EventsSectionCarousel from "./EventsSectionCarousel"

const responseEventSchema = z.object({
    count: z.number(),
    events: z.array(eventSchema),
  })

let events: eventSchemaType[]

async function LatestTournamentSection() {

    //grab latest events
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events?&limit=9&emptyEvent=false`, {cache: 'no-store'})
    .then(r => r.json())
    .then(data => {
        const validatedData = responseEventSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            events = validatedData.data.events
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
    })

  return ( <>
        {events && <EventsSectionCarousel events={events} header="Latest Tournaments" backgroundImage="wildride.jpg"/>}
      </>
  )
}
export default LatestTournamentSection

{/* <div className='block'><EventsSectionBig events={events} header="Latest Tournaments" backgroundImage="wildride.jpg"/></div> */}