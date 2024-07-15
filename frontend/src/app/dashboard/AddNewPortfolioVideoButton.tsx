'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import BasicTextInput from "../eyeofophidia/helperComponents/BasicTextInput"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { errorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import getYoutubeParams from "../eyeofophidia/helpers/YoutubeParams"

const formSchema = z.object({
    // dummy field
    videolink: z.string(),
    videoid: z.string(),
    type: z.string(),
})

const responseSchema = z.object({
  videoid: z.string()
})

type FormFields = z.infer<typeof formSchema>

function AddNewPortfolioVideoButton() {

    const [editMode, setEditMode] = useState<boolean>(false)

    const form = useForm<FormFields>({resolver: zodResolver(formSchema), defaultValues: {type: 'portfolio'}})

    const {register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

    const onSubmit: SubmitHandler<FormFields> = async (data) => { 
    
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content/`
    
        await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
          const validatedData = responseSchema.safeParse(data)
          const validatedError = errorSchema.safeParse(data)
          if(validatedData.success){
            console.log(validatedData.data)
            toast.success(`portfolio success post success for: ${validatedData.data.videoid}`)
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

    const videoLinkOnChange = () => {
      const params = getYoutubeParams(getValues('videolink'))
      setValue('videoid', params.id)
    }

    useEffect(() => {
      if(editMode){
        reset()
      }
    }, [])

  return (
    <div className="flex flex-col gap-[8px]">
       
        { editMode ?
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-white border-[1px] border-black py-[8px] px-[16px] box-shadow-extra-small font-bold gap-[16px] flex flex-col relative">
                <div className="text-center">Post Portfolio video Form</div>

                <BasicTextInput register={register} placeholder="full link (not required)" name="videolink" label="video link" required={true} onChange={videoLinkOnChange}/>

                <BasicTextInput register={register} placeholder="youtube ID" name="videoid" label="video id" required={true} />

                {/* absolute elements */}
                <button type="button" onClick={() => setEditMode(false)} className="absolute top-[8px] right-[8px] border-[1px] border-black bg-gray-200 hover:bg-gray-400 w-[24px] h-[24px] text-[13px] box-shadow-extra-small ">
                    <FontAwesomeIcon icon={faX}/>
                </button>

                <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[24px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            :
            <button onClick={() => setEditMode(!editMode)} type="button" className="bg-white hover:bg-gray-200 border-[1px] border-black w-fit flex flex-col justify-center items-center px-[8px] cursor-pointer mt-[8px]relative l gap-[4px]">+ Add to Portfolio</button>
            
        }

    </div>
  )
}
export default AddNewPortfolioVideoButton