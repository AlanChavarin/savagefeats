import DeckPreview1 from "./DeckPreview1"
import TopDecksCSS from "./TopDecks1.module.css"

function TopDecks1() {
  return (
    <div className={TopDecksCSS.parent}>
      <DeckPreview1 />
      <DeckPreview1 />
      <DeckPreview1 />
    </div>
  )
}
export default TopDecks1