'use client'
import { useState, useEffect } from "react"
import { z } from "zod"
import { errorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import AddNewLiveStreamButton from "./AddNewLiveStreamButton"
import LiveStreamComponent from "./LiveStreamComponent"

function LiveStreamSection() {

    const [links, setLinks] = useState<string[] | undefined>(undefined)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}livestreams`, {cache: 'reload'})
        .then(r => r.json())
        .then(data => {
            const validatedData = z.array(z.string()).safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setLinks(validatedData.data)
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

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="font-bold">Live Stream:</div>
      {links && links.map(id => <LiveStreamComponent id={id} key={id}/>)}
        
        <AddNewLiveStreamButton />
    </div>
  )
}
export default LiveStreamSection