import { faFlag, faMagnifyingGlass, faSliders, faTrophy, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

function Info() {
  return (
        <div className="flex flex-col gap-[32px] justify-center">
            <div className="flex flex-col md:flex-row gap-[32px]">
                <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[48px]"/>
                    <div>
                        <p>Search for all feature <b>matches, events, and decklists</b> from across different official and community run events.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
                    <FontAwesomeIcon icon={faSliders} className="text-[48px]"/>
                    <div>
                        <p>Eye of Ophidia offers multiple <b>filters</b> to help you easily find matches</p>
                        <br />
                        <p>Use the <b>Hero Matchup Filter</b> to find and study your weakest matchups! </p>
                    </div>
                </div>
                <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
                    <FontAwesomeIcon icon={faTrophy} className="text-[48px]"/>
                    <div>
                        <p>Browse and search for <b>Events</b></p>
                        <br />
                        <p>Event pages will show all recorded feature <b>matches, decklists</b>, and even <b>draft POVs</b> from that event. </p>
                    </div>
                </div>
                
            </div>

            <div className="flex gap-[32px] flex-col md:flex-row justify-center">

                <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
                    <FontAwesomeIcon icon={faList} className="text-[48px]"/>
                    <div>
                        <p>Search For <b>Decklists</b></p>
                        <br />
                        <p>Search from decklists from throughout fab&apos;s OP history easily, and even find respective <b>deck techs</b> from decklists that featured one.</p>
                    </div>
                </div>

                <div className="flex flex-col items-center max-w-[180px] text-[16px] gap-[16px]">
                    <FontAwesomeIcon icon={faFlag} className="text-[48px]"/>
                    <div>
                        <p>Error in our database?</p>
                        <br />
                        <p>Please submit a <b>report</b> with us <Link href='/reports' className="font-bold underline hover:text-purple-500">here.</Link> </p>
                    </div>
                </div>

                
            </div>


            
        

    </div>
  )
}
export default Info