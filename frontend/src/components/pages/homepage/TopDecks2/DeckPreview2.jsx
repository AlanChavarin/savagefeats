import DeckPreviewCSS from './DeckPreview2.module.css'

function DeckPreview2() {
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
          <a href="" className={DeckPreviewCSS.link}>View List</a>
          <a href="" className={DeckPreviewCSS.link}>Deck Tech</a>
          <a href="" className={DeckPreviewCSS.link}>Watch Games</a>
        </div>
      </div>

    </div>
  )
}
export default DeckPreview2