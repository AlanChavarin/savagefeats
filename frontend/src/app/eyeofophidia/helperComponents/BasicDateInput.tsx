import { UseFormRegister } from "react-hook-form"


function BasicDateInput({name, register}: {name: string, register: UseFormRegister<any>}) {
  return (
    <input {...register(name)} type="date" className="text-custom-gray flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[0px] focus:outline-none hover:cursor-text box-shadow-extra-small focus:border-[2px]"/>
  )
}
export default BasicDateInput