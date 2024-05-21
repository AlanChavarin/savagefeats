import { matchSchemaType } from "@/app/types/types"
import heroUrlHelper from "../helpers/heroNameHelper"
import Link from "next/link"

function MatchThumbnail({match}: {match: matchSchemaType}) {
  return (
    <Link href={`match/${match._id}`} className="w-[330px] h-[180px] flex flex-row justify-center box-shadow-light relative text-white font-bold text-shadow-medium cursor-pointer">
        {/* player 1 side */}
        <div className="flex-1 flex flex-col justify-end p-[8px]" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('/heroes/${heroUrlHelper(match.player1hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '40% 00%',
          }}>

          <div className="text-center text-[16px]">
            {match.player1name}
          </div>

        </div>

        {/* player 2 slide */}
        <div className="flex-1 flex flex-col justify-end p-[8px]" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('/heroes/${heroUrlHelper(match.player2hero)}.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPosition: '40% 0%',
          }}>

          <div className="text-center text-[16px]">
            {match.player2name}
          </div>

        </div>

        {/* absolute positioned elements */}
        <div className="absolute top-[8px] left-[12px] text-white">
          <div className="text-[16px]">{match.event.name}</div>
          <div className="text-[12px]">
            {match.top8 ? <>{match.top8Round}</> : <>Round {match.swissRound}</>}
          </div>
          {match.format !== 'Classic Constructed' && 
            <div className='text-[12px]'>{match.format}</div>
          }
          <div className="text-[12px]">{match.event.startDate && <>{match.event.startDate.slice(0, 10)}</>}</div>
        </div>
    </Link>
  )
}
export default MatchThumbnail