'use client'

import YoutubeEmbedContainer from "@/HomepageComponents/swiperComponents/YoutubeEmbedContainer"

function page() {

  return (
    <main className='flex-1 p-[64px] gap-[16px] flex flex-col items-start'>
      <YoutubeEmbedContainer>
        <iframe className='h-[144px] w-[256px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
      </YoutubeEmbedContainer>
    </main>
  )
}
export default page