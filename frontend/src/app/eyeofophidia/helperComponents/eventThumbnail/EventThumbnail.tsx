'use client'
import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"
import EditButton from "../EditButton"
import UserContext from "@/context/UserContext"
import { useContext } from "react"
import HappeningNow from "../HappeningNow"
import { checkIfHappeningNow } from "../../helpers/checkIfHappeningNow"
import getDateString from "./getDateString"
import getImage from "./getImage"


function EventThumbnail({event, size, lastRound, lastFormat, lastTwitch}: {lastRound?: string | undefined, lastFormat?: string | undefined, lastTwitch?: string | undefined, event: eventSchemaType, size: ('normal' | 'eventPage' | 'matchPage' | 'smallSlide' | 'featuredSlide' | 'sideSlide')}) {

  const {user} = useContext(UserContext)

  return (<>
    {(size==='eventPage') && 
    <>
      <div className={`relative h-[200px] md:h-[280px] w-[100%] flex flex-col justify-start items-center box-shadow text-white text-shadow-small`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>

        <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[24px] md:text-[40px] flex justify-center items-center'>{event.name}</div>

        <div className='flex flex-col gap-[8px] font-bold text-[16px] md:text-[19px] self-start p-[8px] w-[100%] h-[100%] items-center'>
            <div className="flex flex-row">{
              event.format.map((format, i) => <div key={i}>
                {i>0 && <>&nbsp;+ </>}
                {format}
              </div>)}
            </div>
            {/* <div>{event.startDate && event.startDate.slice(0,10)} {event.endDate && ' - ' + event.endDate.slice(0, 10)}</div> */}
            <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
            <div>{event.location}</div>
            <div>{event.streamed && 'Streamed'}</div>
            <div className='text-center *:underline text-[16px] md:text-[19px] justify-self-end'>
              {event.officialDetails && <><a href={event.officialDetails} target="_blank" className="hover:text-purple-500">Official Details</a></>}

              {event.officialDetails && (event.signUpLink || event.officialDetails) && <>{' - '}</>}

              {event.signUpLink && <><a href={event.signUpLink} target="_blank" className="hover:text-purple-500">Signup Link</a></>}

              {event.signUpLink && event.liveStream && <>{' - '}</>}

              {event.liveStream && <><a href={event.twitch ? `https://www.twitch.com/${event.liveStream}` : `https://www.youtube.com/watch?v=${event.liveStream}`} target="_blank" className="hover:text-purple-500">Live Stream</a></>}

            </div>
        </div>
 
        {user && 
          <div className="hidden absolute sm:flex flex-row gap-[8px] bottom-[12px] right-[12px]">
            <EditButton text="Edit Event" link={`/eyeofophidia/postevent?eventid=${event._id}`} />
            <EditButton text="Post Match" link={`/eyeofophidia/postmatch?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
            <EditButton text="Post Deck" link={`/eyeofophidia/postdeck?eventname=${event.name}&lastFormat=${lastFormat}`} />
            <EditButton text="Post Draft" link={`/eyeofophidia/postdraft?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
          </div>
        }
        
      </div>
      {user && 
        <div className="sm:hidden grid grid-cols-2 gap-[8px]">
          <EditButton text="Edit Event" link={`/eyeofophidia/postevent?eventid=${event._id}`} />
          <EditButton text="Post Match" link={`/eyeofophidia/postmatch?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
          <EditButton text="Post Deck" link={`/eyeofophidia/postdeck?eventname=${event.name}`} />
          <EditButton text="Post Draft" link={`/eyeofophidia/postdraft?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
        </div>
      }
    </>
    }

    {(size==='normal' || size==='matchPage') && 
      <Link href={`/eyeofophidia/event/${event._id}`} className={`${size==='normal' && 'w-[90vw] md:w-[400px] h-[220px]'} ${size==='matchPage' && 'w-[100%] h-[200px] lg:h-[250px]'} flex flex-col justify-start items-center   box-shadow text-white text-shadow-small cursor-pointer relative`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>

        <div className="flex w-full z-[1] pointer-events-none">
          <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[20px] flex justify-center items-center pointer-events-none	'>{event.name}</div>
          {checkIfHappeningNow(event) && <HappeningNow />}
        </div>

        <div className='flex flex-col gap-[8px] font-bold text-[16px] items-start self-start p-[8px] z-[1] pointer-events-none'>
            <div className="flex flex-row">
              {event.format.map((format, i) => <div key={i}>
                  {i>0 && <>&nbsp;+ </>}
                  {format}
                </div>
              )}
            </div>
            {/* <div>{event.startDate && event.startDate.slice(0,10)} {event.endDate && ' - ' + event.endDate.slice(0, 10)}</div> */}
            <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
            <div>{event.location}</div>
            <div>{event.streamed && 'Streamed'}</div>
        </div>

        {/* absolute positioned elements */}
        <div className="absolute w-[100%] h-[100%] bg-black opacity-[30%] hover:opacity-[50%]">

        </div>
      </Link>
    }

    {(size==='smallSlide') && 
      <Link href={`/eyeofophidia/event/${event._id}`} className={`flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center`}}>

          <div className="flex w-full z-[1] pointer-events-none">
            <div className='bg-black bg-opacity-60 min-h-[32px] min-[400px]:min-h-[48px] w-full font-bold text-[16px] min-[400px]:text-[19px] flex justify-center items-center z-[1] text-center'>{event.name}</div>
            {checkIfHappeningNow(event) && <HappeningNow />}
          </div>

          

          <div className='flex flex-col gap-[8px] font-bold text-[13px] min-[400px]:text-[16px] items-start self-start p-[8px] z-[1] pointer-events-none'>
              <div>
                {event.format.map((format, i) => <div key={i}>
                    {i>0 && <>&nbsp;+ </>}
                    {format}
                  </div>
                )}
              </div>
              {/* <div>{event.startDate?.slice(0, 10)}{event.endDate && ` - ${event.endDate.slice(0, 10)}`}</div> */}
              <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
              <div>{event.location}</div>
              <div>{event.streamed && 'Streamed'}</div>
          </div>

          {/* absolute positioned elements */}
          <div className="absolute w-[100%] h-[100%] bg-black opacity-[0%] hover:opacity-[20%]"></div>
      </Link>
    }

    {(size==='sideSlide') && 
      <Link href={`/eyeofophidia/event/${event._id}`} className={`flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer relative`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `0 0px `}}>

          <div className="flex w-full z-[1] pointer-events-none">
            <div className='bg-black bg-opacity-60 min-h-[42px] w-full font-bold text-[19px] flex justify-center items-center text-center'>{event.name}</div>
            {checkIfHappeningNow(event) && <HappeningNow />}
          </div>

          <div className='flex flex-col justify-between flex-1 p-[8px] w-full z-[1] pointer-events-none'>
            <div className='flex flex-col gap-[8px] font-bold text-[13px]'>
              <div className="flex flex-row">
                {event.format.map((format, i) => <div key={i}>
                    {i>0 && <>&nbsp;+ </>}
                    {format}
                  </div>
                )}
              </div>
              {/* <div>{event.startDate?.slice(0, 10)}{event.endDate && ` - ${event.endDate.slice(0, 10)}`}</div> */}
              <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
              <div>{event.location}</div>
              <div>{event.streamed && 'Streamed'}</div>
            </div>
            <div className='z-[1] pointer-events-none'>
              <div className='text-[11px] text-center *:underline'>
                {event.officialDetails && <><a href={event.officialDetails}>Official Details</a></>}
                {event.signUpLink && <><a href={event.signUpLink}>Signup Link</a></>}
                {event.liveStream && <><a href={event.liveStream}>Live Stream</a></>}
              </div>
              {event.venue && <div className='text-[7px] text-center'>{event.venue}</div> }
            </div>
          </div>

          {/* absolute positioned elements */}
          <div className="absolute w-[100%] h-[100%] bg-black opacity-[0%] hover:opacity-[20%]"></div>
      </Link>
    }

    {(size==='featuredSlide') && 
      <Link href={`/eyeofophidia/event/${event._id}`} className={`flex flex-col justify-start h-full w-full box-shadow text-white text-shadow-small cursor-pointer`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center`}}>

        <div className="flex w-full z-[1] pointer-events-none">
          <div className='bg-black bg-opacity-60 min-h-[48px] w-full font-bold text-[23px] flex justify-center items-center text-center'>
            {event.name}
          </div>
          {checkIfHappeningNow(event) && <HappeningNow />}
        </div>

          <div className='flex flex-col justify-between flex-1 p-[12px]'>
            <div className='flex flex-col gap-[8px] font-bold text-[16px] z-[1] pointer-events-none'>
              <div>{event.format}</div>
              {/* <div>{event.startDate?.slice(0, 10)}{event.endDate && ` - ${event.endDate.slice(0, 10)}`}</div> */}
              <div>{event.startDate && getDateString(event.startDate)}</div>
              <div>{event.location}</div>
              <div>{event.streamed && 'Streamed'}</div>
            </div>
            <div className='flex flex-col gap-[8px] z-[1]'>
              <div className='text-[16px] text-center *:underline'>
                {event.officialDetails && <><a className="hover:text-purple-500" href={event.officialDetails}>Official Details</a>{' - '}</>}
                {event.signUpLink && <><a className="hover:text-purple-500" href={event.signUpLink}>Signup Link</a>{' - '}</>}
                {event.liveStream && <><a className="hover:text-purple-500" href={event.liveStream}>Live Stream</a></>}
              </div>
              <div className='text-[9px] text-center'>{event.venue}</div>
            </div>
          </div>

          {/* absolute positioned elements */}
          <div className={`absolute w-[100%] h-[100%] bg-black opacity-[0%] hover:opacity-[20%]`}></div>

          
      </Link>
    }
    </>
  )
}
export default EventThumbnail