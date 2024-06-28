

import { eventSchemaType } from "@/app/types/types"
import { toast } from "react-toastify"
import { errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import { eventSchema } from "@/app/schemas/schemas"
import LatestInFABSectionCarousel from "./LatestInFabSectionCarousel"


const responseLatestInFABSchema = z.object({
    videoIds: z.array(z.string()),
    events: z.array(eventSchema),
  })

let youtubeIDs: string[]
let events: eventSchemaType[]

async function LatestInFABSection({backgroundImage} : { backgroundImage: string}) {

  //grab latest in fab data
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/latestinfleshandblood`)
  .then(r => r.json())
  .then(data => {
    const validatedData = responseLatestInFABSchema.safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
        youtubeIDs = validatedData.data.videoIds
        events = validatedData.data.events
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

  return (<>
      <LatestInFABSectionCarousel backgroundImage={backgroundImage} youtubeIDs={youtubeIDs} events={events}/>
    </>
  )
}
export default LatestInFABSection