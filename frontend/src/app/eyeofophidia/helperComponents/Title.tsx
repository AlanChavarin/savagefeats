import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import Link from "next/link"


function Title({subheader}: {subheader: string}) {

  const [dropdown, setDropdown] = useState<boolean>(false)

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if(!target.getAttribute('data-dropdown')){
        setDropdown(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className="text-[33px] md:text-[68px] font-bold flex flex-row items-center gap-[12px] md:gap-[24px] relative">
        <FontAwesomeIcon icon={faEye} />
        <div>Eye Of Ophidia</div>
        <div data-dropdown={true} className="absolute text-[19px] md:text-[39px] underline right-[8px] md:right-[16px] bottom-[-14px] md:bottom-[-20px] w-[73px] md:w-[155px] flex flex-row items-center gap-[8px] cursor-pointer select-none" onClick={() => setDropdown(!dropdown)}>
          
            {dropdown && 
              <div data-dropdown={true} className="absolute left-[-8px] top-[25px] md:top-[56px] bg-white z-[2] flex flex-col p-[8px] box-shadow-extra-small border-[1px] border-black">
                <Link data-dropdown={true} href="/eyeofophidia/matches" className="hover:bg-gray-200">Matches</Link>
                <Link data-dropdown={true} href="/eyeofophidia/events" className="hover:bg-gray-200">Events</Link>
                <Link data-dropdown={true} href="/eyeofophidia/decks" className="hover:bg-gray-200">Decklists</Link>
              </div>
            }

            {subheader}
            <FontAwesomeIcon icon={dropdown ? faCaretDown : faCaretUp} className="text-[24px]"/>

        </div>
    </div>
  )
}
export default Title