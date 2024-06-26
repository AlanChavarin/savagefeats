'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect} from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import BasicTextInput from "../eyeofophidia/helperComponents/BasicTextInput"
import { errorSchema, reportSchema } from "../schemas/schemas"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const formSchema = z.object({
    subject: z.string().min(1),
    body: z.string().min(1),
  })

type FormFields = z.infer<typeof formSchema>


function report() {

    const form = useForm<FormFields>({resolver: zodResolver(formSchema),})

    const { register, handleSubmit, setValue, getValues, reset, resetField, formState: {errors, isSubmitting}} = form

    const { executeRecaptcha } = useGoogleReCaptcha()



    const onSubmit: SubmitHandler<FormFields> = async (data) => { 

        if(!executeRecaptcha){
            toast.error("Recaptcha not working")
            return
        }

        const gRecaptchaToken = await executeRecaptcha('inquirySubmit')


        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}reports`
        fetch(url, {
            cache: 'no-store',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: data.subject,
                body: data.body,
                token: gRecaptchaToken
            })
          })
          .then(r => r.json())
          .then(data => {
            const validatedData = reportSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                toast.success(`report successfully sent! Thank you!`)
                reset()
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

  return (
    <div className="flex-1 flex justify-center items-start my-[32px]">
        <form onSubmit={handleSubmit(onSubmit)} className="relative font-bold flex flex-col gap-[8px] items-start bg-white border-[1px] border-black w-[90%] px-[16px] pt-[16px] pb-[24px] box-shadow-extra-small max-w-[450px]">

            {Object.keys(errors).map((key) => {
            // @ts-ignore
            const error = errors[key as keyof FormData] 
            return (
                <div key={key} className="text-red-500">
                {key}: {error?.message}
                </div>
            )
            })}

            <BasicTextInput placeholder='' name='subject' label='Subject: ' register={register} required={true}/>


            <div className="flex flex-col w-[100%]">
                <label>Body: <span className="text-red-500">*</span></label>
                <textarea rows={8} {...register('body')} className=" flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[0px] focus:outline-none hover:cursor-text box-shadow-extra-small focus:border-[2px]" placeholder={'Body Text'}/>
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
export default report