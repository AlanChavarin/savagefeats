function SectionBackground({image, top}: {image: string, top: number}) {
  return (
    <div className={`bg-black text-white h-full w-full skew-y-[-3deg] lg:skew-y-[-2deg] absolute top-[0px] z-[-1]`}
    style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), url('${image}')`, backgroundSize: 'cover', backgroundPosition: `0 ${top}px `}}></div>
  )
}
export default SectionBackground