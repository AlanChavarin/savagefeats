import LinkArrowIconCSS from './LinkArrowIcon.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

function LinkArrowIcon() {
  return (
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={LinkArrowIconCSS.parent}/>
  )
}
export default LinkArrowIcon