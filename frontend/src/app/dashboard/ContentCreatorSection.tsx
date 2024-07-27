'use client'
import { useEffect, useState } from "react"
import { contentCreatorSchema, errorSchema } from "../schemas/schemas"
import { contentCreatorSchemaType } from "../types/types"
import { z } from "zod"
import { toast } from "react-toastify"
import ContentCreatorComponent from "./ContentCreatorComponent"
import AddNewContentCreatorButton from "./AddNewContentCreatorButton"

function ContentCreatorSection() {
  const [contentCreators, setContentCreators] = useState<contentCreatorSchemaType[] | undefined>(undefined)

  const grabContentCreators = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}contentCreators`, {cache: 'reload'})
    .then(r => r.json())
    .then(data => {
      const validatedData = z.array(contentCreatorSchema).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
          setContentCreators(validatedData.data)
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
  }

  useEffect(() => {
    grabContentCreators()
  }, [])

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="font-bold">Content Creators:</div>
      {contentCreators && contentCreators.map(contentCreator => (
        <ContentCreatorComponent key={contentCreator._id} contentCreator={contentCreator} grabContentCreators={async () => grabContentCreators} />
      ))}
      <AddNewContentCreatorButton grabContentCreators={() => grabContentCreators()}/>
    </div>
  )
}
export default ContentCreatorSection