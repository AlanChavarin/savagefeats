function SectionBackground({image}: {image: string}) {
  return (
    <div className='bg-black text-white h-full w-full skew-y-[-3deg] absolute top-0 z-[-1]' 
    style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('${image}')`, backgroundSize: 'cover'}}></div>
  )
}
export default SectionBackground