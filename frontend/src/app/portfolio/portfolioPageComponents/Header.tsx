function Header() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center relative' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70))`}}>
        <h1 className='text-white text-[11px] md:text-[27px] lg:text-[33px] text-shadow' style={{fontFamily: 'foulfiend'}}>Savage Feats&apos; <span className='text-custom-primary'>Production Portfolio</span></h1>
    </div>
  )
}
export default Header
