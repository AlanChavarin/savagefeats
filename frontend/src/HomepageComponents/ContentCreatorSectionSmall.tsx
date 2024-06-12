import SectionBackground from "@/components/swiperComponents/SectionBackground"
import Image from "next/image"
import ContentCreatorSectionCarousel from "./helpers/ContentCreatorSectionCarousel"
import { contentCreatorSchemaType } from "@/app/types/types"
// import { getYoutubeIds } from "./helpers/getYoutubeIds"
// import { getChannelData } from "./helpers/getChannelData"
// import { channel } from "diagnostics_channel"

//{channelData, youtubeIds}: {channelData: any, youtubeIds: string[] | undefined}

function ContentCreatorSectionSmall({channelData, youtubeIds}: {channelData: contentCreatorSchemaType, youtubeIds: string[] | undefined}) {

  //'UCI5yJdQ4y8r_3J9JCiyHIzQ'
  // const youtubeIds: string[] = await getYoutubeIds(channelId, 12)
  // const channelData = await getChannelData(channelId)

  let background

  return (
    <div className='h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center mt-[32px] mb-[96px] gap-[16px]'>
      <SectionBackground image={channelData.backgroundImage ? channelData.backgroundImage : 'alpharampage.PNG'} size={'big'}/>
        
      <div className='min-[540px]:my-[16px] text-white foulfiend text-shadow flex flex-row justify-between align-middle w-[85vw] max-w-[460px]'>
        {/* <img src='savagelandsnewsprofile.jpg' className='w-[64px] h-[64px] min-[540px]:w-[96px] min-[540px]:h-[96px] rounded-full box-shadow translate-y-[-16px]'/> */}

        <div className='rounded-full box-shadow cursor-pointer w-[64px] h-[64px] min-[350px]:w-[96px] min-[350px]:h-[96px] lg:w-[256px] lg:h-[256px] relative'>
          <Image src={`${channelData.profilePictureMedium}`} alt='Savage Lands News Icon' layout='fill' className='rounded-full w-full shrink-0'/>
        </div>

        <div className='h-[8px] self-center text-center text-[11px] min-[400px]:text-[19px] flex-1'>
          {channelData.title}
        </div>
      </div>

      {youtubeIds && <ContentCreatorSectionCarousel youtubeIds={youtubeIds.slice(0, 4)} channelName={channelData.title} size="small"/>}

    </div>
  )
}
export default ContentCreatorSectionSmall

//min-[600px]:h-[180px] min-[600px]:w-[180px]