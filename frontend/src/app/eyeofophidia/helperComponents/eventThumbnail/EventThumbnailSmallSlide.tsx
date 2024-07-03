import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"
import HappeningNow from "../HappeningNow"
import { checkIfHappeningNow } from "../../helpers/checkIfHappeningNow"
import getDateString from "./getDateString"
import getImage from "./getImage"

function EventThumbnail({event}: {event: eventSchemaType}) {
  return (
      <div className={`flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center`}}>

        <Link href={`/eyeofophidia/event/${event._id}`} className="w-full h-full relative">
          <div className="flex w-full pointer-events-none">
            <div className='bg-black bg-opacity-60 min-h-[32px] min-[400px]:min-h-[48px] w-full font-bold text-[16px] min-[400px]:text-[19px] flex justify-center items-center z-[1] text-center'>{event.name}</div>
            {checkIfHappeningNow(event) && <HappeningNow />}
          </div>

          <div className='flex flex-col gap-[8px] font-bold text-[13px] min-[400px]:text-[16px] items-start self-start p-[8px] z-[1] pointer-events-none'>
            <div className="z-[1] flex flex-col gap-[8px]">
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
          </div>

          {/* absolute positioned elements */}
          <div className="absolute w-[100%] h-[100%] top-0 bg-black opacity-[0%] hover:opacity-[20%]"></div>
        
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
export default EventThumbnail