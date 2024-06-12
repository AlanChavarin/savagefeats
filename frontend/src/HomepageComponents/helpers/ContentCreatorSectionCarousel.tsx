'use client'
import YoutubeEmbedContainer from "@/components/swiperComponents/YoutubeEmbedContainer"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from "@/components/swiperComponents/EmblaCarouselDotButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { splitIntoGroupsOfFour } from "./splitIntoGroupsOfFour"

function ContentCreatorSectionCarousel({youtubeIds, channelName, size}: {youtubeIds: string[], channelName: string, size: ('big' | 'small')}) {

    const [youtubeIdsFours, setYoutubeIdsFours] = useState<string[][]>([])

    useEffect(() => {
      setYoutubeIdsFours(splitIntoGroupsOfFour(youtubeIds))
    }, [])

    const [emblaRef, emblaApi] = useEmblaCarousel({
      startIndex: 0
    })

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

    const prevOnClick = () => {
      emblaApi?.scrollPrev()
    }

    const nextOnClick = () => {
      emblaApi?.scrollNext()
    }

  return (<>

        {size==='small' && <>
          <div className="w-[90vw] min-[500px]:w-[500px] min-[500px]:h-[253px] mb-[24px]" ref={emblaRef}>
            <div className="flex">
              {youtubeIds.map(id => 
                <div key={id} className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
                  <YoutubeEmbedContainer>
                    <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                  </YoutubeEmbedContainer>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-[16px] items-center">
            <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
            {scrollSnaps.map((_, index) => (<div key={index}>
              <DotButton
                key={index}
                active={(selectedIndex === index)}
                onClick={() => onDotButtonClick(index)}
              />
            </div>))}
            <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
          </div>
        </>}
    
        

        {size==="big" && 
        
        <div className='flex flex-col items-center justify-center gap-[32px] translate-y-[32px]'>

            <div className='foulfiend text-white text-[19px] text-shadow my-[16px]'>{channelName} latest content</div>

            <div className="w-[680px] overflow-hidden" ref={emblaRef}>
              <div className="flex gap-[32px] mb-[8px]">

                {youtubeIdsFours && youtubeIdsFours.map(idArray =>
                
                  <div key={idArray[0]} className='grid grid-cols-2 gap-[32px] relative grow-0 shrink-0 pr-[8px]'>
                    {idArray.map(id => <div key={id}>
                    
                      <YoutubeEmbedContainer>
                        <iframe key={id} className='w-[320px] h-[180px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
                      </YoutubeEmbedContainer>

                    </div>)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-[16px] items-center">
              <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
              {scrollSnaps.map((_, index) => (<div key={index}>
                <DotButton
                  key={index}
                  active={(selectedIndex === index)}
                  onClick={() => onDotButtonClick(index)}
                />
              </div>))}
              <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
            </div>
        </div>}
  </>)}


export default ContentCreatorSectionCarousel




{/* <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
    <YoutubeEmbedContainer>
      <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/IjG3XpmLWCs?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
    </YoutubeEmbedContainer>
  </div>

  <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
    <YoutubeEmbedContainer>
      <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/R2p1qSTQOck?start=8503`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
    </YoutubeEmbedContainer>
  </div>

  <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
    <YoutubeEmbedContainer>
      <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/zxCaHNrpHLE?start=4834`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
    </YoutubeEmbedContainer>
  </div>

  <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[282px] flex items-center justify-center relative grow-0 shrink-0'>
    <YoutubeEmbedContainer>
      <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/G_Pp41Enahw?start=0`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
    </YoutubeEmbedContainer>
  </div> */}





  {/* small version of this carousel */}

//   <div className="block lg:hidden w-[90vw] min-[500px]:w-[500px] min-[500px]:h-[253px] mb-[24px]" ref={emblaRef}>
//   <div className="flex">

//     {youtubeIds.map(id => 
//       <div className='h-[50vw] basis-[90vw] min-[500px]:basis-[500px] min-[500px]:h-[253px] flex items-center justify-center relative grow-0 shrink-0'>
//         <YoutubeEmbedContainer>
//           <iframe className='h-[50vw] w-[85vw] min-[500px]:w-[450px] min-[500px]:h-[253px] box-shadow' src={`https://www.youtube-nocookie.com/embed/${id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe>
//         </YoutubeEmbedContainer>
//       </div>
      
//       )}

//   </div>
// </div>

// <div className="flex lg:hidden gap-[16px] items-center">
// <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
// {scrollSnaps.map((_, index) => (<>
//   <DotButton
//     key={index}
//     active={(selectedIndex === index)}
//     onClick={() => onDotButtonClick(index)}
//   />
// </>))}
// <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
// </div>