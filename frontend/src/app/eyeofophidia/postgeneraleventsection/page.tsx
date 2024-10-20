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
import { eventSchema, errorSchema, generalEventSectionSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import DeleteButton from "../helperComponents/DeleteButton"
import { getTwitchChannelName, getTwitchParams } from "../helpers/TwitchParams"
import useImageCompression from '../postevent/useImageCompression'
import EventThumbnailEventPage from "../helperComponents/eventThumbnail/EventThumbnailEventPage"
import SelectBackgroundImage from "../postevent/SelectBackgroundImage"
import Select from "../helperComponents/Select"
import getPreviewImage from "./getPreviewImage"

const formSchema = z.object({
  event: z.string(),
  header: z.string().min(3),
  // image
  image: z.any().optional(),

})

type FormFields = z.infer<typeof formSchema>

function Postgeneraleventsection() {

  const [chooseBackgroundImageToggle, setChooseBackgroundImageToggle] = useState(false)

  const [eventNames, setEventNames] = useState<string[]>([])

  const {bigImageCompression, progress} = useImageCompression()

  const searchParams = useSearchParams()
  
  const router = useRouter()

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    }
  })

  const {control, register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

  // ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT  ONSUBMIT 

  const onSubmit: SubmitHandler<FormFields> = async (data) => { 

    const generalEventSectionId = searchParams?.get('generalEventSectionId')

    if(!getValues('image')){
      delete data.image
    }

    const formDataObject = new FormData()
    Object.keys(data).forEach((key, i) => {
        //@ts-ignore
        formDataObject.append(key, data[key])
    })

    formDataObject.set('enctype', "multipart/form-data")

    // formDataObject.forEach((value, key) => {
    //   console.log(`Key: ${key}, Value: ${value}`);
    // })

    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}generalEventSections/${generalEventSectionId ? generalEventSectionId : ''}`

    console.log(url)

    fetch(url, {
      method: generalEventSectionId ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //'Content-type': 'application/json'
      },
      body: formDataObject
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = generalEventSectionSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        //console.log(validatedData.data)
        toast.success(`Post General Event Section Success for ${validatedData.data._id}`)
        router.push(`event/${validatedData.data.eventId}`)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedData.error)
      console.error(validatedError.error)
      throw new Error('Unexpected data. Check console for further details')
    }).catch(err => {
      toast.error(err.message)
    })

  }

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

   useEffect(() => {
    // get general event section data if we are editing a general event section

    const generalEventSectionId = searchParams?.get('generalEventSectionId')
    const eventName = searchParams?.get('eventname')

    grabEventNames()

    if(eventName){
      setValue('event', eventName)
    }

    if(generalEventSectionId){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}generalEventSections/${generalEventSectionId}`
      fetch(url, {
        cache: 'no-store'
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = generalEventSectionSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          const {eventId, header, image} = validatedData.data
          reset({
            header,
            image
          })
          return
        }

        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error.toString())
        console.error(validatedError.error.toString())
        throw new Error('Unexpected general event section data. Check console for further details')
      }).catch(err => {
        toast.error(err.message)
      })
    }
   }, [])

   const deleteAction = () => {
    const generalEventSectionId = searchParams?.get('generalEventSectionId')
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API}generalEventSections/${generalEventSectionId}`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(data => {
      const validatedData = generalEventSectionSchema.safeParse(data)
      const validatedError = errorSchema.safeParse(data)
      if(validatedData.success){
        console.log(generalEventSectionId + ' Successfully deleted')
        toast.success(generalEventSectionId + ' Successfully deleted')
        router.push(`/eyeofophidia/event/${validatedData.data.eventId}`)
        return
      }

      if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
      }

      console.error(validatedError.error.toString())
      throw new Error('Unexpected general event section data. Check console for further details')
    })
  }

  const onChangeImage = async (e: any) => {
    const imageFile = e.target.files[0]
    const compressedImage = await bigImageCompression(imageFile)
    setValue('image', compressedImage)
    //console.log(getValues('image'))
  }

  // JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX SECTION JSX 

  return (
    <div className="flex-1 flex flex-col justify-start gap-[16px] items-center my-[32px] relative">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="relative font-bold flex flex-col gap-[8px] items-start bg-white border-[1px] border-black w-[90%] px-[16px] pt-[16px] pb-[24px] box-shadow-extra-small max-w-[500px]">

        {Object.keys(errors).map((key) => {
          // @ts-ignore
          const error = errors[key as keyof FormData] 
          return (
            <div key={key} className="text-red-500">
              {key}: {error?.message}
            </div>
          )
        })}

        { searchParams?.get('generalEventSectionId') &&
          <div className="absolute top-[8px] right-[8px]">
            <DeleteButton warningText="Are you sure you want to delete this general event section? It cannot be restored" deleteAction={deleteAction}/>
          </div>
        }


        <div className="text-[24px] self-center">Post General Event Section</div>

        <div className="flex flex-col w-[100%]">
          <label>Event Name: <span className="text-red-500">*</span></label>
          <Select placeholder='Event Name' name='event' form={form} data={eventNames}/>
        </div>
        <BasicTextInput label="Header: " register={register} name='header' placeholder='' required={true}/>

        <div>
          <button type="button" onClick={() => setChooseBackgroundImageToggle(true)} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-white hover:bg-gray-300 box-shadow-extra-small flex items-center justify-center m-[8px]">Choose Image</button>
        </div>

        <div className="flex flex-col">
          <label>Header Image: {progress && <span> - Compressing: {progress}%</span>}</label>
          <input type="file" onChange={onChangeImage} className="text-[13px] text-wrap"/>
        </div>

        {watch('image') ? <>
        <label>Image Preview: </label>
        <div className="w-[90vw] self-center flex justify-center">
          {/* display an image preview here */}
          <div className="bg-gray-300 box-shadow-extra-small h-[50%] w-[50%]">
            <img src={getPreviewImage(watch('image'))} alt="header image preview" className="w-full h-full object-cover"/>
          </div>
        </div>
        </> : <></>}

        <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[48px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button disabled={isSubmitting} type="reset" onClick={() => reset()} className="bg-custom-gray hover:bg-custom-grayHover py-[4px] px-[12px] mt-[16px] border-[1px] text-[14px] border-black box-shadow-extra-small">
          Reset Form
        </button>

      </form>

      {chooseBackgroundImageToggle && <SelectBackgroundImage form={form} setChooseBackgroundImageToggle={setChooseBackgroundImageToggle} mode='generalEventSection'/>}
      
    </div>
  )
}
export default Postgeneraleventsection