

function YoutubeThumbnail({id, timeStamp, width, className}: {id: string, timeStamp: number, width: number, className: string}) {
  return (
    <div>
        <iframe width={width} height={.5625*width} src={`https://www.youtube-nocookie.com/embed/${id}?start=${timeStamp}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true} className={className}></iframe>
    </div>
    
  )
}
export default YoutubeThumbnail