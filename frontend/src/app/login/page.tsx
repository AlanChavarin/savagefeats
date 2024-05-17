'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import UserContext from "@/context/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";
//schemas
import {errorSchema} from '../schemas/schemas'

const formSchema = z.object({
    name: z.string().min(8),
    password: z.string().min(8),
});

const tokenSchema = z.object({
    token: z.string().min(20), //json web tokens prob more than 20 characters big i think
})

type FormFields = z.infer<typeof formSchema>

function page() {

    const {initUser} = useContext(UserContext)

    const {register, handleSubmit, setError, formState: { errors, isSubmitting }}
    = useForm<FormFields>({
        resolver: zodResolver(formSchema),
      });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
            fetch(`http://localhost:5000/api/users/login`, {
                method: 'POST',
                headers:{
                    'content-type': 'application/json' 
                },
                body: JSON.stringify(data)
            })
            .then(r => r.json())
            .then(data => {
                const validatedData = tokenSchema.safeParse(data)
                const validatedError = errorSchema.safeParse(data)
                if(validatedData.success){
                    localStorage.setItem('token', validatedData.data.token)
                    initUser()
                    toast('Login Successful!')
                    return
                }

                if(validatedError.success){
                    throw new Error(validatedError.data.errorMessage)
                }

                console.error(validatedData.error)
                console.error(validatedError.error)
                throw new Error('Unexpected data. Check console for further details')
            }).catch(err => {
                toast(err.message);
                setError("root", {
                    message: err.message,
                })
            })
    };

  return (
    <div className="flex-1 overflow-hidden flex flex-col gap-[32px] pb-[128px] items-center w-[100%] min-h-[700px] justify-center">
        <form className="flex flex-col gap-[12px] w-[256px] border-black box-shadow bg-white p-[16px]" onSubmit={handleSubmit(onSubmit)}>

            <div className="font-bold text-center text-[22px]">Admin Login</div>
            
            <label htmlFor="name">Username</label>

            <input {...register("name")} name="name" type="text" placeholder="username123" className="border-[1px] p-[4px] rounded-[3px]"/>

            <label htmlFor="password">Password</label>

            <input {...register("password")} type="password" placeholder="password" className="border-[1px] p-[4px] rounded-[3px]"/>

            <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover font-bold p-[4px]">
                {isSubmitting ? "Loading..." : "Submit"}
            </button>

            {errors.root && <div className="text-red-500">
                {errors.root.message}
            </div>}

        </form>
    </div>
  )
}
export default page