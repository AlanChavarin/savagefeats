import EyeofOphidiaSectionCSS from './EyeofOphidiaSection.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faMagnifyingGlass, faSliders } from '@fortawesome/free-solid-svg-icons'

function EyeofOphidiaSection() {
  return (
    <div className={EyeofOphidiaSectionCSS.parent}>
        <div className={EyeofOphidiaSectionCSS.innerSection}>
            <h2 className={EyeofOphidiaSectionCSS.header}>
                <FontAwesomeIcon icon={faEye} className={EyeofOphidiaSectionCSS.icon}/>
                Eye of Ophidia
            </h2>

            <div className={EyeofOphidiaSectionCSS.groups}>
                <p className={EyeofOphidiaSectionCSS.p}>The most powerful tournament coverage look up tool for Flesh and Blood</p>
                <p className={EyeofOphidiaSectionCSS.p}>Now exclusively on savagefeats.com</p>
            </div>
            
            <div className={EyeofOphidiaSectionCSS.searchBar}> 
                <button className={EyeofOphidiaSectionCSS.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                <input className={EyeofOphidiaSectionCSS.searchInput} type='text' placeholder={`Search for matches`}/>
                {/* <button 
                    className={EyeofOphidiaSectionCSS.sliderButton} 
                    style={{backgroundColor: 'lightgray'}}
                ><FontAwesomeIcon icon={faSliders}/></button> */}
            </div>


            <button className={EyeofOphidiaSectionCSS.bigSearchButton}>
                Search <FontAwesomeIcon icon={faMagnifyingGlass} style={{fontSize: '19px'}}/>
            </button>
        </div>
        
    </div>
  )
}
export default EyeofOphidiaSection