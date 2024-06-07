'use client'
import { useState, SyntheticEvent, useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

function MultiSelector({placeholder, name, form, data}: {placeholder: string | undefined, name: string, form: UseFormReturn<any>, data: string[] | undefined}) {
  const {register, setValue, watch, getValues} = form
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [items, setItems] = useState<string[] | undefined>()
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

  const addItem = (item: string) => {
    // check if the item isnt already in the array
    if(!watch(name).includes(item)){
        setValue(name, [...watch(name), item])
    } else {
        console.log('item already selected')
    }
    
  }

  const deleteItem = (item: string) => {
    let newArr = watch(name)
    const index = newArr.indexOf(item)
    if(index > -1){
        newArr.splice(index, 1)
    }
    setValue(name, newArr)
  }

  useEffect(() => {
    setItems(watch(name))
  }, [watch(name)])

  return (
    <div className="flex flex-col gap-[4px]">
        <div className="flex flex-row flex-wrap gap-[4px]">
            {items && items.map(item => 
                <div key={item} className="bg-gray-300 rounded-[4px] hover:bg-custom-grayHover hover:text-white cursor-pointer flex flex-row gap-[8px] px-[8px] justify-between items-center"
                onClick={() => deleteItem(item)}
                >
                    <div>{item}</div>
                    {/* <FontAwesomeIcon icon={faX} /> */}
                    <div className="mr-[8px] w-[8px] hover:text-red-500">x</div>
                </div>
            )} 
        </div>
          
    <div>
        <input 
            placeholder={placeholder} 
            className="focus:outline-none focus:border-[2px] rounded-none max-w-[196px] flex flex-row items-center bg-white border-[1px] border-black px-[8px] py-[1px] relative box-shadow-extra-small "
            onFocus={() => onFocus()} 
            onBlur={() => onBlur()}
            onChange={(e: SyntheticEvent) => {onFilter(e)}}
        />
        <span className="absolute border-[2px] border-black max-h-[150px] overflow-y-scroll bg-white z-[10] w-[196px] box-shadow-extra-small" style={{visibility: dropdown ? "visible" : "hidden"}}>
            {data?.map((item) => (<div onClick={() => addItem(item)} className='hover:bg-custom-whiteHover cursor-pointer dropdownItem text-[16px] font-normal' key={item}>{item}</div>))}
        </span>
    </div>
      
    </div>
  )
}
export default MultiSelector