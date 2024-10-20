import { errorSchema, eventSchema } from "@/app/schemas/schemas"
import { eventSchemaType } from "@/app/types/types"
import { z } from "zod"
//import EventsSectionCarousel from "./EventsSectionCarousel"
import EventsSectionCarouselLazyLoadWrapper from "./EventsSectionCarouselLazyLoadWrapper"

let events: eventSchemaType[]

async function UpcomingTournamentSection() {

    //grab current and future events
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/getcurrentandfutureevents`, {
        next: {
            revalidate: 3600
        }
    })
    .then(r => r.json())
    .then(data => {
        const validatedData = z.array(eventSchema).safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            events = validatedData.data.reverse()
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
        { events && events.length > 0 && <EventsSectionCarouselLazyLoadWrapper whichEvents="futureEventsOnly" events={events} header="Upcoming Tournaments" backgroundImage="/tomasz-jedrusz.png" backgroundImageBlur="/tomasz-jedruszBlur.png"/>}
      </>
  )
}
export default UpcomingTournamentSection