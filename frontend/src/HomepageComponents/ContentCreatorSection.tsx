import ContentCreatorSectionContainer from "./ContentCreatorSectionContainer"
import { contentCreatorSchema, contentSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import { toast } from "react-toastify"

const responseSchema = z.array(z.object({
    contentCreator: contentCreatorSchema,
    contents: z.array(contentSchema)
}))

type responseSchemaType = z.infer<typeof responseSchema>

let responseData: responseSchemaType

async function ContentCreatorSection() {

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/getfeaturedcontentcreatorsandtheirlatest8videos`)
    .then(r => r.json())
    .then(data => {
    const validatedData = responseSchema.safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
        responseData = validatedData.data
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

  return (<>
    {responseData.map(data => <ContentCreatorSectionContainer contents={data.contents} contentCreator={data.contentCreator} key={data.contentCreator._id}/>)}
  </>)
}

export default ContentCreatorSection

{/* <ContentCreatorSectionBig  youtubeIds={youtubeIds} channelData={creator}/> */}