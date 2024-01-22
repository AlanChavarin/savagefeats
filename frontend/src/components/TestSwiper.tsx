
'use client'

import useEmblaCarousel from 'embla-carousel-react'

function TestSwiper() {

    const [emblaRef, emblaApi] = useEmblaCarousel()

    const prevOnClick = () => {
        emblaApi?.scrollPrev()
        console.log('prev')
    }

    const nextOnClick = () => {
        emblaApi?.scrollNext()
        console.log('next')
    }

  return (
    <>
        <div className="flex flex-row h-[578px] border-2" ref={emblaRef}>
            <div className="flex *:border-2 gap-[64px]">
                {/* <div className="h-[600px] video-slides" style={{flex: '0 0 1024px'}}>
                    <iframe className='w-[1024px] h-[578px]'  src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div>
                <div className="h-[600px]" style={{flex: '0 0 1024px'}}>
                    <iframe className='w-[1024px] h-[578px]'  src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div>
                <div className="h-[600px]" style={{flex: '0 0 1024px'}}>
                    <iframe className='w-[1024px] h-[578px]'  src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div> */}
                {/* <div className="h-[600px]" style={{flex: '0 0 1024px'}}>
                    <iframe className='w-[1024px] h-[578px]'  src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div> */}
                <div style={{flex: '0 0 1024px'}}>etkjholdfjgkjjdfg</div>
                <div style={{flex: '0 0 1024px'}}>etkjholdfjgkjjdfg</div>
                <div style={{flex: '0 0 1024px'}}>etkjholdfjgkjjdfg</div>
                <div style={{flex: '0 0 1024px'}}>etkjholdfjgkjjdfg</div>
                <div className="relative h-[600px]" style={{flex: '0 0 1024px'}}>
                    <iframe className='w-[1024px] h-[578px] absolute'  src={`https://www.youtube-nocookie.com/embed/MvnYBCDaEKU?start=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                </div>
            </div>
        </div>
        <button onClick={() => prevOnClick()} className='w-[128px] h-[64px] bg-red-100'>PREV</button>
        <button onClick={() => nextOnClick()} className='w-[128px] h-[64px] bg-red-100'>NEXT</button>
    </>
  )
}
export default TestSwiper