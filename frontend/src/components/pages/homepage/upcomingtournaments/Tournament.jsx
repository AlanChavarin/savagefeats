import TournamentCSS from './Tournament.module.css'
import LinkArrowIcon from '../../../utils/linkarrowicon/LinkArrowIcon'

function Tournament({name, format, date, img}) {
  return (
    <div className={TournamentCSS.parent}>
        <img src={`temp/${img}`} alt="" className={TournamentCSS.img}/>
        <div className={TournamentCSS.textContainer}>
            <div className={TournamentCSS.title}>
                {name}
            </div>
            <div className={TournamentCSS.descriptionItem}>
                {format}
            </div>
            <div className={TournamentCSS.descriptionItem}>
                {date}
            </div>
            {/* <div className={TournamentCSS.descriptionItem}>
                Los Angeles, CA
            </div> */}
        </div>

        <LinkArrowIcon />

    </div>
  )
}
export default Tournament