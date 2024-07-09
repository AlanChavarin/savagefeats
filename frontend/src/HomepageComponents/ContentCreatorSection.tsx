'use client'
import ContentCreatorSectionBig from "./ContentCreatorSectionBig"
import ContentCreatorSectionContainer from "./ContentCreatorSectionContainer"
import { useEffect, useState } from "react"
import { errorSchema } from "@/app/schemas/schemas"
import { contentCreatorSchemaType } from "@/app/types/types"
import { z } from "zod"
import { toast } from "react-toastify"

function ContentCreatorSection({creator}: {creator: contentCreatorSchemaType}) {

    const [youtubeIds, setYoutubeIds] = useState<string[] | undefined>(undefined)

    useEffect(() => {
        //grab creator data
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/bycontentcreator/${creator._id}?&idonly=true&limit=8`)
        .then(r => r.json())
        .then(data => {
        const validatedData = z.array(z.string()).safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            setYoutubeIds(validatedData.data)
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

  return (<ContentCreatorSectionContainer youtubeIds={youtubeIds} channelData={creator}/>)
}

export default ContentCreatorSection

{/* <ContentCreatorSectionBig  youtubeIds={youtubeIds} channelData={creator}/> */}