'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import CustomRadio from "../helperComponents/CustomRadio"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "../helperComponents/Select"
import { useState, useEffect } from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import { draftSchema, errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import getYoutubeParams from '../helpers/YoutubeParams'
import { getTwitchParams } from "../helpers/TwitchParams"
import HeroSelect from "../helperComponents/HeroSelect"
import { useSearchParams } from "next/navigation"
import NameSelect from "../helperComponents/NameSelect"
import DeleteButton from "../helperComponents/DeleteButton"

const formSchema = z.object({
  event: z.string().min(3),
  top8: z.boolean(),
  swissRound: z.coerce.number().optional(),
  twitch: z.boolean().optional(),
  twitchTimeStamp: z.string().optional(),
  link: z.string(),
  timeStamp: z.coerce.number().optional(),
  playerName: z.string().optional(),

  //dummy fields that the backend doesnt actually accept
  videolink: z.string(),
})

type FormFields = z.infer<typeof formSchema>

function Postdraft() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [eventNames, setEventNames] = useState<string[] | undefined>(undefined)

  const [actionAfterSubmit, setActionAfterSubmit] = useState<'TO_EVENT' | 'RESET_FORM' | undefined>(undefined)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      top8: false, 
      swissRound: 0
    }
  })

  const { register, handleSubmit, setValue, getValues, reset, resetField, watch, formState: {errors, isSubmitting}} = form

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    const draftid = searchParams?.get('draftid')

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}drafts/${draftid ? draftid : ''}`

    if(getValues('top8')){
      setValue('swissRound', undefined)
    }

    fetch(url, {
      cache: 'no-store',
      method: draftid ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = draftSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(validatedData.data)
        toast.success(`Post Draft Success for ${validatedData.data._id}`)
        if(actionAfterSubmit === 'RESET_FORM'){
          resetField('videolink')
          resetField('link')
          resetField('timeStamp')
          resetField('twitchTimeStamp')
        }

        if(actionAfterSubmit === 'TO_EVENT'){
          router.push(`/eyeofophidia/event/${validatedData.data.event._id}`)
        }
        
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
    // get draft data if we are editing a draft

    const draftid = searchParams?.get('draftid')
    const eventName = searchParams?.get('eventname')
    const lastRound = searchParams?.get('lastRound')
    const lastTwitch = searchParams?.get('lastTwitch')

    if(eventName && !draftid){
      setValue('event', eventName)
    }

    if(!draftid && lastTwitch){
      if(lastTwitch === 'true'){
        setValue('twitch', true)
      } else if (lastTwitch === 'false'){
        setValue('twitch', false)
      }
    }

    if(draftid){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}drafts/${draftid}`
      fetch(url, {
        cache: 'no-store'
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = draftSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const {event, top8, swissRound, twitch, twitchTimeStamp, link, timeStamp, playerName
          } = validatedData.data
          reset({
            event: event.name, 
            top8, 
            swissRound: swissRound ? swissRound : undefined, 
            twitch, 
            twitchTimeStamp: twitchTimeStamp ? twitchTimeStamp : undefined, 
            link, 
            timeStamp: timeStamp ? timeStamp : undefined, 
            playerName,
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
        toast.error(err.message)
      })
    }

    // grab event names
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events/names`

    fetch(url)
    .then(r => r.json())
    .then(data => {
      const validatedData = z.array(z.string()).safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        setEventNames(validatedData.data)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected event name data. Check console for further details')
    }).catch(err => {
      toast.error(err.message)
    })
  }, [])

  const videoLinkOnChange = () => {
    if(getValues('twitch')){
      const params = getTwitchParams(getValues('videolink'))
      setValue('link', params.id)
      setValue('twitchTimeStamp', params.time)
    } else {
      const params = getYoutubeParams(getValues('videolink'))
      setValue('link', params.id)
      setValue('timeStamp', params.time)
    }
  }

  const deleteAction = () => {
    const draftid = searchParams?.get('draftid')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}drafts/${draftid}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = draftSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(draftid + ' Successfully deleted')
        toast.success(draftid + ' Successfully deleted')
        router.push(`event/${validatedData.data.event._id}`)
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected event name data. Check console for further details')
    })
  }

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

        { searchParams?.get('draftid') &&
          <div className="absolute top-[8px] right-[8px]">
            <DeleteButton warningText="Are you sure you want to delete this draft? It cannot be restored" deleteAction={deleteAction}/>
          </div>
        }

        <div className="text-[24px] self-center">{searchParams?.get('draftid') ? 'Edit' : 'Post'} Draft</div>

        <div className="flex flex-col w-[100%]">
          <label>Event Name: <span className="text-red-500">*</span></label>
          <Select placeholder='Event Name' name='event' form={form} data={eventNames}/>
        </div>


        <div className="flex flex-col">
          <label>What round does this draft take place right before?<span className="text-red-500">*</span></label>
          <div className="flex flex-row items-center gap-[16px]">
            <div className="w-[64px]">
              <CustomRadio options={{'Top 8': true, 'Swiss': false}} form={form} name="top8" flexDirection="col"/>
            </div>
            {!watch('top8') &&
              <div className="flex flex-row">
                <label>Swiss Round: &nbsp;</label>
                <input className="border-black border-[1px] w-[48px]" {...register('swissRound')} type="number" min='0'/>
              </div>
            }
          </div>
        </div>

        <div className="flex flex-col">
          <label>Website: <span className="text-red-500">*</span></label>
          <CustomRadio options={{'Youtube': false, 'Twitch': true}} form={form} name="twitch"/>
        </div>

        <BasicTextInput placeholder='' name='videolink' label='Video Link: ' register={register} required={false} onChange={videoLinkOnChange}/>

        <BasicTextInput placeholder='' name='link' label={`${watch('twitch') ? 'twitch' : 'youtube'} id: `} register={register} required={true}/>

        { watch('twitch') ? 
          <div className="flex flex-col"> 
            <label>Twitch Time Stamp: <span className="text-red-500">*</span>&nbsp;</label>
            <input type="text" {...register('twitchTimeStamp')} className="border-black border-[1px] w-[128px] box-shadow-extra-small" />
          </div>
          :
          <div className="flex flex-col"> 
            <label>Youtube Time Stamp: <span className="text-red-500">*</span>&nbsp;</label>
            <input min={'0'} type="number" {...register('timeStamp')} className="border-black border-[1px] w-[128px] box-shadow-extra-small" />
          </div>
        }

        <div className="flex flex-col">
          <label>Player Full Name:</label>
          <NameSelect placeholder='' name='playerName' form={form}/>
        </div>
        
        <button onClick={() => setActionAfterSubmit('TO_EVENT')} disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] w-[80%] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit & go to event"}
        </button>

        <button onClick={() => setActionAfterSubmit('RESET_FORM')} disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] w-[80%] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit & reset form"}
        </button>

        <button disabled={isSubmitting} type="reset" onClick={() => reset()} className="bg-custom-gray hover:bg-custom-grayHover py-[4px] px-[12px] mt-[16px] border-[1px] text-[14px] border-black box-shadow-extra-small">
          Reset Form
        </button>

      </form>
    </div>
  )
}
export default Postdraft