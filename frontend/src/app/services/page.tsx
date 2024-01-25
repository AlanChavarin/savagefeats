'use client'

import DeckThumbnail from "@/eyeofophidiaComponents/DeckThumbnail"

function page() {
  return (
    <main className='flex-1 p-[64px] gap-[16px] flex flex-col'>
      <DeckThumbnail size='normal' />
      <div className='w-[256px]'>
        <DeckThumbnail size='smallSlide' />
      </div>
    </main>
  )
}
export default page