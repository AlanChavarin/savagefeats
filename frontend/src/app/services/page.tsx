'use client'

import TestSwiper from "@/components/TestSwiper"

function page() {
  return (
    <main className='flex-1'>
      <div className='text-[96px]' style={{textShadow: '10px 10px 2px red'}}>
        <TestSwiper />
      </div>
    </main>
  )
}
export default page