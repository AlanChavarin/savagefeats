import SectionBackground from "@/components/SectionBackground"
import YoutubeThumbnail from "@/eyeofophidiaComponents/YoutubeThumbnail"
import TestSwiper from "@/components/TestSwiper"

function TheLatestInFABSection() {
  return (
    <div className='relative bg-red h-[192px] flex flex-col items-center py-[32px] gap-[24px]'>
      {/* absolute positioned, used as background */}
      <SectionBackground image={'hvy.PNG'}/>


      {/* block */}
      <div className='text-[11px] text-white foulfiend text-shadow'>
        The Latest in Flesh and Blood
      </div>

      {/* content container */}
      <div className='flex flex-row items-center justify-center gap-[16px] *:box-shadow '>
        {/* <YoutubeThumbnail width={224} id={"DHfRfU3XUEo"} timeStamp={60}/>
        <YoutubeThumbnail width={224} id={"DHfRfU3XUEo"} timeStamp={60}/>
        <YoutubeThumbnail width={224} id={"DHfRfU3XUEo"} timeStamp={60}/> */}

        <TestSwiper/>
      </div>
      
    </div>
  )
}
export default TheLatestInFABSection