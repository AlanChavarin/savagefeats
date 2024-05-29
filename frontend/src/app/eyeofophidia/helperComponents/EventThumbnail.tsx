import { eventSchemaType } from "@/app/types/types"
import Link from "next/link"

const getImage = (str: string) => {
  const slicedHex = str.slice(str.length-2, str.length)
  const decimalValue = parseInt(slicedHex, 16)
  return `${Math.round(decimalValue / 12)}.jpg`
}

function EventThumbnail({event, size}: {event: eventSchemaType, size: ('normal' | 'eventPage' | 'matchPage' | 'smallSlide' | 'featuredSlide' | 'sideSlide')}) {

  return (<>

    {(size==='eventPage') && 
      <div className={`h-[280px] w-[100%] flex flex-col justify-start items-center box-shadow text-white text-shadow-small hover:cursor-pointer`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('/backgroundimages/${getImage(event._id)}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>

        <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[40px] flex justify-center items-center'>{event.name}</div>

        <div className='flex flex-col gap-[8px] font-bold text-[19px] self-start p-[8px] w-[100%] items-center'>
            <div>{
              event.format.map((format, i) => <div key={i}>
                {i>0 && ' + '}
                {format}
              </div>)}
            </div>
            <div>{event.startDate && event.startDate.slice(0,10)} {event.endDate && ' - ' + event.endDate.slice(0, 10)}</div>
            <div>{event.location}</div>
        </div>
      </div>
    }

    {(size==='normal' || size==='matchPage') && 
      <Link href={`/eyeofophidia/event/${event._id}`} className={`${size==='normal' && 'w-[90vw] md:w-[400px] h-[220px]'} ${size==='matchPage' && 'w-[100%] h-[200px] lg:h-[250px]'} flex flex-col justify-start items-center   box-shadow text-white text-shadow-small hover:cursor-pointer relative`} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/backgroundimages/${getImage(event._id)}')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>

        <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[20px] flex justify-center items-center z-[1] pointer-events-none	'>{event.name}</div>

        <div className='flex flex-col gap-[8px] font-bold text-[16px] items-start self-start p-[8px] z-[1] pointer-events-none'>
            <div>{
              event.format.map((format, i) => <div key={i}>
                {i>0 && ' + '}
                {format}
              </div>)}
            </div>
            <div>{event.startDate && event.startDate.slice(0,10)} {event.endDate && ' - ' + event.endDate.slice(0, 10)}</div>
            <div>{event.location}</div>
        </div>

        {/* absolute positioned elements */}
        <div className="absolute w-[100%] h-[100%] bg-black opacity-[30%] hover:opacity-[50%]">

        </div>
      </Link>
    }


    {(size==='smallSlide') && 
      <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[32px] min-[400px]:h-[48px] w-full font-bold text-[16px] min-[400px]:text-[23px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col gap-[8px] font-bold text-[11px] min-[400px]:text-[13px] items-start self-start p-[8px]'>
              <div>Classic Constructed + OUT Draft</div>
              <div>April 27th-30th, 2023</div>
              <div>Baltimore, MD</div>
          </div>
      </div>
    }

    {(size==='sideSlide') && 
      <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small cursor-pointer' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[42px] w-full font-bold text-[19px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col justify-between flex-1 p-[8px] w-full'>
            <div className='flex flex-col gap-[8px] font-bold text-[13px]'>
              <div>Classic Constructed + OUT Draft</div>
              <div>April 27th-30th, 2023</div>
              <div>Baltimore, MD</div>
            </div>
            <div className=''>
              <div className='text-[11px] text-center *:underline'>
                <a href="">Official Details</a>{' - '}
                <a href="">Signup Link</a>{' - '}
                <a href="">Live Stream</a>
              </div>
              {/* <div className='text-[7px] text-center'>Venue: The Baltimore Convention Center, 1 W Pratt St, Baltimore, MD 21201</div> */}
            </div>
          </div>
      </div>
    }

    {(size==='featuredSlide') && 
      <div className='flex flex-col justify-start h-full w-full box-shadow text-white text-shadow-small cursor-pointer' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[48px] w-full font-bold text-[23px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col justify-between flex-1 p-[12px]'>
            <div className='flex flex-col gap-[8px] font-bold text-[16px]'>
              <div>Classic Constructed + OUT Draft</div>
              <div>April 27th-30th, 2023</div>
              <div>Baltimore, MD</div>
            </div>
            <div className='flex flex-col gap-[8px]'>
              <div className='text-[13px] text-center *:underline'>
                <a href="">Official Details</a>{' - '}
                <a href="">Signup Link</a>{' - '}
                <a href="">Live Stream</a>
              </div>
              <div className='text-[9px] text-center'>Venue: The Baltimore Convention Center, 1 W Pratt St, Baltimore, MD 21201</div>
            </div>
          </div>
      </div>
    }
    </>
  )
}
export default EventThumbnail