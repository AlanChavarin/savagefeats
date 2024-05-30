import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"
import { deckSchemaType } from "@/app/types/types"

const deckPlacementString = (placement: number | undefined) => {
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

function DeckThumbnail({size, deck}: {size: ('matchPage' | 'smallSlide' | 'featuredSlide' | 'sideSlide' | 'normal'), deck: deckSchemaType}) {
  return (<>
    { (size === 'normal') && 
        <a href={deck.decklistLink} target="_blank" className='bg-white box-shadow w-[100%] sm:w-[496px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-full w-[80px]' style={{backgroundImage: `url('/heroes/${deck.hero}.jpg')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-start gap-[2px] relative text-[13px]'>

                <div className={`${(deck.event.name + ' - ' + deck.hero).length > 50 ? 'text-[13px]' : 'text-[16px]'} font-bold flex flex-row flex-wrap`}>
                    <span >{deck.event.name}&nbsp;-&nbsp;</span>
                    <span className="">{deck.hero}</span>
                </div>

                <div className='text-gray-600 flex flex-col gap-[4px] sm:gap-[0px] sm:flex-row justify-between'>
                    {/* 2nd Place - John Doe - Dec 3th, 2023 */}
                    {deck.placement && <>{`${deckPlacementString(deck.placement)} Place`}</>}
                    {deck.playername && <>{` - ${deck.playername}`}</>}
                    {deck.event.startDate && <>{` - ${deck.event.startDate.slice(0, 10)}`}</>}
                </div>

                <div className=" text-gray-600">
                    {deck.format}
                </div>
                {/* <div className='flex flex-col sm:flex-row justify-between items-start text-gray-600 gap-[4px] sm:gap-[0px]'>
                    <div className='gap-[4px] sm:gap-[0px] flex flex-col sm:flex-row'>
                        {deck.decklistLink && <a target="_blank" href={deck.decklistLink} className="underline hover:text-purple-500">Deck List</a>}
                        <span className="hidden sm:block no-underline">&nbsp;{' - '}&nbsp;</span>
                        <a href={deck.decktechlink} className="underline hover:text-purple-500">Deck Tech</a>
                    </div>
                    
                </div> */}

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[2px] right-[2px]'/>
                
            </div>
        </a>
    }

    { (size === 'matchPage') && 
        <div className='bg-white box-shadow w-full h-[64px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-[64px] w-[64px]' style={{backgroundImage: `url('/${deck?.hero}.PNG')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-around relative'>
                <div className='text-[13px] font-bold'>{deck?.hero}</div>
                <div className='text-[13px] text-gray-600 flex flex-row justify-between'>{deckPlacementString(deck?.placement)} Place - {deck?.playername}</div>

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
            </div>
        </div>
    }


    { (size === 'smallSlide') && 
        <div className='bg-white box-shadow w-full h-[64px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-[64px] w-[64px]' style={{backgroundImage: `url('/Betsy, Skin in the Game.PNG')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-around relative'>
                <div className='text-[13px] font-bold'>Calling: Las Vegas - Betsy, Skin in the Game</div>
                <div className='text-[13px] text-gray-600 flex flex-row justify-between'>2nd Place - John Doe</div>

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
            </div>
        </div>
    }

    {(size === 'featuredSlide') &&
        <div className='bg-white box-shadow flex-1 flex hover:bg-gray-50 cursor-pointer flex-col relative'>
            <div className='h-[196px] w-full flex flex-col justify-end text-white text-shadow p-[16px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('/Betsy, Skin in the Game.PNG')`, backgroundSize: '100%', backgroundPosition: `center -96px`}}>
                <div className='text-[16px] font-bold'>Calling: Las Vegas</div>
                <div className='text-[19px] font-bold'>Betsy, Skin in the Game</div>
            </div>
            <div className='flex flex-col h-full flex-1 p-[12px] justify-between relative text-[16px]'>
                
                <div className='text-gray-600 flex flex-row justify-between'>
                    <div>2nd Place - John Doe</div>
                    <div>Dec 3th, 2023</div>
                </div>
                
                <div className='flex flex-row justify-between text-gray-600'>
                    <div className='*:underline'>
                        <a href="">Deck List</a> {' - '}
                        <a href="">Deck Tech</a>
                    </div>
                    <div>
                        Classic Constructed
                    </div>
                </div>
                
            </div>

             <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px] text-white'/>
        </div>
    }
  </>)
}

export default DeckThumbnail
