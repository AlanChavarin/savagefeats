'use client'
import { toast } from "react-toastify"
import { errorSchema, reportSchema } from "../schemas/schemas"
import { reportSchemaType } from "../types/types"
import { useEffect, useState } from "react"

function Report({report}: {report: reportSchemaType}) {


    const [status, setStatus] = useState<string>(report.status)

    const changeStatus = (newStatus: string) => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}reports/${report._id}`

        fetch(url, {
            cache: 'no-store',
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: newStatus
            })})
            .then(r => r.json())
            .then(data => {
                console.log(data)
                const validatedData = reportSchema.safeParse(data)
                const validatedError = errorSchema.safeParse(data)
                if(validatedData.success){
                    setStatus(validatedData.data.status)
                    toast.success('report status successfully updated. Refresh your browser.')
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
    <div key={report._id} className="bg-gray-100 border-[1px] border-black box-shadow-extra-small p-[4px] gap-[8px] flex flex-col">
        <div className="flex flex-col">
            <label>Subject Line: </label>
            <div className="font-bold bg-white border-[1px] border-black p-[8px]">{report.subject}</div>
        </div>
        <div className="flex flex-col">
            <label>Body: </label>
            <div className="font-bold bg-white border-[1px] border-black p-[8px]">{report.body}</div>
        </div>
        <div className="flex flex-col">
            <label>Created Date: </label>
            <div className="">{(new Date(report.createdDate)).toString().slice(0, 25)}</div>
        </div>
        <div>
            <label>Change Status:</label>
            <div className="flex flex-row gap-[8px]">
                <button onClick={() => changeStatus("pending")} className={`${status==='pending' && 'bg-custom-primary'} cursor-pointer h-[32px] px-[6px] border-[1px] border-black  box-shadow-extra-small flex items-center justify-center`}>
                    Pending
                </button>
                <button onClick={() => changeStatus("fixed")} className={`${status==='fixed' && 'bg-custom-primary'} cursor-pointer h-[32px] px-[6px] border-[1px] border-black  box-shadow-extra-small flex items-center justify-center`}>
                    Fixed
                </button>
                <button onClick={() => changeStatus("closed")} className={`${status==='closed' && 'bg-custom-primary'} cursor-pointer h-[32px] px-[6px] border-[1px] border-black  box-shadow-extra-small flex items-center justify-center`}>
                    Closed
                </button>
            </div>
        </div>
    </div>
  )
}
export default Report