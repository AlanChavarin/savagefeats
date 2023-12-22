import DeckPreviewCSS from './DeckPreview1.module.css'

function DeckPreview1() {
  return (
    <div className={DeckPreviewCSS.parent}>
      <div className={DeckPreviewCSS.imgContainer}>
        <img src="heroImages/Rhinar, Reckless Rampage.jpg" alt="" className={DeckPreviewCSS.img}/>
      </div>
      <div className={DeckPreviewCSS.textContainer}>
        <div className={DeckPreviewCSS.title}>
          Chandler To's San Jose Calling 1st place Rhinar
        </div>
        <div className={DeckPreviewCSS.links}>
          <a href="" className={DeckPreviewCSS.link}>Deck Tech</a>
          <a href="" className={DeckPreviewCSS.link}>San Jose Calling Decklists</a>
          <a href="" className={DeckPreviewCSS.link}>Watch Games</a>
        </div>
        <div className={DeckPreviewCSS.listPreview}>

          <div className={DeckPreviewCSS.listPreviewColumn}>
            <div className={DeckPreviewCSS.listPreviewColumnHeader}>Arena</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>Romping Club</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>Gambler's Gloves</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>Scabskin Leathers</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>Mandible Claw</div>
          </div>

          <div className={DeckPreviewCSS.listPreviewColumn}>
            <div className={DeckPreviewCSS.listPreviewColumnHeader}>Reds</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Command and Conquer</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Pack Hunt</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Smash Instinct</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Swing Big</div>
          </div>

          <div className={DeckPreviewCSS.listPreviewColumn}>
            <div className={DeckPreviewCSS.listPreviewColumnHeader}>Yellow</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Beast Within</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Bloodrush Bellow</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Smash Instinct</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x That All You Got?</div>
          </div>

          <div className={DeckPreviewCSS.listPreviewColumn}>
            <div className={DeckPreviewCSS.listPreviewColumnHeader}>Blues</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Barraging Beatdown</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Pack Hunt</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Smash Instinct</div>
            <div className={DeckPreviewCSS.listPreviewColumnItem}>3x Sand Sketched Plan</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DeckPreview1