import { eventSchemaType } from "@/app/types/types"
import { checkIfHappeningNow } from "../helpers/checkIfHappeningNow"
import { useEffect } from "react"


function HappeningNow({event, small}: {event: eventSchemaType, small?: boolean}) {

  useEffect(() => {
    console.log(event.liveBroadcastContent, event.name)
  }, [])

  return (<>
      {((checkIfHappeningNow(event) && !event.liveBroadcastContent) || event.liveBroadcastContent === 'upcoming' || event.liveBroadcastContent === 'live') &&

        <div className={`${event.liveBroadcastContent === 'live' ? `bg-custom-red text-[${small ? '19px' : '24px'}]` : `bg-red-700 text-[${small ? '12px' : '15px'}]`} text-white font-bold h-[100%] ${small ? 'p-[8px]' : 'w-[107px]'} text-center flex flex-col justify-center min-h-[64px] z-[1]`}>
            {checkIfHappeningNow(event) && !event.liveBroadcastContent && <>
              Happening
              <br/>
              Soon/Now!
            </>}

            {/* @ts-ignore */}
            {event.liveBroadcastContent === 'upcoming' && <>
              Upcoming
              <br/>
              Stream
            </>}
            {event.liveBroadcastContent === 'live' && <>Live!</>}
        </div>
      }

    </>
    
  )
}
export default HappeningNow