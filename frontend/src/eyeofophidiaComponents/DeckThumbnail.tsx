import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons"

function DeckThumbnail({size}: {size: ('smallSlide' | 'featuredSlide' | 'sideSlide' | 'normal')}) {
  return (<>
    { (size !== 'smallSlide') && 
        <div className='bg-white box-shadow w-[578px] h-[96px] flex hover:bg-gray-50 cursor-pointer'>
            <div className='h-[96px] w-[96px]' style={{backgroundImage: `url('Betsy, Skin in the Game.PNG')`, backgroundSize: '150%', backgroundPosition: `center 0`}}></div>
            <div className='flex flex-col h-full flex-1 p-[8px] justify-between relative'>
                <div className='text-[19px] font-bold'>Calling: Las Vegas - Betsy, Skin in the Game</div>
                <div className='text-[16px] text-gray-600 flex flex-row justify-between'>
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
    

  </>)
}

export default DeckThumbnail
