'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faGear } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import HeroSelect from "../helperComponents/HeroSelect"
import Select from '@/app/eyeofophidia/helperComponents/Select'
import { zodResolver } from "@hookform/resolvers/zod"
import typeCalculator from "../postmatch/typeCalculator"

const formSchema = z.object({
  text: z.string().optional(),
  hero1: z.string().optional(),
  hero2: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  format: z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', '']).optional(),
  order: z.number().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
})

type FormFields = z.infer<typeof formSchema>

function MatchSearchForm(){
  const [settings, setSettings] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      order: -1
    }
  })

  const {register, handleSubmit, setValue, watch, reset, formState: {errors, isSubmitting}} = form

  const {onBlur} = register('text')

  
  const handleOrder = () => {
    if(watch('order') !== undefined){
      // @ts-ignore
      setValue('order', -1*watch('order'))
    }
  }

  const onSubmit: SubmitHandler<FormFields> = async (data) => {

    document.getElementById('input')?.blur()

    if(data.order === -1){
      delete data.order
    }

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => (value !== "" && value !== undefined))
    )

    // @ts-ignore
    const params = new URLSearchParams(filteredData).toString()
    router.push('matches?query=true&' + params)
}

  return (
    <form className="w-[100%] flex flex-col items-center gap-[0px] text-[18px] max-w-[700px]" onSubmit={handleSubmit(onSubmit)}>
      {Object.keys(errors).map((key) => {
        // @ts-ignore
        const error = errors[key as keyof FormData] 
        return (
          <div key={key} className="text-red-500">
            {key}: {error?.message}
          </div>
        )
      })}

      <div className="flex flex-row items-center bg-white border-[1px] border-black w-[100%]" style={{boxShadow: "2px 2px black"}}>
        <button disabled={isSubmitting} type="submit" className="w-[32px] h-[32px] flex items-center justify-center border-r-[1px] border-black hover:bg-custom-whiteHover">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

        {/* text input */}
        <input {...register("text")} type="text" placeholder="Search For Matches" id="input" className="pl-[16px] pr-[16px] flex-1 focus:outline-none"/>

        <button type="button" className="w-[32px] h-[32px] flex items-center justify-center border-l-[1px] border-black hover:bg-custom-whiteHover" onClick={() => setSettings(!settings)}>
          <FontAwesomeIcon icon={faGear}/>
        </button>
      </div>

      {/* dropdown parameters */}
      {settings && 
        <div className="relative font-bold flex flex-col gap-[16px] items-start md:items-center bg-white border-[1px] border-black w-[90%] px-[16px] md:px-[0px] pt-[16px] pb-[24px]" style={{boxShadow: "2px 2px black"}}>
          {/* hero selector */}
          <div className="flex flex-col gap-[8px] w-[85%] md:items-center md:flex-row">
            <div className="whitespace-nowrap">Hero Matchup: </div>
            {/* hero 1 */}
            <HeroSelect placeholder="Hero" name="hero1" form={form} type={typeCalculator(watch('format'))}/>
            <div className="hidden md:block"> VS. </div>
            {/* hero 2 */}
            <HeroSelect placeholder="Hero" name="hero2" form={form} type={typeCalculator(watch('format'))}/>
          </div>

          {/* date range  */}
          <div className="flex flex-col gap-[8px] md:items-center md:flex-row">
            <div>Date Range: </div>
            {/* start date */}
            <input {...register('startDate')} type="date" placeholder="Hero" className="text-custom-gray flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[0px] focus:outline-none hover:cursor-text box-shadow-extra-small focus:border-[2px]"/>
            <div className="hidden md:block"> To </div>
            <input {...register('endDate')} type="date" placeholder="Hero" className='flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[0px] focus:outline-none hover:cursor-text box-shadow-extra-small focus:border-[2px] text-custom-gray' />
          </div>

          {/* format  */}
          <div className="flex flex-col gap-[8px] md:items-center md:flex-row">
            <div>Format: </div>
            {/* <input {...register('format')} type="text" placeholder="Format" className="max-w-[196px] flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[1px] focus:outline-none box-shadow-extra-small focus:border-[2px]"/> */}
            <Select placeholder='Format' name='format' form={form} data={['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', '']}/>
          </div>

          {/* Sort by new/old rn this doesnt work  */}
          <div className="flex flex-col gap-[8px] w-[85%] md:items-center md:justify-center md:flex-row">
            <div>Sort By: </div>
            <div className="flex flex-row w-[85%] border-[1px] border-black max-w-[128px] cursor-pointer select-none" style={{boxShadow: "2px 2px black"}} onClick={() => handleOrder()}>
              {watch('order') === -1 ? <>
                <div className="bg-custom-primary hover:bg-custom-primary-hover flex-1 text-center">New</div>
                <div className="border-l-[1px] border-black"></div>
                <div className="font-normal text-custom-gray flex-1 text-center">Old</div>
              </> : 
              <>
                <div className="font-normal text-custom-gray flex-1 text-center">New</div>
                <div className="border-l-[1px] border-black"></div>
                <div className="bg-custom-primary hover:bg-custom-primary-hover flex-1 text-center ">Old</div>
              </>}
              
            </div>
          </div>

          {/* big search button */}
          <button disabled={isSubmitting} type="submit" className="bg-custom-primary py-[8px] px-[48px] mt-[16px] self-center border-[1px] border-black" style={{boxShadow: "2px 2px black"}}>
            {isSubmitting ? "Searching..." : "Search"}
          </button>

          <button disabled={isSubmitting} type="reset" onClick={() => reset()} className="bg-custom-gray hover:bg-custom-grayHover py-[4px] px-[12px] mt-[8px] self-center border-[1px] text-[14px] border-black absolute top-[0px] right-[8px] md:bottom-[16px] md:left-[16px] md:top-auto md:right-auto box-shadow-extra-small">
            Reset
          </button>

        </div>
      }
    </form>
       
  )
}
export default MatchSearchForm
