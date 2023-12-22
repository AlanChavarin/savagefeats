import SliderCSS from './Slider.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons'

function Slider({title, description, img}) {
  return (
    <div className={SliderCSS.parent} style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url("temp/${img}")`, 
        backgroundSize: 'cover',
        }}>
        <div className={`${SliderCSS.slider} ${SliderCSS.sliderLeft}`}>
            <FontAwesomeIcon icon={faLessThan}/>
        </div>
        <div className={`${SliderCSS.slider} ${SliderCSS.sliderRight}`}>
            <FontAwesomeIcon icon={faGreaterThan}/>
        </div>
        <div className={SliderCSS.textContainer}>
            <div className={SliderCSS.textContainerTitle}>{title}</div>
            <div className={SliderCSS.textContainerDescription}>{description}</div>
        </div>
    </div>
  )
}
export default Slider