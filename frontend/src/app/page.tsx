'use client'
import Image from "next/image"

export default function Home() {

  return (
    <main className="flex-1">
      <div className='w-full h-[1000px] bg-cover py-[128px] flex flex-col items-center' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('/mulch.jpg')`, backgroundPosition: 'center -192px'}}>
        <div className='flex flex-col gap-[32px] items-center'>
          <Image src={'/SVGWHITE.png'} alt='savage feats logo' width={512} height={128}/>
          <h1 className="text-white text-[27px] text-balance w-[512px] text-center leading-[48px]" style={{fontFamily: 'foulfiend'}}>
            THE TOURNAMENT HUB FOR <span className='text-custom-tertiary'>FLESH</span> AND <span className='text-custom-tertiary'>BLOOD</span>
          </h1>
        </div>
        <div className="flex gap-[64px] items-center text-white">
          <div className=''>
            example item
          </div>
        </div>
      </div>
    </main>
  )
}
