'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "../helperComponents/Select"
import { useState, useEffect} from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import { deckSchema, errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import HeroSelect from "../helperComponents/HeroSelect"
import { useSearchParams } from "next/navigation"
import DeleteButton from "../helperComponents/DeleteButton"
import NameSelect from "../helperComponents/NameSelect"
import getYoutubeParams from "../helpers/YoutubeParams"
import CustomRadio from "../helperComponents/CustomRadio"

const formSchema = z.object({
  playerName: z.string().min(1),
  hero: z.string().min(1),
  event: z.string().optional(),
  decklistLink: z.string().min(1),
  format: z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', 'Mixed', '']),
  placement: z.coerce.number().optional(),
  placementRangeEnding: z.coerce.number().optional(),
  placementPreset: z.tuple([z.number(), z.number().optional()]).optional(),
  deckTech: z.string().optional(),
  //dummy fields that the backend doesnt actually accept
  videoLink: z.string().optional(),
})

type FormFields = z.infer<typeof formSchema>

function Postmatch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [eventNames, setEventNames] = useState<string[] | undefined>(undefined)
  const [nameHeroPairs, setNameHeroPairs] = useState<{[key: string]: string} | undefined>(undefined)


  const form = useForm<FormFields>({resolver: zodResolver(formSchema),})

  const { register, handleSubmit, setValue, getValues, reset, watch, resetField, formState: {errors, isSubmitting}} = form

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    const deckid = searchParams?.get('deckid')

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}decklists/${deckid ? deckid : ''}`

    fetch(url, {
      cache: 'no-store',
      method: deckid ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = deckSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        toast.success(`${deckid ? 'Update' : 'Post'} Deck Success for ${validatedData.data._id}`)
        resetField('playerName')
        resetField('hero')
        resetField('decklistLink')
        resetField('videoLink')
        resetField('deckTech')

        grabNameHeroPairs()

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

    const deckid = searchParams?.get('deckid')
    const eventName = searchParams?.get('eventname')
    const lastFormat = searchParams?.get('lastFormat')
    
    if(eventName && !deckid){
      setValue('event', eventName)
    }

    if(lastFormat){
      if(lastFormat === 'Classic Constructed' || lastFormat === 'Blitz' || lastFormat === 'Living Legend'){
        setValue('format', lastFormat)
      }
    }

    if(deckid){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}decklists/${deckid}`
      fetch(url, {
        cache: 'no-store'
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = deckSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const {event, format, playerName, placement, placementRangeEnding, hero, decklistLink, deckTech} = validatedData.data
          reset({
            event: event && event.name, 
            format, 
            playerName,
            hero,
            placement, 
            placementRangeEnding,
            decklistLink,
            deckTech
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
        toast.success(err.message)
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

  const deleteAction = () => {
    const deckid = searchParams?.get('deckid')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}decklists/${deckid ? deckid : ''}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = deckSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(deckid + ' Successfully deleted')
        toast.success(deckid + ' Successfully deleted')
        router.push(`/eyeofophidia/decks`)
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error?.toString())
      console.error(validatedError.error.toString())
      throw new Error('Unexpected event name data. Check console for further details')
    })
  }

  const videoLinkOnChange = () => {
    const videoLink = getValues('videoLink')

    if(videoLink){
      const params = getYoutubeParams(videoLink)
      setValue('deckTech', params.id)
    }
    
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
    if(nameHeroPairs && nameHeroPairs[getValues('playerName')]){
      setValue('hero', nameHeroPairs[getValues('playerName')])
    }
  }, [watch('playerName')])

  useEffect(() => {
    const placementPreset = getValues('placementPreset')
    if(placementPreset){
      setValue('placement', placementPreset[0])
      if(placementPreset[1]){
        setValue('placementRangeEnding', placementPreset[1])
      } else {
        setValue('placementRangeEnding', undefined)
      }
    }
  }, [watch('placementPreset')])

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

        { searchParams?.get('deckid') &&
          <div className="absolute top-[8px] right-[8px]">
            <DeleteButton warningText="Are you sure you want to delete this deck? It cannot be restored" deleteAction={deleteAction}/>
          </div>
        }

        <div className="text-[24px] self-center">{searchParams?.get('deckid') ? 'Edit' : 'Post'} Deck</div>

        <div className="flex flex-col w-[100%]">
          <label>Event Name:</label>
          <Select placeholder='Event Name' name='event' form={form} data={eventNames}/>
        </div>

        <div className="flex flex-col w-[100%]">
          <label>Format: <span className="text-red-500">*</span></label>
          <Select placeholder='Format' name='format' form={form} data={['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed']}/>
        </div>
  
        <div className="flex flex-col">
          <label>Full Player Name <span className="text-red-500">*</span>&nbsp;</label>
          <NameSelect placeholder='' name='playerName' form={form}/>
        </div>

        <div className="flex flex-col">
          <label>Hero <span className="text-red-500">*</span>&nbsp;</label>
          <HeroSelect placeholder="" name="hero" form={form}/>
        </div>


        <BasicTextInput placeholder='' name='decklistLink' label='Decklist Link: ' register={register} required={true}/>

        <BasicTextInput placeholder='' name='videoLink' label='Deck Tech Link: ' register={register} required={false} onChange={videoLinkOnChange}/>

        <BasicTextInput placeholder='' name='deckTech' label="Deck Tech Video ID" register={register} required={false}/>

        <div className="flex flex-col">
          <label>Placement Preset:</label>
          <CustomRadio options={{
            '1st': [1, undefined], 
            '2nd': [2, undefined],
            '3-4th': [3,4],
            '5-8th': [5,8],
            '9th-16th': [9, 16],
            '17th-32th': [17, 32]
            }} form={form} name="placementPreset"/>
        </div>

        <div className="flex flex-row">
          <label>Placement: &nbsp;</label>
          <input className="border-black border-[1px] w-[48px]" {...register('placement')} type="number" min='0'/>
        </div>

        <div className="flex flex-row">
          <label>Placement Ending Range: &nbsp;</label>
          <input className="border-black border-[1px] w-[48px]" {...register('placementRangeEnding')} type="number" min='0'/>
        </div>

        <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[48px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button disabled={isSubmitting} type="reset" onClick={() => reset()} className="bg-custom-gray hover:bg-custom-grayHover py-[4px] px-[12px] mt-[16px] border-[1px] text-[14px] border-black box-shadow-extra-small">
          Reset Form
        </button>

      </form>
    </div>
  )
}
export default Postmatch