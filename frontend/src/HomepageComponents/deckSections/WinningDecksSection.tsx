import { deckSchema, errorSchema } from "@/app/schemas/schemas"
import { deckSchemaType } from "@/app/types/types"
import { z } from "zod"
import WinningDecksSectionLazyLoadWrapper from "./WinningDecksSectionLazyLoadWrapper"

const responseDeckSchema = z.object({
    count: z.number(),
    decklists: z.array(deckSchema),
  })

let decks: deckSchemaType[]
let featuredDeck: deckSchemaType

async function WinningDecksSection() {

    //grab latest decks
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&limit=20`, {cache: "default"})
    .then(r => r.json())
    .then(data => {
    const validatedData = responseDeckSchema.safeParse(data)
    const validatedError = errorSchema.safeParse(data)
    if(validatedData.success){
        decks = validatedData.data.decklists
        return
    }

    if(validatedError.success){
        throw new Error(validatedError.data.errorMessage)
    }

    console.error(validatedData.error)
    console.error(validatedError.error)
    throw new Error('Unexpected data. Check console for further details')
    })

    //grab latest deck with decktech 
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&deckTech=true&limit=1`, {cache: "default"})
    .then(r => r.json())
    .then(data => {
        const validatedData = responseDeckSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            featuredDeck = validatedData.data.decklists[0]
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error.toString())
        console.error(validatedError.error.toString())
        throw new Error('Unexpected data. Check console for further details')
    })


  return (
    <WinningDecksSectionLazyLoadWrapper decks={decks} featuredDeck={featuredDeck}/>
  )
}
export default WinningDecksSection