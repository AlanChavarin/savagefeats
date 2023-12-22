import NavbarCSS from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <div className={NavbarCSS.parent}>
        <img src="SVGWHITE.png" className={NavbarCSS.logoLink}/>
        <div className={NavbarCSS.linkContainer}>
            <div className={NavbarCSS.navbarLink}>
                Content
            </div>
            <div className={NavbarCSS.navbarLink}>
                Eye of Ophidia
            </div>
            <div className={NavbarCSS.navbarLink}>
                Decklists
            </div>
            <div className={NavbarCSS.navbarLink}>
                Shop
            </div>
            <div className={NavbarCSS.navbarLink}>
                Services <FontAwesomeIcon icon={faCaretUp} />
            </div>
        </div>
    </div>
  )
}
export default Navbar