'use client'
import { useEffect, useState } from "react"
import { Hourglass } from 'react-loader-spinner'
import { z } from "zod"
import { errorSchema } from "@/app/schemas/schemas"
import { toast } from "react-toastify"

const responseSchema = z.array(z.object({
  videoid: z.string(),
}))


//const youtubeIds = ['zMzUgoT7b4Y', '9Dmwn-rxdcc', 'PjCEux4qspo', 'pv-Pdcbbs48', '9ADl9gDGtH0', 'dncZH5ivxEs', 'yB4Oqze8xaE', '_ka7oFOi9SQ', '7YnrqxZ8euk', 'R2p1qSTQOck']

function Videos() {

  const [loading, setLoading] = useState(true)
  const [youtubeIds, setYoutubeIds] = useState<string[]>([])

  useEffect(() => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}content/portfoliocontent`
      setLoading(true)
      fetch(url, {cache: 'no-store'})
      .then(r => r.json())
      .then(data => {
        const validatedData = responseSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
          setYoutubeIds(validatedData.data.map(content => content.videoid))
          setLoading(false)
          return
        }
  
        if(validatedError.success){
          throw new Error(validatedError.data.errorMessage)
        }
  
        console.error(validatedData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
      }).catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }, [])

  return (
    <div className='flex gap-[16px] flex-wrap justify-center p-[16px] mb-[256px]'>

      {loading && <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['Black', 'Black']}
        />}

      {youtubeIds.map(id => 
        <iframe key={id} className='h-[50vw] w-[90vw] md:w-[384px] md:h-[216px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
      )}
    </div>
  )
}
export default Videos