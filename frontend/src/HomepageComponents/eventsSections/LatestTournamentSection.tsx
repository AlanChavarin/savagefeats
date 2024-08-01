import { errorSchema, eventSchema } from "@/app/schemas/schemas"
import { eventSchemaType } from "@/app/types/types"
import { z } from "zod"
//import EventsSectionCarousel from "./EventsSectionCarousel"
import EventsSectionCarouselLazyLoadWrapper from "./EventsSectionCarouselLazyLoadWrapper"

let events: eventSchemaType[]

async function LatestTournamentSection() {

    //grab latest events
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}events/getlatestevents`, {
        next: {
            revalidate: 3600
        }
    })
    .then(r => r.json())
    .then(data => {
        const validatedData = z.array(eventSchema).safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            events = validatedData.data
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error.toString())
        console.error(validatedError.error.toString())
        throw new Error('Unexpected data. Check console for further details')
    })

  return ( <>
        {events && <EventsSectionCarouselLazyLoadWrapper events={events} header="Latest Tournaments" backgroundImage="/wildride.jpg" backgroundImageBlur="/wildrideBlur.jpg"/> }
      </>
  )
}
export default LatestTournamentSection

{/* <div className='block'><EventsSectionBig events={events} header="Latest Tournaments" backgroundImage="wildride.jpg"/></div> */}