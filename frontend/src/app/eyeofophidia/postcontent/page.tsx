'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "../helperComponents/Select"
import { useState, useEffect} from "react"
import BasicTextInput from "../helperComponents/BasicTextInput"
import { contentSchema, errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import getYoutubeParams from "../helpers/YoutubeParams"
import DeleteButton from "../helperComponents/DeleteButton"

const formSchema = z.object({
  parentEventName: z.string().optional(),
  videoid: z.string().min(1),
  //dummy fields that the backend doesnt actually accept
  videoLink: z.string().optional(),
})

type FormFields = z.infer<typeof formSchema>

function Postcontent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [eventNames, setEventNames] = useState<string[] | undefined>(undefined)

  const form = useForm<FormFields>({resolver: zodResolver(formSchema),})

  const { register, handleSubmit, setValue, getValues, reset, watch, resetField, formState: {errors, isSubmitting}} = form

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content`

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
      const validatedData = contentSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        toast.success(`Post Deck Success for ${validatedData.data._id}`)
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

    const eventName = searchParams?.get('eventname')

    if(eventName){
      setValue('parentEventName', eventName)
    }

  }, [])

  const videoLinkOnChange = () => {
    const videoLink = getValues('videoLink')

    if(videoLink){
      const params = getYoutubeParams(videoLink)
      setValue('videoid', params.id)
    }
    
  }

  const deleteAction = () => {
    const eventid = searchParams?.get('eventid')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content/byevent/${eventid}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(r => {
      if(r.status === 200){
        toast.success('Content Successfully deleted')
        router.push(`event/${eventid}`)
      } else {
        throw new Error('something went wrong')
      }
    })
    .catch(error => {
      toast.error(error.message)
      console.error(error.message)
    })
  }

  return (
    <div className="flex-1 flex justify-center items-start my-[32px]">
      <form onSubmit={handleSubmit(onSubmit)} className="relative font-bold flex flex-col gap-[8px] items-start bg-white border-[1px] border-black w-[90%] px-[16px] pt-[16px] pb-[24px] box-shadow-extra-small max-w-[300px]">

        { searchParams?.get('eventid') &&
          <div className="absolute top-[8px] right-[8px]">
            <DeleteButton warningText="Are you sure you want to delete the video content(this doesnt include matches) for this event? It cannot be restored" deleteAction={deleteAction}/>
          </div>
        }

        {Object.keys(errors).map((key) => {
          // @ts-ignore
          const error = errors[key as keyof FormData] 
          return (
            <div key={key} className="text-red-500">
              {key}: {error?.message}
            </div>
          )
        })}

        <div className="text-[24px] self-center">Post Content</div>

        <div className="flex flex-col w-[100%]">
          <label>Event Name:</label>
          <Select placeholder='Event Name' name='parentEventName' form={form} data={eventNames}/>
        </div>

        <BasicTextInput placeholder='' name='videoLink' label='Full Link: ' register={register} required={false} onChange={videoLinkOnChange}/>

        <BasicTextInput placeholder='' name='videoid' label="Video ID" register={register} required={true}/>

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
export default Postcontent