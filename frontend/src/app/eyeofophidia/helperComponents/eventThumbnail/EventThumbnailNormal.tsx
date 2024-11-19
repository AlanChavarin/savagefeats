import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"
import HappeningNow from "../HappeningNow"
import getImage from "./getImage"
import { getDateRangeString, getFormatString, getCompressedFormatString } from "./eventStringUtilities"
//import DynamicFontSizeElement from "./DynamicFontSizeElement"
import Image from "next/image"

function EventThumbnailNormal({event, size}: {event: eventSchemaType, size: ('normal' | 'eventPage' | 'matchPage')}) {

return (
  <div className={`${size==='normal' && 'w-[90vw] md:w-[400px] sm:h-[220px]'} ${size==='matchPage' && 'w-[100%] sm:h-[200px] lg:h-[250px]'} flex flex-col justify-start items-center box-shadow text-white text-shadow-small cursor-pointer relative`} 
    //style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center ${event.backgroundPosition ? event.backgroundPosition : 40}%`}}
  >

    <Link href={`/eyeofophidia/event/${event._id}`} className="w-full h-[100%] relative flex sm:block justify-between ">
      <div className="flex flex-col p-[12px] sm:p-[0px]">
      
        <div className="flex w-full pointer-events-none">
          <div className={`${event.streamed ? 'bg-black' : 'bg-red-950'} bg-opacity-0 sm:bg-opacity-60 w-full font-bold sm:p-[8px] flex sm:justify-center sm:items-center z-[2] text-[${event.name.length < 31 ? '19' : '16'}px]`}>
            {event.name}
          </div>
          <div className="hidden sm:block z-[2]">
            <HappeningNow event={event}/>
          </div>
        </div>

        <div className='flex flex-col gap-[8px] font-bold text-[16px] items-start self-start sm:p-[8px] pointer-events-none'>
          <div className="z-[2] flex-col gap-[8px] hidden sm:flex">
            <div className="hidden sm:block">{!event.streamed && <span className="text-red-500">Unstreamed</span>}</div>
            <div className="flex flex-row">
              {event.format && getFormatString(event.format)}
            </div>
            <div>
              {event.startDate && getDateRangeString(event.startDate, event.endDate ? event.endDate : undefined)}
            </div>
            <div>{event.location}</div>
          </div>

          <div className="z-[2] text-[13px] sm:hidden">
            {event.format && getCompressedFormatString(event.format)}
            &nbsp;|&nbsp;
            {event.startDate && getDateRangeString(event.startDate, event.endDate ? event.endDate : undefined)}
            &nbsp;|&nbsp;
            {!event.streamed && <span className="text-red-500">Unstreamed</span>}
          </div>
            
        </div>

      </div>

      <div className="sm:hidden z-[2]">
        <HappeningNow event={event} small={true}/>
      </div>

      <div className="absolute w-[100%] h-full top-0 left-0 bg-black transition-all duration-300">
        <Image 
          priority={true}
          alt="background Image"
          src={getImage(event)}
          fill
          sizes="100%"
          className={`object-cover opacity-[50%] sm:opacity-[70%] hover:opacity-[50%]`}
          style={{objectPosition: `center ${event.backgroundPosition ? event.backgroundPosition : 40}%`}}
        />
      </div>


    </Link>

    <div className='flex flex-col gap-[8px] absolute bottom-[12%] sm:bottom-[18%]  left-[50%] translate-x-[-50%] flex-0 h-[0px] z-[1]'>
      <div className='text-[16px] w-full text-center *:underline *:text-nowrap flex flex-row gap-[16px] justify-center'>
        {event.officialDetails && <a className="hover:text-purple-500 hidden sm:block" target="_blank" href={event.officialDetails}>Official Details</a>}
        {event.signUpLink && <a className="hover:text-purple-500" target="_blank" href={event.signUpLink}>Signup Link</a>}
        {/* {event.liveStream && !event.liveStream.startsWith('http') && <a className="hover:text-purple-500" target="_blank" href={`https://www.youtube.com/watch?v=${event.liveStream}`}><span>Live Stream</span></a>}
        {event.liveStream && event.liveStream.startsWith('http') && <a className="hover:text-purple-500" target="_blank" href={event.liveStream}><span>Live Stream</span></a>} */}
      </div>
      {/* <div className='text-[9px] text-center'>{event.venue}</div> */}
    </div>
  </div>
  )
}
export default EventThumbnailNormal