import { SyntheticEvent } from "react"
import { UseFormRegister } from "react-hook-form"

function BasicTextInput({placeholder, name, label, register, required, onChange}: {placeholder: string | undefined, name: string, label: string, register: UseFormRegister<any>, required: boolean, onChange?(): void}) {

  return (
    <div className="flex flex-col w-[100%]">
        <label>{label}{required && <span className="text-red-500">*</span>}</label>
        <input type="text" {...register(name, {
          required,
          onChange: onChange
          })} className=" flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[0px] focus:outline-none hover:cursor-text box-shadow-extra-small focus:border-[2px]" placeholder={placeholder}/>
    </div>
  )
}
export default BasicTextInput