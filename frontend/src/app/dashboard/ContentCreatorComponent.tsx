'use client'
import { contentCreatorSchemaType } from "../types/types"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faX, faCheck, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { z } from "zod"
import { SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { errorSchema, contentCreatorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import BasicTextInput from "../eyeofophidia/helperComponents/BasicTextInput"
import DeleteButton from "../eyeofophidia/helperComponents/DeleteButton"
import sleep from './sleep'

const formSchema = z.object({
    featured: z.boolean(),
    backgroundImage: z.string(),
})

type FormFields = z.infer<typeof formSchema>

function ContentCreatorComponent({contentCreator, grabContentCreators}: {contentCreator: contentCreatorSchemaType, grabContentCreators: () => void}) {

    const [editMode, setEditMode] = useState<boolean>(false)

    const form = useForm<FormFields>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          featured: contentCreator.featured,
          backgroundImage: contentCreator.backgroundImage
      }
    })

    const {register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

    useEffect(() => {
        reset()
    }, [editMode])

    const onSubmit: SubmitHandler<FormFields> = async (data) => { 
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}contentcreators/updatecontentcreatornonyoutubedata/${contentCreator._id}`
    
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
          const validatedData = contentCreatorSchema.safeParse(data)
          const validatedError = errorSchema.safeParse(data)
          if(validatedData.success){
            toast(`Content creator edit success for: ${validatedData.data.title}`)
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

        grabContentCreators()
    }


    const deleteAction = () => {

      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}contentcreators/${contentCreator._id}`

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(data => {
        const validatedData = contentCreatorSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          grabContentCreators()
          console.log(validatedData.data.title + ' Successfully deleted')
          toast(validatedData.data.title + ' Successfully deleted')

          return
        }
  
        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }
  
        console.error(validatedData.error?.toString())
        console.error(validatedError.error.toString())
        throw new Error('Unexpected contentcreator data. Check console for further details')
      }).catch(err => {
        toast(err.message)
      })
    }

  return (
    <div className="bg-gray-100 border-[1px] border-black box-shadow-extra-small p-[4px] gap-[8px] flex flex-col">
        <div>Channel Title: {contentCreator.title}</div>
        <div>featured: {contentCreator.featured && contentCreator.featured.toString()}</div>
        <div>background image: <a href="contentCreator.backgroundImage" target="_blank" className="underline hover:text-purple-500 text-wrap break-all">{contentCreator.backgroundImage}</a></div>
        <br/>
        <div>_id: {contentCreator._id}</div>
        <div>channel id: {contentCreator.channelid}</div>

        <button onClick={() => setEditMode(!editMode)} className="bg-white hover:bg-gray-200 border-[1px] border-black w-fit flex flex-row justify-center items-center gap-[8px] px-[8px] cursor-pointer">
            Edit Content Creator
            <FontAwesomeIcon icon={faGear} />
            <FontAwesomeIcon icon={editMode ? faCaretDown : faCaretUp} />
        </button>

        { editMode && 
          <form onSubmit={handleSubmit(onSubmit)} className="relative bg-white border-[1px] border-black py-[8px] px-[16px] box-shadow-extra-small font-bold gap-[16px] flex flex-col">
              {Object.keys(errors).map((key) => {
                // @ts-ignore
                const error = errors[key as keyof FormData] 
                return (
                  <div key={key} className="text-red-500">
                    {key}: {error?.message}
                  </div>
                )
              })}

              <div className="text-[13px] font-normal">
                Edit form for content creator: <span className="underline">{contentCreator.title}</span>
              </div>

              <div className="flex flex-row gap-[4px] cursor-pointer" onClick={() => {setValue('featured', !watch('featured'))}}>
                <label>Featured: </label>
                <div className={`${watch('featured') && 'bg-custom-primary'} box-shadow-extra-small w-[24px] h-[24px] flex justify-center items-center border-[1px] border-black  `}>
                  {watch('featured') && <FontAwesomeIcon icon={faCheck} />}
                </div>
              </div>

              <BasicTextInput  placeholder='' name='backgroundImage' label='Background Image Link: ' register={register} required={false}/>

              {/* absolute elements */}
              <button type="button" onClick={() => setEditMode(false)} className="absolute top-[8px] right-[8px] border-[1px] border-black bg-gray-200 hover:bg-gray-400 w-[24px] h-[24px] text-[13px] box-shadow-extra-small ">
                  <FontAwesomeIcon icon={faX}/>
              </button>

              <div className="absolute top-[8px] right-[38px]">
                <DeleteButton warningText="Are you sure you want to delete this content creator?" deleteAction={() => deleteAction()}/>
              </div>
              

              <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[24px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
                  {isSubmitting ? "Submitting..." : "Submit"}
              </button>
          </form>
        }

    </div>
  )
}
export default ContentCreatorComponent