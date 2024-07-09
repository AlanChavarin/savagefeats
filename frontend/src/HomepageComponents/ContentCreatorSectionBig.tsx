import SectionBackground from "@/components/swiperComponents/SectionBackground"
import Image from "next/image"
import ContentCreatorSectionCarousel from "./helpers/ContentCreatorSectionCarousel"
import { contentCreatorSchemaType } from "@/app/types/types"

function ContentCreatorSectionBig({channelData, youtubeIds}: {channelData: contentCreatorSchemaType, youtubeIds: string[] | undefined}){

  return (
    <div className='h-[320px] relative bg-red flex flex-col items-center mt-[32px]'>
      <SectionBackground image={channelData.backgroundImage ? channelData.backgroundImage : 'alpharampage.jpg'} size='big'/>
    
      <div className='flex flex-row gap-[32px]'>

        <div className='text-[16px] lg:text-[23px] mb-[32px] text-white foulfiend text-shadow flex flex-col justify-top items-center gap-[32px] translate-y-[-32px]'>

          <div className='rounded-full box-shadow cursor-pointer w-[180px] h-[180px] lg:w-[256px] lg:h-[256px] relative'>
            <Image src={`${channelData.profilePictureMedium}`} alt='Savage Lands News Icon' layout='fill' className='rounded-full'/>
          </div>
          
          <div className='text-center lg:text-left'>{channelData.title}</div>
        </div>

        {youtubeIds && <>
          <div className="hidden lg:block"><ContentCreatorSectionCarousel youtubeIds={youtubeIds} channelName={channelData.title} size="big"/></div>
          <div className="block lg:hidden"><ContentCreatorSectionCarousel youtubeIds={youtubeIds} channelName={channelData.title} size="big"/></div>
        </>}
        
      </div>
    </div>
  )
}

export default ContentCreatorSectionBig