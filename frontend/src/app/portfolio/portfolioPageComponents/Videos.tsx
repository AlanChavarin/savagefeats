// baked in data for now
const youtubeIds = ['zMzUgoT7b4Y', '9Dmwn-rxdcc', 'PjCEux4qspo', 'pv-Pdcbbs48', '9ADl9gDGtH0', 'dncZH5ivxEs', 'yB4Oqze8xaE', '_ka7oFOi9SQ', '7YnrqxZ8euk', 'R2p1qSTQOck']

function Videos() {

  return (
    <div className='flex gap-[16px] flex-wrap justify-center p-[16px] min-h-[1000px]'>
        {youtubeIds.map((id, i) => 
            // <div className='h-[50vw] basis-[90vw] md:basis-[564px] md:h-[282px] flex items-center justify-center relative grow-0 shrink-0' key={i}>
            //     <iframe className='h-[50vw] w-[90vw] md:w-[564px] md:h-[282px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
            // </div>

            <iframe className='h-[50vw] w-[90vw] md:w-[564px] md:h-[317px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
        )}
    </div>
  )
}
export default Videos