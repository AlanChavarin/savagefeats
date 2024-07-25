'use client'
import { useState, useEffect } from "react"
import { z } from "zod"
import { errorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import PortfolioComponent from "./PortfolioComponent"
import AddNewPortfolioVideoButton from "./AddNewPortfolioVideoButton"

const responseSchema = z.array(z.object({
  videoid: z.string(),
}))

function PortfolioSection() {

    const [links, setLinks] = useState<string[] | undefined>(undefined)

    useEffect(() => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content/portfoliocontent`
      fetch(url, {cache: 'no-store'})
      .then(r => r.json())
      .then(data => {
        const validatedData = responseSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          setLinks(validatedData.data.map(content => content.videoid))
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
  return (
    <div className="flex flex-col gap-[8px] items-center">
      <div className="font-bold">Portfolio:</div>
      {links && links.map(id => <PortfolioComponent id={id} key={id}/>)}
        
      <AddNewPortfolioVideoButton />
    </div>
  )
}
export default PortfolioSection