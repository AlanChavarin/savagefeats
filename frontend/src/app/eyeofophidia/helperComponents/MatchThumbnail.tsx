import { matchSchemaType } from "@/app/types/types"
import heroUrlHelper from "../helpers/heroNameHelper"
import Link from "next/link"

function MatchThumbnail({match, maxWidth}: {match: matchSchemaType, maxWidth?: boolean}) {
  return (
    <Link href={`/eyeofophidia/match/${match._id}`} className={`${maxWidth ? 'w-[100%]' : 'w-[330px]'} h-[180px] flex flex-row justify-center box-shadow relative text-white font-bold text-shadow-medium cursor-pointer`}>
        {/* player 1 side */}
        <div className="flex-1 flex flex-col justify-end p-[8px]" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/heroes/${heroUrlHelper(match.player1hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '140%',
            backgroundPosition: '40% 00%',
          }}>

          <div className="text-center text-[16px] z-[1] pointer-events-none">
            {match.player1name}
          </div>

        </div>

        {/* player 2 slide */}
        <div className="flex-1 flex flex-col justify-end p-[8px]" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('/heroes/${heroUrlHelper(match.player2hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '140%',
            backgroundPosition: '40% 0%',
          }}>

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
        <div className="absolute w-[100%] h-[100%] bg-black opacity-[30%] hover:opacity-[50%]">

        </div>
    </Link>
  )
}
export default MatchThumbnail