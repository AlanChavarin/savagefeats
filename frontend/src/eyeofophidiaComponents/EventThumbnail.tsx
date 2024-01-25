

function EventThumbnail({size}: {size: ('smallSlide' | 'featuredSlide' | 'sideSlide')}) {
  return (<>
    {(size==='smallSlide') && 
      <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[32px] w-full font-bold text-[16px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col gap-[8px] font-bold text-[11px] items-start self-start p-[8px]'>
              <div>Classic Constructed + OUT Draft</div>
              <div>April 27th-30th, 2023</div>
              <div>Baltimore, MD</div>
          </div>
      </div>
    }

    {(size==='sideSlide') && 
      <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[32px] w-full font-bold text-[16px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col justify-between flex-1 p-[8px] w-full'>
            <div className='flex flex-col gap-[8px] font-bold text-[9px]'>
              <div>Classic Constructed + OUT Draft</div>
              <div>April 27th-30th, 2023</div>
              <div>Baltimore, MD</div>
            </div>
            <div className=''>
              <div className='text-[9px] text-center *:underline'>
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
      <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

          <div className='bg-black bg-opacity-60 h-[48px] w-full font-bold text-[19px] flex justify-center items-center'>Pro tour: Baltimore</div>

          <div className='flex flex-col justify-between flex-1 p-[12px]'>
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
              <div className='text-[9px] text-center'>Venue: The Baltimore Convention Center, 1 W Pratt St, Baltimore, MD 21201</div>
            </div>
          </div>
      </div>
    }
    </>
  )
}
export default EventThumbnail