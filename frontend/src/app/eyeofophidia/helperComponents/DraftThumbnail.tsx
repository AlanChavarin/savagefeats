import { draftSchemaType } from "@/app/types/types"
import Link from "next/link"

function DraftThumbnail({draft}: {draft: draftSchemaType}) {
  return (
    <Link href={`/eyeofophidia/draft/${draft._id}`} className="relative h-[200px] md:h-[180px] w-[90%] md:w-[400px] flex flex-col justify-start items-center box-shadow text-white text-shadow-small hover:cursor-pointer font-bold" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url('/draft.PNG')`, backgroundSize: 'cover', backgroundPosition: `center 0px`}}>
        <div className='bg-black bg-opacity-60 w-full font-bold p-[8px] text-[16px] flex justify-center items-center z-[1]'>Top 8 Draft Cam</div>

        {/* absolute positioned elements */}
        <div className="absolute w-[100%] h-[100%] bg-black opacity-[30%] hover:opacity-[50%]"></div>
        
    </Link>
  )
}
export default DraftThumbnail