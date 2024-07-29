'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"
import { deckSchemaType } from "@/app/types/types"
import heroUrlHelper from "../helpers/heroNameHelper"
import Link from "next/link"
import EditButton from "./EditButton"
import UserContext from "@/context/UserContext"
import { useContext } from "react"
import Image from "next/image"

const deckPlacementString = (placement: number | undefined, placementRangeEnding: number | undefined) => {

    if(placementRangeEnding){
        switch(placementRangeEnding){
            case undefined:
                return ''
            case 1:
                return `1st`
            case 2:
                return '1-2nd'
            case 3:
                return `${placement}-3rd`
            default:
                return `${placement}-${placementRangeEnding}th`
        }

    } else {
        switch(placement){
            case undefined:
                return ''
            case 1:
                return '1st'
            case 2:
                return '2nd'
            case 3:
                return '3rd'
            default:
                return `${placement}th`
        }
    }

    
}

function DeckThumbnail({size, deck}: {size: ('matchPage' | 'smallSlide' | 'featuredSlide' | 'sideSlide' | 'normal'), deck: deckSchemaType}) {

    const {user} = useContext(UserContext)
// ssm:w-[396px] 
  return (<>
    { (size === 'normal') && 
        <div className="relative min-w-[296px] w-[100%] max-w-[496px] min-h-[80px] bg-white hover:bg-gray-200">
            <a href={deck.decklistLink} target="_blank" className='w-full h-full cursor-pointer z-[1] absolute'></a>
            <div className="absolute top-0 w-full h-full flex box-shadow">
                <div className='h-full w-[80px] relative' 
                style={{backgroundImage: `url('/heroes/${heroUrlHelper(deck.hero)}.jpg')`, backgroundSize: '180%', backgroundPosition: `center -10px`}}
                >
                    {/* <Image 
                        priority={true}
                        alt="background Image"
                        src={`/heroes/${heroUrlHelper(deck.hero)}.jpg`}
                        fill
                        sizes="100%"
                        quality={10}
                        className={`object-cover object-top`}
                        style={{objectPosition: `center 0px`}}
                    /> */}
                </div>
                <div className='flex flex-col flex-1 p-[8px] justify-between gap-[2px] relative text-[13px]'>  

                    { deck.event ?
                        <Link href={`/eyeofophidia/event/${deck.event._id}`} className="z-[1] font-bold flex flex-row flex-wrap text-[13px] md:text-[16px] hover:text-purple-500 underline self-start">
                            {deck.event.name}
                        </Link>
                        :
                        <div className="flex font-bold flex-row flex-wrap text-[16px] self-start">
                            {deck.hero}
                        </div>
                    }

                    <div className='hidden text-black ssm:flex flex-col gap-[4px] sm:gap-[0px] sm:flex-row justify-between'>
                        {deck.hero}
                    </div>
                

                    <p className='text-gray-600 gap-[4px] sm:gap-[0px] sm:flex-row'>
                        {deck.placement && <>{`${deckPlacementString(deck.placement, deck.placementRangeEnding)} Place - `}</>}
                        {deck.playerName && <>{`${deck.playerName}`}</>}
                        {deck.event?.startDate && <>{` - ${deck.event.startDate.slice(0, 10)}`}</>}
                        {<> - {deck.format}</>}

                    </p>

                    <div className="absolute top-[4px] right-[4px]">
                        <FontAwesomeIcon icon={faSquareArrowUpRight}/>
                    </div>

                </div>
            </div>
            {deck.deckTech && <a target="_blank" href={`https://www.youtube.com/watch?v=${deck.deckTech}`} className="hover:text-purple-500 underline bottom-[6px] ssm:bottom-[24px] right-[4px] absolute text-[13px] text-gray-600 z-[3]">Deck Tech</a>}

            <div className="absolute left-[4px] bottom-[4px] z-[1]">
                {user && <EditButton text='' tiny={true} link={`/eyeofophidia/postdeck?deckid=${deck._id}`} />}
            </div>
        </div>
    }

    { (size === 'matchPage') && 
        <div className="bg-white box-shadow w-full h-[64px] flex hover:bg-gray-200 relative">
            <a href={deck.decklistLink} target="_blank" className='w-full h-full cursor-pointer z-[1] absolute'></a>
            <div className="absolute top-0 w-full h-full flex box-shadow">
                <div className='h-[64px] w-[64px]' style={{backgroundImage: `url('/heroes/${heroUrlHelper(deck.hero)}.jpg')`, backgroundSize: '180%', backgroundPosition: `center -10px`}}></div>
                <div className='flex flex-col h-full flex-1 p-[8px] justify-around relative'>
                    <div className='text-[13px] font-bold'>{deck?.hero}</div>
                    <div className='text-[13px] text-gray-600'>
                        {deck?.playerName}
                        {deck.deckTech && <> -&nbsp;<a target="_blank" href={`https://www.youtube.com/watch?v=${deck.deckTech}`} className="hover:text-purple-500 underline z-[1]">Deck Tech</a></>}
                    </div>

                    <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
                </div>
                <div className="absolute bottom-[8px] right-[8px] z-[1]">
                    {user && <EditButton text='' tiny={true} link={`/eyeofophidia/postdeck?deckid=${deck._id}`} />}
                </div>
            </div>
        </div>
    }


    { (size === 'smallSlide') && 
        <a href={deck.decklistLink} target="_blank" className='bg-white box-shadow w-full h-[64px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-[64px] w-[64px]' style={{backgroundImage: `url('/heroes/${heroUrlHelper(deck.hero)}.jpg')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[4px] relative justify-center'>
                <div className='text-[13px] font-bold'>{deck.event?.name}</div>
                {/* <div className='text-[13px] text-gray-600'></div> */}
                <div className='text-[13px]  flex flex-row justify-between'>{deck.playerName} - {deck.hero}</div>

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
            </div>
        </a>
    }

    {(size === 'featuredSlide') &&
        <a href={deck.decklistLink} target="_blank" className='bg-white box-shadow flex-1 flex hover:bg-gray-50 cursor-pointer flex-col relative'>
            <div className='h-[196px] w-full flex flex-col justify-end text-white text-shadow p-[16px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('/heroes/${heroUrlHelper(deck.hero)}.jpg')`, backgroundSize: '100%', backgroundPosition: `center -96px`}}>
                <div className='text-[16px] font-bold'>{deck.event?.name}</div>
                <div className='text-[19px] font-bold'>{deck.hero}</div>
            </div>
            <div className='flex flex-col h-full flex-1 p-[12px] justify-between relative text-[16px]'>
                
                <div className='text-gray-600 flex flex-row justify-between'>
                    {/* <div>2nd Place - John Doe</div> */}
                    <div className="text-black">{deck.playerName}</div>
                </div>
                
                <div className='flex flex-row justify-start text-gray-600'>
                    {/* <div className='*:underline'>
                        <a href="">Deck List</a> {' - '}
                        <a href="">Deck Tech</a>
                    </div> */}
                    <div>{deck.format}</div>
                    {deck.event && <>&nbsp;-&nbsp; <div>{deck.event?.startDate?.slice(0, 10)}</div></>}
                </div>
                
            </div>

             <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px] text-white'/>
        </a>
    }
  </>)
}

export default DeckThumbnail
