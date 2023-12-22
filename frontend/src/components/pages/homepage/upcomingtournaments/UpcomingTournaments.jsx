import UpcomingTournamentsCSS from './UpcomingTournaments.module.css'
import Tournament from './Tournament'
import ViewMoreLink from '../../../utils/viewmorelink/ViewMoreLink'

function UpcomingTournaments() {
  return (
    <div className={UpcomingTournamentsCSS.parent}>
      <div className={UpcomingTournamentsCSS.tournamentContainer}>
        <Tournament name='Protour: Los Angeles' format='Classic Constructed + Draft' date='March 21-23, 2024' img='LA.png'/>
        <Tournament name='Calling: Minneapolis' format='Classic Constructed' date='June 14-16, 2024' img='minneapolis.jpg'/>
        <Tournament name='Calling: Warsaw' format='Classic Constructed' date='May 10-12, 2024' img='warsaw.jpg'/>
        <Tournament name='Protour: Amsterdam' format='Classic Constructed + Draft' date='July 25-28, 2024' img='amsterdam.jpg'/>
        <Tournament name='Protour: Amsterdam' format='Classic Constructed + Draft' date='July 25-28, 2024' img='amsterdam.jpg'/>
        <Tournament name='Protour: Los Angeles' format='Classic Constructed + Draft' date='March 21-23, 2024' img='LA.png'/>
        <Tournament name='Calling: Minneapolis' format='Classic Constructed' date='June 14-16, 2024' img='minneapolis.jpg'/>
        <Tournament name='Calling: Warsaw' format='Classic Constructed' date='May 10-12, 2024' img='warsaw.jpg'/>
      </div>
      
      <ViewMoreLink text={'View all tournament history'}/>
    </div>
  )
}
export default UpcomingTournaments