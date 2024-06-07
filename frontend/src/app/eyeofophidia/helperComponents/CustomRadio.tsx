import { UseFormReturn } from "react-hook-form"

interface OptionsType {
    [key: string]: any;  //{displayValue: ActualValueThatGoesInState}
  }

function CustomRadio({options, form, name, flexDirection}: {options: OptionsType, form: UseFormReturn<any>, name: string, flexDirection?: ('row' | 'col')}) {
  const {setValue, watch} = form

  const handleClick = (value: any) => {
    setValue(name, value)
  }

  return (
    <div className={`flex ${flexDirection ? `flex-${flexDirection}` : 'flex-row'} gap-[8px] flex-wrap`}>
        {Object.keys(options).map(key => <div key={key}>
            {watch(name) === options[key] ? 
                <div onClick={() => handleClick(options[key])} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-custom-primary box-shadow-extra-small flex items-center justify-center">
                    {key}
                </div>
                :
                <div onClick={() => handleClick(options[key])} className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-white box-shadow-extra-small flex items-center justify-center">
                    {key}
                </div>            
            }
        </div>)}
    </div>
  )
}
export default CustomRadio