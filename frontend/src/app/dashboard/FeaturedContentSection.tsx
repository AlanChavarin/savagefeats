'use client'
import { useState, useEffect } from "react"
import { z } from "zod"
import { contentSchema, errorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import { contentSchemaType } from "../types/types"
import AddNewFeaturedContentButton from "./AddNewFeaturedContentButton"
import FeaturedContentComponent from "./FeaturedContentComponent"

function FeaturedContentSection() {

    const [contents, setContents] = useState<contentSchemaType[] | undefined>(undefined)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}content/bytype/?type=featured`, {cache: 'reload'})
        .then(r => r.json())
        .then(data => {
            const validatedData = z.array(contentSchema).safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setContents(validatedData.data)
                return
            }

            if(validatedError.success){
                throw new Error(validatedError.data.errorMessage)
            }

            console.error(validatedData.error.toString())
            console.error(validatedError.error.toString())
            throw new Error('Unexpected data. Check console for further details')
        }).catch(err => {
            toast.error(err.message)
        })

    }, [])

    useEffect(() => {
      console.log(contents?.map(content => content.videoid))
    }, [])

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="font-bold">Featured Content:</div>
      {contents && contents.map(content => <FeaturedContentComponent id={content.videoid} key={content._id}/>)}
        
        <AddNewFeaturedContentButton />
    </div>
  )
}
export default FeaturedContentSection