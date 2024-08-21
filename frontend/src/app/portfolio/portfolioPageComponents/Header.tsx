function Header() {
  return (
    <div className='w-full flex flex-col justify-center items-center relative h-[96px] sm:h-[128px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('/tomasz-jedrusz.png')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h1 className='text-white text-[11px] md:text-[27px] lg:text-[33px] text-shadow' style={{fontFamily: 'foulfiend'}}>Savage Feats&apos; <span className='text-custom-primary'>Production Portfolio</span></h1>
    </div>
  )
}
export default Header
