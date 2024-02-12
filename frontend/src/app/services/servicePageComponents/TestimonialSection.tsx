'use client'
import SectionBackground from "@/components/swiperComponents/SectionBackground"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from '@/components/swiperComponents/EmblaCarouselDotButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

function TestimonialSection({backgroundImage} : {backgroundImage: string}) {

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 1
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const prevOnClick = () => {
    emblaApi?.scrollPrev()
  }

  const nextOnClick = () => {
    emblaApi?.scrollNext()
  }

  return (
    <div className='w-full h-[65vw] min-[490px]:h-[256px] lg:h-[360px] relative bg-red flex flex-col items-center py-[32px] md:py-[96px] gap-[16px] md:gap-[64px]'>
      <SectionBackground image={backgroundImage} size={'medium'}/>

        <div className='text-[21px] sm:text-[33px] md:text-[48px] font-bold text-white text-shadow self-center'>
            Testimonials
        </div>


        <div>
            <div ref={emblaRef} className='w-[90vw] md:w-[512px]'>
                <div className="flex gap-[64px]">

                    <div className='w-full h-[332px] min-[550px]:h-[256px] relative grow-0 shrink-0 flex flex-col justify-between bg-white box-shadow p-[24px] '>
                        <div className='text-[16px] min-[380px]:text-[27px] font-bold'>"IMPRESSIVE QUALITY CONTENT"</div>
                        <div className='text-[11px] min-[380px]:text-[13px] grow'>
                            I’ve been a player, viewer, and even caster of several events covered by Savage Feats, and each stream has been increasingly well-run and impressive. Ethan and Nathan are incredibly dedicated to quality and continued improvement.
                        </div>
                        <div className='flex gap-[16px]'>
                            <Image alt="brodie" width={48} height={48} src={'/servicePagePics/brodie.webp'} className='box-shadow'/>
                            <div className='flex flex-col h-full justify-between'>
                                <div className='font-bold text-[16px]'>
                                    Brodie Spurlock
                                </div>
                                <div className='text-gray-500'>
                                    Professional Player
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[332px] min-[550px]:h-[256px] relative grow-0 shrink-0 flex flex-col justify-between bg-white box-shadow p-[24px] '>
                        <div className='text-[16px] min-[380px]:text-[27px] font-bold'>"THE BEST BEATS"</div>
                        <div className='text-[11px] min-[380px]:text-[13px] grow'>
                            Savage Feats has got the beats you're looking for in Tournament Coverage and Brute Knowledge! Long time fan and supporter of this program and I'm certain you will love the work this strong team produces! Tournament Organizer, Stream Sponsor, or Passionate FaB Stream Viewer, you need to stay tuned with the best production product in FaB!
                        </div>
                        <div className='flex gap-[16px]'>
                            <Image alt="brodie" width={48} height={48} src={'/servicePagePics/image0.webp'} className='box-shadow'/>
                            <div className='flex flex-col h-full justify-between'>
                                <div className='font-bold text-[16px]'>
                                    Leigh Pushard
                                </div>
                                <div className='text-gray-500'>
                                    Tavern Brawlers
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[332px] min-[550px]:h-[256px] relative grow-0 shrink-0 flex flex-col justify-between bg-white box-shadow p-[24px] '>
                        <div className='text-[16px] min-[380px]:text-[27px] font-bold'>“BRING THE BOOM”</div>
                        <div className='text-[11px] min-[380px]:text-[13px] grow'>
                            FaB Unsealed reporting in, and let me tell you, Savage Feats' streaming services bring the BOOM! Not only does their team possess an impressive mastery of the game, but their passion for ensuring every game, big or small, receives coverage is truly commendable. The streaming quality is top-notch, guaranteeing that every thrilling moment is captured with clarity and precision. I can't recommend their services enough.
                        </div>
                        <div className='flex gap-[16px]'>
                            <Image alt="brodie" width={48} height={48} src={'/servicePagePics/FaBUnsealed.webp'} className='box-shadow'/>
                            <div className='flex flex-col h-full justify-between'>
                                <div className='font-bold text-[16px]'>
                                    Chris Sires
                                </div>
                                <div className='text-gray-500'>
                                    FaBUnsealed
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    

            <div className="flex gap-[16px] items-center justify-center py-[16px]">
            <FontAwesomeIcon onClick={() => prevOnClick()} icon={faChevronLeft} className='h-[24px] w-[24px] cursor-pointer'/>
            {scrollSnaps.map((_, index) => (<>
                <DotButton
                key={index}
                active={(selectedIndex === index)}
                onClick={() => onDotButtonClick(index)}
                />
            </>))}
            <FontAwesomeIcon onClick={() => nextOnClick()} icon={faChevronRight} className='h-[24px] w-[24px] cursor-pointer'/>
            </div>
        </div>

    </div>
  )
}
export default TestimonialSection

//471