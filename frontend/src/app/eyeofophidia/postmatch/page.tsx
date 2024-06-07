'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import CustomRadio from "../helperComponents/CustomRadio"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "../helperComponents/Select"
import { useState, useEffect, SyntheticEvent } from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import { matchSchema, errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import getYoutubeParams from '../helpers/YoutubeParams'
import { getTwitchParams } from "../helpers/TwitchParams"
import HeroSelect from "../helperComponents/HeroSelect"
import { useSearchParams } from "next/navigation"

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
  player1deck: z.string(),

  player2name: z.string().min(1),
  player2hero: z.string().min(1),
  player2deck: z.string(),


  //dummy fields that the backend doesnt actually accept
  videolink: z.string(),

})

type FormFields = z.infer<typeof formSchema>

function Postmatch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [eventNames, setEventNames] = useState<string[] | undefined>(undefined)

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: 'None',
      top8: false,
    }
  })

  const { register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}matches`

    fetch(url, {
      cache: 'no-store',
      method: 'POST',
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
        toast(`Post Match Success for ${validatedData.data._id}`)
        router.push(`match/${validatedData.data._id}`)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast(err.message)
    })

  }

  useEffect(() => {
    // get match data if we are editing a match

    const matchid = searchParams.get('matchid')

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
          const {event, format, top8, swissRound, top8Round, twitch, twitchTimeStamp, link, timeStamp, date, player1name, player1hero, player1deck, player2name, player2hero, player2deck} = validatedData.data
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
            player1deck, 
            player2name, 
            player2hero, 
            player2deck
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

        <div className="text-[24px] self-center">{searchParams.get('matchid') ? 'Edit' : 'Post'} Match</div>

        <div className="flex flex-col w-[100%]">
          <label>Format: <span className="text-red-500">*</span></label>
          <Select placeholder='Event Name' name='event' form={form} data={eventNames}/>
        </div>

        <div className="flex flex-col w-[100%]">
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
          <label>Player 1 Hero: <span className="text-red-500">*</span>&nbsp;</label>
          <HeroSelect placeholder="" name="player1hero" form={form}/>
        </div>
        <BasicTextInput placeholder='' name='player1name' label='Player 1 Full Name: ' register={register} required={true}/>
        <BasicTextInput placeholder='' name='player1deck' label='Player 1 Deck Link: ' register={register} required={false}/>

        <div className="flex flex-col">
          <label>Player 2 Hero: <span className="text-red-500">*</span>&nbsp;</label>
          <HeroSelect placeholder="" name="player2hero" form={form}/>
        </div>
        <BasicTextInput placeholder='' name='player2name' label='Player 2 Full Name: ' register={register} required={true}/>
        <BasicTextInput placeholder='' name='player2deck' label='Player 2 Deck Link: ' register={register} required={false}/>


        <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[48px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  )
}
export default Postmatch