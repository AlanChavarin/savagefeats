'use client'
import { useState, useEffect } from "react"
import { heroSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from 'zod'
import { toast } from "react-toastify"
import { UseFormReturn } from "react-hook-form"
import Select from '@/app/eyeofophidia/helperComponents/Select'
import { heroSchemaType } from "@/app/types/types"
import typeCalculator from "../postmatch/typeCalculator"

const responseSchema = z.array(heroSchema)

function HeroSelect({placeholder, name, form}: {placeholder: string, name: string, form: UseFormReturn<any>, 
  //type: ('adult' | 'young' | 'both')
}) {
  const [heroData, setHeroData] = useState<heroSchemaType[] | undefined>()
  const [youngHeroNames, setYoungHeroNames] = useState<string[] | undefined>()
  const [adultHeroNames, setAdultHeroNames] = useState<string[] | undefined>()
  const [allHeroNames, setAllHeroNames] = useState<string[] | undefined>()

  const {watch} = form
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}heroes`, {cache: 'no-store'})
    .then(r => r.json())
    .then(data => {
      const validatedHeroData = responseSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
        if(validatedHeroData.success){
          
          setHeroData(validatedHeroData.data)
          const youngHeros = validatedHeroData.data.filter(hero => hero.young)
          const adultHeros = validatedHeroData.data.filter(hero => !hero.young)
          setAllHeroNames(validatedHeroData.data.map(hero => hero.name))
          setYoungHeroNames(youngHeros.map(hero => hero.name))
          setAdultHeroNames(adultHeros.map(hero => hero.name))

          return
        }
  
        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }
        
        console.error(validatedHeroData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast.error(err.message)
    })
  }, [])


  return (
    <>
      {heroData && <>
        {typeCalculator(watch('format')) === 'both' && <Select placeholder={placeholder} name={name} form={form} data={allHeroNames}/>}
        {typeCalculator(watch('format')) === 'adult' && <Select placeholder={placeholder} name={name} form={form} data={adultHeroNames}/>}
        {typeCalculator(watch('format')) === 'young' && <Select placeholder={placeholder} name={name} form={form} data={youngHeroNames}/>}

      </>
      }
    </>
  )
}
export default HeroSelect