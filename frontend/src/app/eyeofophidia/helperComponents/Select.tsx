'use client'
import { useState, SyntheticEvent } from "react"
import { UseFormReturn } from "react-hook-form"

function Select({placeholder, name, form, data}: {placeholder: string | undefined, name: string, form: UseFormReturn, data: string[] | undefined}) {
  const {register, setValue} = form
  const [dropdown, setDropdown] = useState<boolean>(false)
  var a = document.getElementsByClassName('dropdownItem')

  const onFilter = (e: SyntheticEvent) => {
    // @ts-ignore
    var filter1 = e.target.value.toUpperCase()
    for (var i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent;
      if (txtValue && txtValue.toUpperCase().indexOf(filter1) > -1) {
        // @ts-ignore
        a[i].style.display = ""
      } else {
        // @ts-ignore
        a[i].style.display = "none"
      }
    }
  }

  const onFocus = () => {
    setDropdown(true)
  }

  const onBlur = () => {
    setTimeout(() => setDropdown(false), 100)
  }

  return (
    <div>
      <input 
        placeholder={placeholder} 
        className="focus:outline-none focus:border-[2px] rounded-none max-w-[196px] flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[1px] relative box-shadow-extra-small "
        onFocus={() => onFocus()} 
        {...register(name, {
          onChange: (e: SyntheticEvent) => {onFilter(e)},
          onBlur: () => {onBlur()},
        })}
      />
      <span className="absolute border-[2px] border-black max-h-[150px] overflow-y-scroll bg-white z-[10] w-[196px] box-shadow-extra-small" style={{visibility: dropdown ? "visible" : "hidden"}}>
        {data?.map((item) => (<div onClick={() => setValue(name, item)} className='hover:bg-custom-whiteHover cursor-pointer dropdownItem text-[16px] font-normal' key={item}>{item}</div>))}
      </span>
    </div>
  )
}
export default Select