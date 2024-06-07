'use client'
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import CustomRadio from "../helperComponents/CustomRadio"
import { zodResolver } from "@hookform/resolvers/zod"
import MultiSelector from "../helperComponents/MultiSelector"
import { useState, useEffect, SyntheticEvent } from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import BasicDateInput from "../helperComponents/BasicDateInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { getTimeDifference } from "../helpers/timeDifference"
import { eventSchema, errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(3),
  location: z.string().min(3),
  format: z.array(z.enum(['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'Mixed'])).min(1),
  tier: z.number().optional(),
  official: z.boolean(),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  notATypicalTournamentStructure: z.boolean(),
  dayRoundArr: z.array(z.union([z.coerce.number().positive(), z.null(), z.undefined()])),
  top8Day: z.boolean(),
})


type FormFields = z.infer<typeof formSchema>

function Postevent() {

  const searchParams = useSearchParams()

  const [multiDayToggle, setMultiDayToggle] = useState<boolean>(false)
  
  const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: [],
      official: true,
      dayRoundArr: [],
      top8Day: false,
      notATypicalTournamentStructure: false,
    }
  })

  const {control, register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form
  
  const { fields, update } = useFieldArray({
    control, 
    //@ts-ignore
    name: 'dayRoundArr'
  })

  useEffect(() => {
    let num = getTimeDifference(watch('startDate'), watch('endDate'))

    if(!getValues('top8Day')){
      num++
    }
    
    let arr = getValues('dayRoundArr')
    const length = arr.length

    if(num > arr.length){
      for(let i = 0; i < (num-length); i++){
        arr.push(1)
      }
    } else {
      for(let i = 0; i < (length-num); i++){
        arr.pop()
      }
    }
    setValue('dayRoundArr', arr)
    
  }, [watch('startDate'), watch('endDate')])

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    if(!multiDayToggle){
      data.dayRoundArr = []
      data.endDate = ''
      data.top8Day = false
    }

    if(getValues('notATypicalTournamentStructure')){
      data.dayRoundArr = []
    }

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events`

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = eventSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(validatedData.data)
        toast(`Post Event Success for ${validatedData.data._id}`)
        router.push(`event/${validatedData.data._id}`)
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

  }

  useEffect(() => { 
    if(getValues('startDate'), getValues('endDate')){
      let num = getTimeDifference(watch('startDate'), watch('endDate'))+1
      const top8Day = getValues('top8Day')
      let arr = getValues('dayRoundArr')
      if(top8Day && arr.length === num){
        arr.pop()
      } else {
        arr.push(1)
      }
      setValue('dayRoundArr', arr)
    }
  }, [watch('top8Day')])

  const dayRoundArrOnChange = (e: SyntheticEvent<HTMLInputElement>) => {
    let arr = getValues('dayRoundArr')
    for(let i = 0; i < arr.length-1; i++){
      //@ts-ignore
      if(arr[i] >= parseInt(arr[i+1])){
        //@ts-ignore
        update(i+1, parseInt(arr[i])+1)
      }
    }
  }

   useEffect(() => {
    // get match data if we are editing a match

    const eventid = searchParams.get('eventid')

    if(eventid){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events/${eventid}`
      fetch(url, {
        cache: 'no-store'
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = eventSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const {name, location, format, tier, official, startDate, endDate, notATypicalTournamentStructure, dayRoundArr, top8Day} = validatedData.data

          if(endDate){
            setMultiDayToggle(true)
          }

          reset({
            name, 
            location, 
            format, 
            tier, 
            official, 
            startDate: startDate ? startDate.slice(0, 10) : undefined, 
            endDate: endDate ? endDate.slice(0, 10) : undefined, 
            notATypicalTournamentStructure, 
            dayRoundArr: dayRoundArr ? dayRoundArr : undefined, 
            top8Day
          })
          return
        }

        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected event name data. Check console for further details')
      }).catch(err => {
        toast(err.message)
      })
    }
   }, [])

  return (
    <div className="flex-1 flex justify-center items-start my-[32px]">
      <form onSubmit={handleSubmit(onSubmit)} className="relative font-bold flex flex-col gap-[8px] items-start bg-white border-[1px] border-black w-[90%] px-[16px] pt-[16px] pb-[24px] box-shadow-extra-small max-w-[300px]">

        {Object.keys(errors).map((key) => {
          // @ts-ignore
          const error = errors[key as keyof FormData] 
          return (
            <div key={key} className="text-red-500">
              {key}: {error?.message}
            </div>
          )
        })}

        <div className="text-[24px] self-center">Post Event</div>

        <BasicTextInput  placeholder='Event Name' name='name' label='Name: ' register={register} required={true}/>

        <BasicTextInput placeholder='Location' name='location' label='Location: ' register={register} required={true}/>

        <div className="flex flex-col w-[100%]">
          <label>Format{'('}s{')'}: <span className="text-red-500">*</span></label>
          <MultiSelector placeholder='Format' name='format' form={form} data={['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', 'Mixed', '']}/>
        </div>


        <div className="flex flex-col">
          <label>Official LSS Event? <span className="text-red-500">*</span></label>
          <CustomRadio options={{'Official': true, 'Unofficial': false}} form={form} name="official"/>
        </div>

        <div className="flex flex-row gap-[4px] cursor-pointer" onClick={() => {setMultiDayToggle(!multiDayToggle)}}>
          <label>Multi-Day Event?</label>
          <div className={`${multiDayToggle && 'bg-custom-primary'} box-shadow-extra-small w-[24px] h-[24px] flex justify-center items-center border-[1px] border-black  `}>
            {multiDayToggle && <FontAwesomeIcon icon={faCheck} />}
          </div>
        </div>

        <div className="flex flex-row items-center gap-[4px] cursor-pointer" onClick={() => {setValue('notATypicalTournamentStructure', !watch('notATypicalTournamentStructure'))}}>
          <label className="text-[11px]">Not A Typical Tournament Structure?</label>
          <div className={`${watch('notATypicalTournamentStructure') && 'bg-custom-primary'} box-shadow-extra-small w-[24px] h-[24px] flex justify-center items-center border-[1px] border-black  `}>
            {watch('notATypicalTournamentStructure') && <FontAwesomeIcon icon={faCheck} />}
          </div>
        </div>

        { multiDayToggle && !watch('notATypicalTournamentStructure') && 
          <div className="flex flex-row items-center gap-[4px] cursor-pointer" onClick={() => {setValue('top8Day', !watch('top8Day'))}}>
          <label className="">Dedicated Top 8 Day? </label>
          <div className={`${watch('top8Day') && 'bg-custom-primary'} box-shadow-extra-small w-[24px] h-[24px] flex justify-center items-center border-[1px] border-black  `}>
              {watch('top8Day') && <FontAwesomeIcon icon={faCheck} />}
            </div>
          </div>
        }

        { multiDayToggle ?
          <>
            <div className="flex flex-col">
              <label>Start Date: <span className="text-red-500">*</span></label>
              <BasicDateInput register={register} name='startDate' />
            </div>
            <div className="flex flex-col">
              <label>End Date: <span className="text-red-500">*</span></label>
              <BasicDateInput register={register} name='endDate' />
            </div>
 
          </>
          :
          <div className="flex flex-col">
            <label>Date: <span className="text-red-500">*</span></label>
            <BasicDateInput register={register} name='startDate' />
          </div>
        }

        { (multiDayToggle && !watch('notATypicalTournamentStructure')) && 
          (getTimeDifference(watch('startDate'), watch('endDate')) < 6
            ?
            fields.map((field, i) => (
            <div key={field.id} className="flex flex-row gap-[4px]">
              <div>Last round of day {i+1}: </div>
              <input key={field.id} min={'1'} type="number" className="border-black border-[1px] w-[48px]"
                {...register(`dayRoundArr.${i}`, {
                  onChange: (e: SyntheticEvent<HTMLInputElement>) => dayRoundArrOnChange(e)
                })}
              />
            </div>
          ))
          :
          <div className="text-red-500 font-normal">Too many days, consider a non typical tournament structure for this event</div>
          )
        }
        
        {(watch('top8Day') && watch('startDate') && watch('endDate') && !watch('notATypicalTournamentStructure') && multiDayToggle) && <div>Reserved for top 8</div>}

        <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[48px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  )
}
export default Postevent