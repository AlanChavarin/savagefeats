import { contentSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import LatestInFABSectionCarousel from "./LatestInFabSectionCarousel"

const responseSchema = z.array(contentSchema)

let contents: z.infer<typeof responseSchema>

async function LatestInFABSection({backgroundImage} : { backgroundImage: string}) {

  //grab latest in fab data
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/latestinfleshandblood`, {cache: "no-store"})
  .then(r => r.json())
  .then(data => {
    const validatedData = responseSchema.safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
      contents = validatedData.data
      return
    }

    if(validatedError.success){
      throw new Error(validatedError.data.errorMessage)
    }

    console.error(validatedData.error)
    console.error(validatedError.error)
    throw new Error('Unexpected data. Check console for further details')
  })

  return (<>
      <LatestInFABSectionCarousel backgroundImage={backgroundImage} contents={contents}/>
    </>
  )
}
export default LatestInFABSection