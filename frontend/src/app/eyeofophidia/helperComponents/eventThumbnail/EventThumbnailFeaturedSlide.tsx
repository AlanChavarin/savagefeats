import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"
import HappeningNow from "../HappeningNow"
import getDateString from "./getDateString"
import getImage from "./getImage"
import Image from "next/image"

function EventThumbnail({event}: {event: eventSchemaType}) {

  return ( 
      <div className={` flex flex-col justify-start h-full w-full box-shadow text-white text-shadow-small`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center`}}>

        <Link href={`/eyeofophidia/event/${event._id}`} className="w-full h-full relative">
          <div className="flex w-full pointer-events-none">
            <div className={`${event.streamed ? 'bg-black' : 'bg-red-950'} z-[1] bg-opacity-60 min-h-[48px] w-full font-bold text-[23px] flex justify-center items-center text-center`}>
              {event.name}
            </div>
            <HappeningNow event={event}/>
          </div>

          <div className='flex flex-col justify-between flex-1 p-[12px] pointer-events-none'>
            <div className='flex flex-col gap-[8px] font-bold text-[16px] z-[1]'>
              <div className="flex flex-row">
                {event.format.map((format, i) => <div key={i}>
                    {i>0 && <>&nbsp;+ </>}
                    {format}
                  </div>
                )}
              </div>
              <div>{event.startDate && getDateString(event.startDate)}</div>
              <div>{event.location}</div>
              <div>{!event.streamed && <span className="text-red-500">Unstreamed</span>}</div>
            </div>
          </div>

          <div className={`absolute w-[100%] h-[100%] top-0 left-0 bg-black cursor-pointer`}>
            <Image 
              alt="background Image"
              src={getImage(event)}
              fill
              sizes="100%"
              className={`object-cover opacity-[80%] hover:opacity-[50%]`}
              style={{objectPosition: `center ${event.backgroundPosition ? event.backgroundPosition : 40}%`}}
            />
          </div>
        </Link>
        
        <div className='flex flex-col gap-[8px] absolute z-[4] bottom-[20%] left-[50%] translate-x-[-50%] flex-0 h-[0px] '>
          <div className='text-[16px] text-center *:underline flex flex-row gap-[16px] justify-center'>
            {event.officialDetails && <a className="hover:text-purple-500" target="_blank" href={event.officialDetails}>Official Details</a>}
            {event.signUpLink && <a className="hover:text-purple-500" target="_blank" href={event.signUpLink}>Signup Link</a>}
            {/* {event.liveStream && !event.liveStream.startsWith('http') && <a className="hover:text-purple-500" target="_blank" href={`https://www.youtube.com/watch?v=${event.liveStream}`}><span>Live Stream</span></a>}
            {event.liveStream && event.liveStream.startsWith('http') && <a className="hover:text-purple-500" target="_blank" href={event.liveStream}><span>Live Stream</span></a>} */}
          </div>
          <div className='text-[9px] text-center'>{event.venue}</div>
        </div>
      </div>
      
  )
}
export default EventThumbnail