'use client'
import { useState, useEffect } from "react"
import { heroSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from 'zod'
import { toast } from "react-toastify"
import { UseFormReturn } from "react-hook-form"
import Select from '@/app/eyeofophidia/helperComponents/Select'

const responseSchema = z.array(z.object({
  name: z.string()
}))

function NameSelect({placeholder, name, form}: {placeholder: string, name: string, form: UseFormReturn<any>}) {
  const [playerNames, setPlayerNames] = useState<string[] | undefined>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}names/`)
    .then(r => r.json())
    .then(data => {
      const validatedData = responseSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const names = validatedData.data.map(player => player.name)
          setPlayerNames(names)
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
  }, [])

  return (
    <>
      {playerNames && <Select placeholder={placeholder} name={name} form={form} data={playerNames}/>} 
    </>
  )
}
export default NameSelect