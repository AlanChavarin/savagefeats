import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

function EditButton({text, link, tiny}: {text: string, link: string, tiny?: boolean}) {
  return (
    <Link href={link} className={`text-black flex flex-row gap-[4px] items-center bg-gray-200 font-bold border-[1px] border-black box-shadow-extra-small cursor-pointer hover:bg-gray-400 ${tiny ? 'text-[9px] p-[4px] md:p-[2px] ' : 'text-[13px] px-[8px] py-[4px]'}`} style={{textShadow: 'none'}}>
        {text && <div>
          {text}
        </div>}
        <FontAwesomeIcon icon={faEdit} />
    </Link>
  )
}
export default EditButton