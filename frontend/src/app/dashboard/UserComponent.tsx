'use client'
import { userSchemaType } from "../types/types"
import { useState, useEffect, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faX, faCheck, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { z } from "zod"
import { SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomRadio from "../eyeofophidia/helperComponents/CustomRadio"
import { userSchema, errorSchema } from "../schemas/schemas"
import { toast } from "react-toastify"
import UserContext from "@/context/UserContext"

const formSchema = z.object({
    verified: z.boolean(),
    privilege: z.string(),
})

type FormFields = z.infer<typeof formSchema>

function UserComponent({userData, grabUsers}: {userData: userSchemaType, grabUsers: () => void}) {

    const {user} = useContext(UserContext)

    const [editMode, setEditMode] = useState<boolean>(false)

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          verified: userData.verified,
          privilege: userData.privilege
        }
      })

    const {register, handleSubmit, setValue, getValues, reset, watch, formState: {errors, isSubmitting}} = form

    useEffect(() => {
        reset()
    }, [editMode])

    const onSubmit: SubmitHandler<FormFields> = async (data) => { 
    
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}users/changeprivileges/${userData.name}`
    
        fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
          const validatedData = userSchema.safeParse(data)
          const validatedError = errorSchema.safeParse(data)
          if(validatedData.success){
            console.log(validatedData.data)
            toast(`User edit success for user: ${validatedData.data.name}`)
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

        const url2 = `${process.env.NEXT_PUBLIC_BACKEND_API}users/verify/${userData.name}`

        fetch(url2, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(r => r.json())
          .then(data => {
            const validatedData = userSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
              console.log(validatedData.data)
              toast(`User verify edit success for user: ${validatedData.data.name}`)
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

          //get new updated data
          grabUsers()
      }

  return (
    <div className="bg-gray-100 border-[1px] border-black box-shadow-extra-small w-fit p-[4px] gap-[4px] flex flex-col">
        <div>Username: {userData.name}</div>
        <div>verified: {userData.verified.toString()}</div>
        <div>privilege: {userData.privilege}</div>
        <button onClick={() => setEditMode(!editMode)} className="bg-white hover:bg-gray-200 border-[1px] border-black w-fit flex flex-row justify-center items-center gap-[8px] px-[8px] cursor-pointer">
            Edit User
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
                  Edit form for user: <br/><span className="underline">{userData.name}</span>
                  {(user && (user.name === userData.name)) && <div className="text-red-500">WARNING, CHANGING YOUR OWN PRIVILEGES CAN BE DISASTROUS, PROCEDE AT YOUR OWN RISK</div>}
              </div>

              <div className="flex flex-row gap-[4px] cursor-pointer" onClick={() => {setValue('verified', !watch('verified'))}}>
                  <label>Verified: </label>
                  <div className={`${watch('verified') && 'bg-custom-primary'} box-shadow-extra-small w-[24px] h-[24px] flex justify-center items-center border-[1px] border-black  `}>
                      {watch('verified') && <FontAwesomeIcon icon={faCheck} />}
                  </div>
              </div>

              <div className="flex flex-row gap-[8px] items-center">
                  <label>Privilege:</label>
                  <CustomRadio options={{'user': 'user', 'admin': 'admin'}} form={form} name="privilege"/>
              </div>

              {/* absolute elements */}
              <button type="button" onClick={() => setEditMode(false)} className="absolute top-[8px] right-[8px] border-[1px] border-black bg-gray-200 hover:bg-gray-400 w-[24px] h-[24px] text-[13px] box-shadow-extra-small ">
                  <FontAwesomeIcon icon={faX}/>
              </button>

              <button disabled={isSubmitting} type="submit" className="bg-custom-primary hover:bg-custom-primaryHover py-[8px] px-[24px] mt-[16px] self-center border-[1px] border-black box-shadow-extra-small">
                  {isSubmitting ? "Submitting..." : "Submit"}
              </button>
          </form>
        }
    </div>
  )
}
export default UserComponent