import { eventSchemaType } from "@/app/types/types"
import EditButton from "../EditButton"
import UserContext from "@/context/UserContext"
import { useContext } from "react"
import getDateString from "./getDateString"
import getImage from "./getImage"
import Image from "next/image"

function EventThumbnailEventPage({event, lastRound, lastFormat, lastTwitch}: {lastRound?: string | undefined, lastFormat?: string | undefined, lastTwitch?: string | undefined, event: eventSchemaType}) {

  const {user} = useContext(UserContext)

  return (
    <>
      <div className={`relative h-[240px] md:h-[280px] w-[100%] flex flex-col justify-start items-center box-shadow text-white text-shadow-small`} 
      //</>style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${getImage(event)}')`, backgroundSize: 'cover', backgroundPosition: `center ${event.backgroundPosition ? event.backgroundPosition : 40}%`}}
      >

        <div className={`${event.streamed ? 'bg-black' : 'bg-red-950'} bg-opacity-60 w-full font-bold p-[8px] text-[24px] md:text-[40px] flex justify-center items-center`}>{event.name}</div>

        <div className='flex flex-col gap-[8px] font-bold text-[16px] md:text-[19px] self-start p-[8px] w-[100%] h-[100%] items-center'>
            <div className="flex flex-row">{
              event.format.map((format, i) => <div key={i}>
                {i>0 && <>&nbsp;+ </>}
                {format} 
              </div>)}
            </div>
            <div>{event.startDate && getDateString(event.startDate)} {event.endDate && ' - ' + getDateString(event.endDate)}</div>
            <div>{event.location}</div>
            <div>{!event.streamed && <span className="text-red-500">Unstreamed</span>}</div>
            <div className='text-center *:underline text-[16px] md:text-[19px] justify-self-end'>
              {event.officialDetails && <><a href={event.officialDetails} target="_blank" className="hover:text-purple-500">Official Details</a></>}

              {event.officialDetails && (event.signUpLink && event.officialDetails) && <>{' - '}</>}

              {event.signUpLink && <><a href={event.signUpLink} target="_blank" className="hover:text-purple-500">Signup Link</a></>}

              {/* {event.signUpLink && event.liveStream && <>{' - '}</>}

              {event.liveStream && !event.liveStream.startsWith('http') && <><a href={event.twitch ? `https://www.twitch.com/${event.liveStream}` : `https://www.youtube.com/watch?v=${event.liveStream}`} target="_blank" className="hover:text-purple-500">Live Stream</a></>}

              {event.liveStream && event.liveStream.startsWith('http') && <a className="hover:text-purple-500" target="_blank" href={event.liveStream}><span>Live Stream</span></a>} */}

            </div>
        </div>

        <div className={`absolute z-[-1] w-[100%] h-[100%] top-0 left-0 bg-black cursor-pointer`}>
            <Image 
              alt="background Image"
              src={getImage(event)}
              fill
              sizes="100%"
              className={`object-cover opacity-[80%]`}
              style={{objectPosition: `center ${event.backgroundPosition ? event.backgroundPosition : 40}%`}}
            />
        </div>
 
        {user && 
          <div className="hidden absolute sm:flex flex-col gap-[8px] bottom-[12px] right-[12px]">
            <EditButton text="Edit Event" link={`/eyeofophidia/postevent?eventid=${event._id}`} />
            <EditButton text="Post Match" link={`/eyeofophidia/postmatch?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
            <EditButton text="Post Deck" link={`/eyeofophidia/postdeck?eventname=${event.name}&lastFormat=${lastFormat}`} />
            <EditButton text="Post Draft" link={`/eyeofophidia/postdraft?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
            <EditButton text="Post Content" link={`/eyeofophidia/postcontent?eventname=${event.name}&eventid=${event._id}`} />
            <EditButton text="Post General Section" link={`/eyeofophidia/postgeneraleventsection?eventname=${event.name}&eventid=${event._id}`} />
          </div>
        }
        
      </div>
      {user && 
        <div className="sm:hidden grid grid-cols-2 gap-[8px]">
          <EditButton text="Edit Event" link={`/eyeofophidia/postevent?eventid=${event._id}`} />
          <EditButton text="Post Match" link={`/eyeofophidia/postmatch?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
          <EditButton text="Post Deck" link={`/eyeofophidia/postdeck?eventname=${event.name}&lastFormat=${lastFormat}`} />
          <EditButton text="Post Draft" link={`/eyeofophidia/postdraft?eventname=${event.name}&lastRound=${lastRound}&lastFormat=${lastFormat}&lastTwitch=${lastTwitch}`} />
          <EditButton text="Post Content" link={`/eyeofophidia/postcontent?eventname=${event.name}`} />
          <EditButton text="Post General Section" link={`/eyeofophidia/postgeneraleventsection?eventname=${event.name}&eventid=${event._id}`} />
        </div>
      }
    </>

  )
}
export default EventThumbnailEventPage