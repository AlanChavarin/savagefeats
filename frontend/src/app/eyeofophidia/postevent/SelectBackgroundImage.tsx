
'use client'
import { errorSchema } from "@/app/schemas/schemas"
import { useState, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import Image from "next/image"
import DeleteButton from "../helperComponents/DeleteButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

const backgroundImagesSchema = z.array(z.object({
    image: z.string(),
    bigImage: z.string()
}))

type backgroundImagesSchemaType = z.infer<typeof backgroundImagesSchema>


function SelectBackgroundImage({form, setChooseBackgroundImageToggle}: {form: UseFormReturn<any>, setChooseBackgroundImageToggle: (bool: boolean) => void}) {

    const {control, register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

    const [backgroundImages, setBackgroundImages] = useState<backgroundImagesSchemaType | undefined>(undefined)

    useEffect(() => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events/getallbackgroundimagelinks`

        fetch(url)
        .then(r => r.json())
        .then(data => {
            const validatedData = backgroundImagesSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setBackgroundImages(validatedData.data)
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

    }, [])


    const deleteAction = (image: string, bigImage: string) => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}events/deletebackgroundimage`

        fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                image,
                bigImage
            })
          })
        .then(r => r.json())
        .then(data => {
            const validatedData = backgroundImagesSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
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

    const onClick = (image: string, bigImage: string) => {
        setValue('image', image)
        setValue('bigImage', bigImage)
        setChooseBackgroundImageToggle(false)
    }
 
  return (
    <div className="flex flex-row gap-[32px] box-shadow bg-white w-[80vw] h-[80vh] border-[1px] border-black absolute z-[3]">
        <div className="w-full h-full flex flex-row flex-wrap items-center justify-center overflow-y-auto gap-[16px] py-[64px] md:py-[16px]">

            <div className="absolute top-[8px] right-[24px] text-[16px] w-[24px] h-[24px] flex justify-center items-center bg-gray-100 hover:bg-gray-300 border-[1px] border-black box-shadow-extra-small cursor-pointer" onClick={() => setChooseBackgroundImageToggle(false)}>
                <FontAwesomeIcon icon={faX} />
            </div>
            
            {backgroundImages && backgroundImages.map(item => 
                <div onClick={() => onClick(item.image, item.bigImage)} className="relative w-[90%] h-[150px] md:w-[300px] md:h-[200px] cursor-pointer box-shadow-small hover:box-shadow" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${item.image}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>
                    <div className="absolute top-[2px] right-[2px]">
                        <DeleteButton warningText="Are you sure you want to remove this background image from all events?" deleteAction={() => deleteAction(item.image, item.bigImage)}/>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
export default SelectBackgroundImage