import SectionBackground from "@/components/swiperComponents/SectionBackground"
import Image from "next/image"
import ContentCreatorSectionCarousel from "./helpers/ContentCreatorSectionCarousel"
import { getYoutubeIds } from "./helpers/getYoutubeIds"
import { getChannelData } from "./helpers/getChannelData"

async function ContentCreatorSectionBig({channelId}: {channelId: string}) {
  //'UCI5yJdQ4y8r_3J9JCiyHIzQ'
  const youtubeIds: string[] = await getYoutubeIds(channelId, 12)
  const channelData = await getChannelData(channelId)

  return (
    <div className='h-[320px] relative bg-red flex flex-col items-center mt-[32px]'>
      <SectionBackground image='alpharampage.PNG' size='big'/>
    
      <div className='flex flex-row gap-[32px]'>
        <div className='text-[16px] lg:text-[23px] mb-[32px] text-white foulfiend text-shadow flex flex-col justify-top items-center gap-[32px] translate-y-[-32px]'>
          <div className='rounded-full box-shadow cursor-pointer w-[180px] h-[180px] lg:w-[256px] lg:h-[256px] relative'>
            <Image src='/savagelandsnewsprofile.jpg' alt='Savage Lands News Icon' layout='fill' className='rounded-full'/>
          </div>
          
          <div className='text-center lg:text-left'>{channelData.name}</div>
        </div>

        <ContentCreatorSectionCarousel youtubeIds={youtubeIds} channelData={channelData} size="big"/>
        
      </div>
    </div>
  )
}
export default ContentCreatorSectionBig