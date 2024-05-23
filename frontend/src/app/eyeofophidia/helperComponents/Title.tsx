import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

function Title({subheader}: {subheader: string}) {
  return (
    <div className="text-[33px] md:text-[68px] font-bold flex flex-row items-center gap-[12px] md:gap-[24px] relative">
        <FontAwesomeIcon icon={faEye} />
        <div>Eye Of Ophidia</div>
        <div className="absolute text-[19px] md:text-[39px] underline right-[8px] md:right-[16px] bottom-[-14px] md:bottom-[-20px] w-[73px] md:w-[155px]">
            {subheader}
        </div>
    </div>
  )
}
export default Title