'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import CustomRadio from "../helperComponents/CustomRadio"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "../helperComponents/Select"
import { useState, useEffect } from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import { matchSchema, errorSchema } from "@/app/schemas/schemas"
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
  format: z.enum(['Classic Constructed', 'Blitz', 'Draft', 'Sealed', 'Living Legend', 'None']),
  top8: z.boolean(),
  swissRound: z.coerce.number().optional(),
  top8Round: z.enum(['Quarter Finals', 'Semi Finals', 'Finals', 'None']).optional(),
  twitch: z.boolean().optional(),
  twitchTimeStamp: z.string().optional(),
  link: z.string(),
  timeStamp: z.coerce.number().optional(),
  date: z.string().optional(),

  player1name: z.string().min(1),
  player1hero: z.string().min(1),
  //player1deck: z.string(),

  player2name: z.string().min(1),
  player2hero: z.string().min(1),
  //player2deck: z.string(),


  //dummy fields that the backend doesnt actually accept
  videolink: z.string(),

})

type FormFields = z.infer<typeof formSchema>

function Postmatch() {

  const router = useRouter()
  const searchParams = useSearchParams()

  const [eventNames, setEventNames] = useState<string[] | undefined>(undefined)
  const [nameHeroPairs, setNameHeroPairs] = useState<{[key: string]: string} | undefined>(undefined)

  const [actionAfterSubmit, setActionAfterSubmit] = useState<'TO_MATCH' | 'RESET_FORM' | undefined>(undefined)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: 'None',
      top8: false,
    }
  })

  const { register, handleSubmit, setValue, getValues, reset, resetField, watch, formState: {errors, isSubmitting}} = form

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    if(getValues('top8')){
      delete data.swissRound
    }

    if(!getValues('top8')){
      delete data.top8Round
    }

    const matchid = searchParams?.get('matchid')

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/${matchid ? matchid : ''}`

    fetch(url, {
      cache: 'no-store',
      method: matchid ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = matchSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(validatedData.data)
        toast.success(`Post Match Success for ${validatedData.data._id}`)
        if(actionAfterSubmit === 'RESET_FORM'){
          resetField('videolink')
          resetField('link')
          resetField('player1hero')
          resetField('player2hero')
          resetField('player1name')
          resetField('player2name')
          resetField('timeStamp')
          resetField('twitchTimeStamp')

          grabEventNames()
          grabNameHeroPairs()
        }

        if(actionAfterSubmit === 'TO_MATCH'){
          router.push(`match/${validatedData.data._id}`)
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
    // get match data if we are editing a match

    const matchid = searchParams?.get('matchid')
    const eventName = searchParams?.get('eventname')
    const lastRound = searchParams?.get('lastRound')
    const lastFormat = searchParams?.get('lastFormat')
    const lastTwitch = searchParams?.get('lastTwitch')

    if(eventName && !matchid){
      setValue('event', eventName)
    }

    if(!matchid && lastRound){
      if(lastRound === 'Finals' || lastRound === 'Semi Finals' || lastRound === 'Quarter Finals'){
        setValue('top8', true)
        setValue('top8Round', lastRound)
      } else {
        setValue('top8', false)
        setValue('swissRound', parseInt(lastRound))
      }
    }

    if(!matchid && lastFormat){
      if(lastFormat === 'Classic Constructed' || lastFormat === 'Blitz' || lastFormat === 'Draft' || lastFormat === 'Sealed' || lastFormat === 'Sealed' || lastFormat === 'Living Legend'){
        setValue('format', lastFormat)
      }
    }

    if(!matchid && lastTwitch){
      if(lastTwitch === 'true'){
        setValue('twitch', true)
      } else if (lastTwitch === 'false'){
        setValue('twitch', false)
      }
    }

    if(matchid){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/${matchid}`
      fetch(url, {
        cache: 'no-store'
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = matchSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const {event, format, top8, swissRound, top8Round, twitch, twitchTimeStamp, link, timeStamp, date, player1name, player1hero, 
          //player1deck, 
          player2name, player2hero, 
          //player2deck
          } = validatedData.data
          reset({
            event: event.name, 
            format, 
            top8, 
            top8Round: top8Round ? top8Round : undefined,
            swissRound: swissRound ? swissRound : undefined, 
            twitch, 
            twitchTimeStamp: twitchTimeStamp ? twitchTimeStamp : undefined, 
            link, 
            timeStamp: timeStamp ? timeStamp : undefined, 
            date: date ? date : undefined, 
            player1name, 
            player1hero, 
            //player1deck, 
            player2name, 
            player2hero, 
            //player2deck
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

    grabEventNames()

  }, [])

  const grabEventNames = () => {
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
      toast(err.message)
    })
  }

  const grabNameHeroPairs = () => {
    //grab name-hero pairs
    if(getValues('event') && getValues('format')){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/getnameheropairsbyevent/?&event=${getValues('event')}&format=${getValues('format')}`

      fetch(url)
      .then(r => r.json())
      .then(data => {
        const validatedData = z.record(z.string()).safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          setNameHeroPairs(validatedData.data)
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
  }

  useEffect(() => {
    grabNameHeroPairs()
  }, [watch('event'), watch('format')])

  useEffect(() => {
    if(nameHeroPairs && nameHeroPairs[getValues('player1name')]){
      setValue('player1hero', nameHeroPairs[getValues('player1name')])
    }
  }, [watch('player1name')])

  useEffect(() => {
    if(nameHeroPairs && nameHeroPairs[getValues('player2name')]){
      setValue('player2hero', nameHeroPairs[getValues('player2name')])
    }
  }, [watch('player2name')])

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
    const matchid = searchParams?.get('matchid')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches/${matchid}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = matchSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(matchid + ' Successfully deleted')
        toast.success(matchid + ' Successfully deleted')
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

        { searchParams?.get('matchid') &&
          <div className="absolute top-[8px] right-[8px]">
            <DeleteButton warningText="Are you sure you want to delete this match? It cannot be restored" deleteAction={deleteAction}/>
          </div>
        }

        

        <div className="text-[24px] self-center">{searchParams?.get('matchid') ? 'Edit' : 'Post'} Match</div>

        <div className="flex flex-col w-[100%]">
          <label>Event Name: <span className="text-red-500">*</span></label>
          <Select placeholder='Event Name' name='event' form={form} data={eventNames}/>
        </div>

        <div className="flex flex-col">
          <label>Format: <span className="text-red-500">*</span></label>
          <Select placeholder='Format' name='format' form={form} data={['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed']}/>
        </div>


        <div className="flex flex-col">
          <label>Round Type <span className="text-red-500">*</span></label>
          <div className="flex flex-row items-center gap-[16px]">
            <div className="w-[64px]">
              <CustomRadio options={{'Top 8': true, 'Swiss': false}} form={form} name="top8" flexDirection="col"/>
            </div>
            {watch('top8') ? 
              <div className="flex flex-col">
                <label>Top 8 Round: &nbsp;</label>
                <Select placeholder="" name='top8Round' form={form} data={['Quarter Finals', 'Semi Finals', 'Finals']}/>
              </div>
              :
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
          <label>Player 1 Full Name: <span className="text-red-500">*</span>&nbsp;</label>
          <NameSelect placeholder='' name='player1name' form={form}/>
        </div>

        <div className="flex flex-col">
          <label>Player 1 Hero: <span className="text-red-500">*</span>&nbsp;</label>
          <HeroSelect placeholder="" name="player1hero" form={form}/>
        </div>

        <div className="flex flex-col">
          <label>Player 2 Full Name: <span className="text-red-500">*</span>&nbsp;</label>
          <NameSelect placeholder='' name='player2name' form={form} />
        </div>

        <div className="flex flex-col">
          <label>Player 2 Hero: <span className="text-red-500">*</span>&nbsp;</label>
          <HeroSelect placeholder="" name="player2hero" form={form}/>
        </div>

        <button onClick={() => setActionAfterSubmit('TO_MATCH')} disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] w-[80%] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit & go to match"}
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
export default Postmatch