import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"

function DeckThumbnail({size}: {size: ('smallSlide' | 'featuredSlide' | 'sideSlide' | 'normal')}) {
  return (<>
    { (size === 'normal') && 
        <div className='bg-white box-shadow w-[496px] h-[80px] flex hover:bg-gray-50 cursor-pointer '>
            <div className='h-full w-[80px]' style={{backgroundImage: `url('Betsy, Skin in the Game.PNG')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-between relative text-[13px]'>
                <div className='text-[16px] font-bold'>Calling: Las Vegas - Betsy, Skin in the Game</div>
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

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
                
            </div>
        </div>
    }

    { (size ==='smallSlide') && 
        <div className='bg-white box-shadow w-full h-[64px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-[64px] w-[64px]' style={{backgroundImage: `url('Betsy, Skin in the Game.PNG')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-around relative'>
                <div className='text-[13px] font-bold'>Calling: Las Vegas - Betsy, Skin in the Game</div>
                <div className='text-[13px] text-gray-600 flex flex-row justify-between'>2nd Place - John Doe</div>

                <FontAwesomeIcon icon={faSquareArrowUpRight} className='absolute top-[8px] right-[8px]'/>
            </div>
        </div>
    }

    {(size === 'featuredSlide') &&
        <div className='bg-white box-shadow flex-1 flex hover:bg-gray-50 cursor-pointer flex-col relative flex-1'>
            <div className='h-[196px] w-full flex flex-col justify-end text-white text-shadow p-[16px]' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url('Betsy, Skin in the Game.PNG')`, backgroundSize: '100%', backgroundPosition: `center -96px`}}>
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
