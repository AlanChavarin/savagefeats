import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"
import HappeningNow from "../HappeningNow"
import { checkIfHappeningNow } from "../../helpers/checkIfHappeningNow"
import getDateString from "./getDateString"
import getImage from "./getImage"


function EventThumbnailSideSlide({event}: {event: eventSchemaType}) {

  return (
      <div  className={`flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer relative`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `0 0px `}}>

        <Link href={`/eyeofophidia/event/${event._id}`} className="w-full h-full relative">
          <div className="flex w-full z-[1] pointer-events-none">
            <div className='bg-black bg-opacity-60 min-h-[42px] w-full font-bold text-[19px] flex justify-center items-center text-center z-[1]'>{event.name}</div>
            {checkIfHappeningNow(event) && <HappeningNow />}
          </div>

          <div className='flex flex-col justify-between flex-1 p-[8px] w-full z-[1] pointer-events-none'>
            <div className='flex flex-col gap-[8px] font-bold text-[13px] z-[1]'>
              <div className="flex flex-row">
                {event.format.map((format, i) => <div key={i}>
                    {i>0 && <>&nbsp;+ </>}
                    {format}
                  </div>
                )}
              </div>
              <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
              <div>{event.location}</div>
              <div>{event.streamed ? 'Streamed' : <span className="text-red-500">Unstreamed</span>}</div>
            </div>
            <div className='pointer-events-none'>
              <div className='text-[11px] text-center *:underline z-[1]'>
                {event.officialDetails && <><a href={event.officialDetails}>Official Details</a></>}
                {event.signUpLink && <><a href={event.signUpLink}>Signup Link</a></>}
                {event.liveStream && <><a href={event.liveStream}>Live Stream</a></>}
              </div>
              {event.venue && <div className='text-[7px] text-center'>{event.venue}</div> }
            </div>
          </div>

          {/* absolute positioned elements */}
          <div className="absolute w-[100%] h-[100%] bg-black top-0 opacity-[0%] hover:opacity-[20%]"></div>
        
        </Link>

        <div className='flex flex-col gap-[8px] absolute bottom-[18%] left-[50%] translate-x-[-50%] flex-0 h-[0px]'>
          <div className='text-[16px] w-full text-center *:underline *:text-nowrap flex flex-row gap-[16px] justify-center'>
            {event.officialDetails && <a className="hover:text-purple-500" target="_blank" href={event.officialDetails}>Official Details</a>}
            {event.signUpLink && <a className="hover:text-purple-500" target="_blank" href={event.signUpLink}>Signup Link</a>}
            {event.liveStream && <a className="hover:text-purple-500" target="_blank" href={`https://www.youtube.com/watch?v=${event.liveStream}`}><span>Live Stream</span></a>}
          </div>
          <div className='text-[9px] text-center'>{event.venue}</div>
        </div>

      </div>
  )
}
export default EventThumbnailSideSlide