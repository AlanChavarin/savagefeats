function EmblaYoutubeEmbed({id, timeStamp, width, gap}: {id: string, timeStamp: number, width: number, gap: number}) {
  return (
    <div className={`flex items-center justify-center relative`} style={{flex: `0 0 ${width + gap}px`, height: `${width*.5625}px`}}>
      <iframe style={{width: `${width}px`, height: `${width*.5625}px`}} src={`https://www.youtube-nocookie.com/embed/${id}?start=${timeStamp}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
      {/* <div className='h-[16px] w-[256px] absolute bottom-[40px] bg-red-100'></div>
      <div className='h-[24px] w-[256px] absolute top-[32px] bg-red-100'></div>
      <div className='h-[36px] w-[100px] absolute left-[8px] bg-red-100'></div>
      <div className='h-[36px] w-[100px] absolute right-[8px] bg-red-100'></div> */}
    </div>
  )
}
export default EmblaYoutubeEmbed