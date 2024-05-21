'use client'
import { useState, useEffect } from "react"
import { heroSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from 'zod'
import { toast } from "react-toastify"
import { UseFormReturn } from "react-hook-form"
import Select from '@/app/eyeofophidia/helperComponents/Select'

const responseSchema = z.array(heroSchema)

function HeroSelect({placeholder, name, form}: {placeholder: string, name: string, form: UseFormReturn}) {
  const [heroes, setHeroes] = useState<string[] | undefined>()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}heroes/`)
    .then(r => r.json())
    .then(data => {
      const validatedHeroData = responseSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
        if(validatedHeroData.success){
          const heroNames = validatedHeroData.data.map(hero => hero.name)
          setHeroes(heroNames)
          return
        }
  
        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }
        
        console.error(validatedHeroData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })
  }, [])

  return (
    <>
      {heroes && <Select placeholder={placeholder} name={name} form={form} data={heroes}/>} 
    </>
  )
}
export default HeroSelect