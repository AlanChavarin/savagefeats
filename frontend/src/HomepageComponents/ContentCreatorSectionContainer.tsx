import SectionBackground from "@/components/swiperComponents/SectionBackground"
import Image from "next/image"
import ContentCreatorSectionCarousel from "./helpers/ContentCreatorSectionCarousel"
import { contentCreatorSchemaType } from "@/app/types/types"

function ContentCreatorSectionContainer({channelData, youtubeIds}: {channelData: contentCreatorSchemaType, youtubeIds: string[] | undefined}){

  return (
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col lg:flex-row items-center mt-[32px] gap-[16px] lg:justify-center'>
      <SectionBackground image={channelData.backgroundImage ? channelData.backgroundImage : 'alpharampage.jpg'} size={'big'}/>
        
      <div className='min-[540px]:my-[16px] text-white foulfiend text-shadow flex flex-row justify-between align-middle w-[85vw] max-w-[460px] lg:flex-col lg:items-center gap-[32px] lg:translate-y-[-50px]'>

        <div className='rounded-full box-shadow cursor-pointer w-[64px] h-[64px] min-[350px]:w-[96px] min-[350px]:h-[96px] lg:w-[256px] lg:h-[256px] relative'>
          <Image src={`${channelData.profilePictureMedium}`} alt='Savage Lands News Icon' layout='fill' className='rounded-full w-full shrink-0'/>
        </div>

        <div className='h-[16px] self-center text-center text-[11px] min-[400px]:text-[19px] flex-1'>
          {channelData.title}
        </div>

      </div>

      {youtubeIds && <>
          <div className="hidden lg:block translate-y-[90px]"><ContentCreatorSectionCarousel youtubeIds={youtubeIds} channelName={channelData.title} size="big"/></div>
          <div className="lg:hidden flex flex-col items-center"><ContentCreatorSectionCarousel youtubeIds={youtubeIds} channelName={channelData.title} size="small"/></div>
        </>}

    </div>
  )
}
export default ContentCreatorSectionContainer

//min-[600px]:h-[180px] min-[600px]:w-[180px]