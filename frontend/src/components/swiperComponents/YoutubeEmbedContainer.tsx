'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { contentSchemaType } from '@/app/types/types'
import Image from 'next/image'

function YoutubeEmbedContainer({content}: {content: contentSchemaType}) {

  const [active, setActive] = useState(false)

  return (<>
    <div className='relative borders w-full h-full box-shadow' key={1}>
      {active ? 
        <>
          <iframe className='h-full w-full box-shadow' src={`https://www.youtube-nocookie.com/embed/${content.videoid}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
          <FontAwesomeIcon icon={faX} onClick={() => setActive(false)} className='top-[16px] right-[16px] absolute w-[24px] h-[24px] bg-black p-[8px] text-white box-shadow cursor-pointer hover:bg-slate-600'/>
        </>
        :
        <div onClick={() => setActive(true)} className='absolute w-full h-full top-0 right-0  cursor-pointer hover:glowing-shadow' style={{backgroundImage: `url('${content?.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`, boxShadow: '0 0 100px rgba(0,0,0,.7) inset'}}>
          <div className='relative w-full h-full hover:bg-slate-900/30'> 
            <div className='text-white text-[19px] text-shadow-small flex flex-row items-center gap-[8px] p-[12px] font-bold'>
              <Image src={content?.profilePicture} alt="profile picture" width={40} height={40} className='rounded-full box-shadow-extra-small self-start'/>
              <div>{content?.title}</div>
            </div>

            <svg className='absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[64px] h-[64px]' version="1.1" viewBox="0 0 68 48" >
              <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </div>
          
          
        </div>
      }
    </div>
  </>)
}
export default YoutubeEmbedContainer