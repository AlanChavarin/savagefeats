'use client'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { reportSchemaType } from "../types/types"
import { reportSchema, errorSchema } from "../schemas/schemas"
import { z } from 'zod'

const responseSchema = z.object({
    count: z.number(),
    reports: z.array(reportSchema),
  })


function ReportsSection() {

    const [reports, setReports] = useState<reportSchemaType[] | undefined>(undefined)

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}reports/`

        fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }})
        .then(r => r.json())
        .then(data => {
            console.log(data)
            const validatedData = responseSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setReports(validatedData.data.reports)
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
    }, [])

  return (

    <div className="flex flex-col gap-[8px]">
        <div className="font-bold">Reports Section: </div>
        <div className="flex flex-col gap-[16px]">
            {reports && reports.map(report => 
                <div key={report._id} className="bg-gray-100 border-[1px] border-black box-shadow-extra-small p-[4px] gap-[8px] flex flex-col">
                    <div className="flex flex-col">
                        <label>Subject Line: </label>
                        <div className="font-bold bg-white border-[1px] border-black p-[8px]">{report.subject}</div>
                    </div>
                    <div className="flex flex-col">
                        <label>Body: </label>
                        <div className="font-bold bg-white border-[1px] border-black p-[8px]">{report.body}</div>
                    </div>
                </div>
            )}
        </div>
    </div>
    
  )
}
export default ReportsSection