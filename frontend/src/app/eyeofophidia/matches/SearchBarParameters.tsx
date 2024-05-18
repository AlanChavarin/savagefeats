'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faGear } from "@fortawesome/free-solid-svg-icons"

function SearchBarParameters() {
  return (
        <form action="" className="w-[100%] flex flex-col items-center gap-[16px] text-[16px] max-w-[700px]">
            <div className="flex flex-row items-center bg-white border-2 border-black w-[100%]" style={{boxShadow: "2px 2px black"}}>
              <button type="button" className="w-[32px] h-[32px] flex items-center justify-center border-r-2 border-black hover:bg-custom-whiteHover">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              <input type="text" placeholder="Search For Matches" className="pl-[16px] pr-[16px] flex-1 focus:outline-none"/>

              <button type="button" className="w-[32px] h-[32px] flex items-center justify-center border-l-2 border-black hover:bg-custom-whiteHover">
                <FontAwesomeIcon icon={faGear}/>
              </button>
            </div>
        </form>
       
  )
}
export default SearchBarParameters