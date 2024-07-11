'use client'
import { ReactNode, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function LegacyYoutubeEmbedContainer({children}: {children: ReactNode}) {

  const [active, setActive] = useState(false)

  return (<>
    <div className='relative borders box-shadow' key={1}>
      {children}
      {active ? 
        <>
          
          <FontAwesomeIcon icon={faX} onClick={() => setActive(false)} className='top-[16px] right-[16px] absolute w-[24px] h-[24px] bg-black p-[8px] text-white box-shadow cursor-pointer hover:bg-slate-600'/>
        </>
        :
        <div onClick={() => setActive(true)} className='absolute w-full h-full top-0 right-0  cursor-pointer hover:glowing-shadow'>
        </div>
      }
    </div>
  </>)
}
export default LegacyYoutubeEmbedContainer