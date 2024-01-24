

function EventThumbnail() {
  return (
    <div className='flex flex-col justify-start items-center h-full w-full box-shadow text-white text-shadow-small' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('wreckhavoc.jpg')`, backgroundSize: 'cover', backgroundPosition: `0 -48px `}}>

        <div className='bg-black bg-opacity-60 h-[32px] w-full font-bold text-[16px] flex justify-center items-center'>Pro tour: Baltimore</div>

        <div className='flex flex-col gap-[8px] font-bold text-[11px] items-start self-start p-[8px]'>
            <div>Classic Constructed + OUT Draft</div>
            <div>April 27th-30th, 2023</div>
            <div>Baltimore, MD</div>
        </div>
    </div>
  )
}
export default EventThumbnail