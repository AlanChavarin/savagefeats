'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function DeleteButton({warningText, deleteAction}: {warningText: string, deleteAction: () => void}) {

    const [popup, setPopup] = useState<Boolean>(false)



  return (
    <div  className="box-shadow-extra-small bg-red-600 hover:bg-red-800 border-[1px] border-black cursor-pointer w-[24px] h-[24px] flex justify-center items-center relative">
        <FontAwesomeIcon icon={faTrash} className="text-white" onClick={() => setPopup(true)}/>

        {popup && 
            <div className="z-[1] bg-white absolute top-[0px] right-[0px] text-red-500 font-bold border-[1px] box-shadow-extra-small p-[16px] flex flex-col w-[256px] gap-[8px] border-black">
                <div>
                    {warningText}
                </div>
                <div className="flex flex-row gap-[16px]">
                    <button type="button" onClick={() => setPopup(false)} className="text-black px-[16px] py-[4px] bg-white border-[1px] border-black hover:bg-gray-100">
                        Cancel
                    </button>
                    <button type="button" onClick={() => deleteAction()} className="hover:bg-red-700 px-[16px] py-[4px] text-white bg-red-500 border-[1px] border-black">
                        Delete
                    </button>
                </div>  
            </div>
        }
    </div>
  )
}
export default DeleteButton