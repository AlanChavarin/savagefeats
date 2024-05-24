import { UseFormReturn } from "react-hook-form"

interface OptionsType {
    [key: string]: any;  //{displayValue: ActualValueThatGoesInState}
  }

function CustomRadio({options, form, name}: {options: OptionsType, form: UseFormReturn, name: string}) {
  const {setValue, watch} = form

  const handleClick = (value: any) => {
    setValue(name, value)
  }

  return (
    <div className="flex flex-row gap-[8px] flex-wrap">
        {Object.keys(options).map(key => <>
            {watch(name) === options[key] ? 
                <div onClick={() => handleClick(options[key])} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-custom-primary box-shadow-extra-small">
                    {key}
                </div>
                :
                <div onClick={() => handleClick(options[key])} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-white box-shadow-extra-small">
                    {key}
                </div>            
            }
        </>)}
    </div>
  )
}
export default CustomRadio