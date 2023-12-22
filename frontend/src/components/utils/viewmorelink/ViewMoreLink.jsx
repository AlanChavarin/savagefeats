import ViewMoreLinkCSS from './ViewMoreLink.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare} from '@fortawesome/free-solid-svg-icons'

function ViewMoreLink({text}) {
  return (
    <a className={ViewMoreLinkCSS.parent}>
        {text} <FontAwesomeIcon icon={faArrowUpRightFromSquare} className={ViewMoreLinkCSS.icon}/>
    </a>
  )
}
export default ViewMoreLink