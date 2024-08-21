import { matchSchemaType } from "@/app/types/types"
import heroUrlHelper from "../helpers/heroNameHelper"
import Link from "next/link"
//import Image from "next/image"

function MatchThumbnail({match, maxWidth}: {match: matchSchemaType, maxWidth?: boolean}) {
  return (
    <Link href={`/eyeofophidia/match/${match._id}`} className={`${maxWidth ? 'w-[100%]' : 'w-[330px]'} h-[140px] sm:h-[180px] flex flex-row justify-center box-shadow relative text-white font-bold text-shadow-medium cursor-pointer`}>
        {/* player 1 side */}
        <div className="flex-1 flex flex-col justify-end p-[8px] relative" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/heroes/${heroUrlHelper(match.player1hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '140%',
            backgroundPosition: '40% 10%',
          }}>

          {/* <div className="absolute w-[100%] h-[100%] top-0 right-0">
            <Image 
              priority={true}
              alt="background Image"
              src={`/heroes/${heroUrlHelper(match.player1hero)}.jpg`}
              fill
              sizes="100%"
              quality={30}
              className={`object-cover object-top`}
            />
          </div> */}

          <div className="text-center text-[16px] z-[1] pointer-events-none">
            {match.player1name}
          </div>

        </div>

        {/* player 2 slide */}
        <div className="flex-1 flex flex-col justify-end p-[8px] relative" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('/heroes/${heroUrlHelper(match.player2hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '140%',
            backgroundPosition: '40% 10%',
          }}>

          {/* <div className="absolute w-full h-full top-0 right-0">
            <Image 
              priority={true}
              alt="background Image"
              src={`/heroes/${heroUrlHelper(match.player2hero)}.jpg`}
              fill
              sizes="100%"
              quality={30}
              className={`object-cover object-top`}
            />
          </div> */}

          <div className="text-center text-[16px] z-[1] pointer-events-none">
            {match.player2name}
          </div>

        </div>

        {/* absolute positioned elements */}
        <div className="absolute top-[8px] left-[12px] text-white z-[1] pointer-events-none">
          <div className="text-[16px]">{match.event.name}</div>
          <div className="text-[12px]">
            {match.top8 ? <>{match.top8Round}</> : <>Round {match.swissRound}</>}
          </div>
          {match.format !== 'Classic Constructed' && 
            <div className='text-[12px]'>{match.format}</div>
          }
          <div className="text-[12px]">{match.event.startDate && <>{match.event.startDate.slice(0, 10)}</>}</div>
        </div>
        <div className="absolute w-full h-full bg-black opacity-[30%] hover:opacity-[50%]">

        </div>
    </Link>
  )
}
export default MatchThumbnail