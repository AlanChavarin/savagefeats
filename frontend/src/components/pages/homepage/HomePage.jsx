//components
import Slider from './Slider'
import UpcomingTournaments from './upcomingtournaments/UpcomingTournaments'
import Circuit from './circuit/Circuit'
import EyeofOphidiaSectionaSection from './eyeofophidiasection/EyeofOphidiaSection'

//different versions of the same idea
// import TopDecks1 from './TopDecks1/TopDecks1'
import TopDecks2 from './TopDecks2/TopDecks2'

//css
import HomeCSS from './HomePage.module.css'

function HomePage() {
  return (
    <div className={HomeCSS.parent}>
      <div className={HomeCSS.container}>

        <div className={HomeCSS.mainColumn}>
          <div className={HomeCSS.item}>
            <h1 className={HomeCSS.header}>The Latest News!</h1>
            <Slider 
              title={<><span style={{color: 'var(--secondary)'}}>Watch: </span>Battle Hardened Orlando Finals</>}
              description={<>Julian Sniffen on Kano vs Tom Battaglia on Uzuri</>}
              img='pic1.PNG'
            />
          </div>
          <div className={HomeCSS.item}>
            <h1 className={HomeCSS.header}>Upcoming Tournaments</h1>
            <UpcomingTournaments/>
          </div>
          {/* <div className={HomeCSS.item}>
            <h1 className={HomeCSS.header}>Winning Decks <span style={{color: 'grey', fontSize: '16px'}}>1.0</span></h1>
            <TopDecks1/>
          </div> */}
          <div className={HomeCSS.item}>
            <h1 className={HomeCSS.header}>Winning Decks</h1>
            <TopDecks2/>
          </div>
        </div>

        <div className={HomeCSS.sideColumn}>
          <h1>Savage Circuit</h1>
          <Circuit />
        </div>
        
        
      </div>

      <div className={HomeCSS.bigSection}>
       <EyeofOphidiaSectionaSection />
      </div>
    </div>
    
    
  )
}
export default HomePage