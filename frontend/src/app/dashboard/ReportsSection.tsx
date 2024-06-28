'use client'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { reportSchemaType } from "../types/types"
import { reportSchema, errorSchema } from "../schemas/schemas"
import { z } from 'zod'
import Report from './Report'
import Pagination from "../eyeofophidia/helperComponents/Pagination"
import { useSearchParams } from "next/navigation"

const responseSchema = z.object({
    count: z.number(),
    reports: z.array(reportSchema),
  })



function ReportsSection() {

    const [reports, setReports] = useState<reportSchemaType[] | undefined>(undefined)
    const [page, setPage] = useState<number>(0)
    const [count, setCount] = useState<undefined | number>(undefined)

    const searchParams = useSearchParams()

    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}reports/?${new URLSearchParams(searchParams.toString())}`

        fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}?&page=${page}`,
            'Content-Type': 'application/json'
        }})
        .then(r => r.json())
        .then(data => {
            console.log(data)
            const validatedData = responseSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
                setReports(validatedData.data.reports)
                setCount(validatedData.data.count)
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
    }, [searchParams])

  return (

    <div className="flex flex-col gap-[8px]">
        <div className="font-bold">Reports Section: </div>
        <div className="flex flex-col gap-[16px]">
            {reports && reports.map(report => <Report key={report._id} report={report} />)}
        </div>
        <Pagination count={count} limit={10}/>
    </div>
    
  )
}
export default ReportsSection