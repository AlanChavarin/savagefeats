import DeckPreview2 from "./DeckPreview2"
import TopDecksCSS from "./TopDecks2.module.css"
import Slider from '../Slider'
import ViewMoreLink from "../../../utils/viewmorelink/ViewMoreLink"

function TopDecks2() {
  return (
    <div className={TopDecksCSS.parent}>

      <Slider 
        title={<><span style={{color: 'var(--primary)'}}>Deck Tech: </span>2023 Finland Rhinar National Champion</>}
        description="Look into Ilmari Lahtinen insight into Rhinar's place in the meta!"
        img='pic2.webp'/>

      <div className={TopDecksCSS.deckPreviewContainer}>
        <DeckPreview2 />
        <DeckPreview2 />
        <DeckPreview2 />
        <DeckPreview2 />
        
        <DeckPreview2 />
        <DeckPreview2 />
        <DeckPreview2 />
        <DeckPreview2 />
      </div>

      <ViewMoreLink text="View More Decklists"/>

    </div>
  )
}
export default TopDecks2