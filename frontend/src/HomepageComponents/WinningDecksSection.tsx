import { useEffect, useState } from "react"
import { deckSchema, errorSchema } from "@/app/schemas/schemas"
import { deckSchemaType } from "@/app/types/types"
import { toast } from "react-toastify"
import { z } from "zod"
import WinningDecksSectionBig from "./WinningDecksSectionBig"
import WinningDecksSectionSmall from "./WinningDecksSectionSmall"

const responseDeckSchema = z.object({
    count: z.number(),
    decklists: z.array(deckSchema),
  })

function WinningDecksSection() {

    const [decks, setDecks] = useState<deckSchemaType[] | undefined>(undefined)
    const [featuredDeck, setFeaturedDeck] = useState<deckSchemaType | undefined>(undefined)

    useEffect(() => {
        //grab latest decks
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&limit=20`,)
        .then(r => r.json())
        .then(data => {
        const validatedData = responseDeckSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        if(validatedData.success){
            setDecks(validatedData.data.decklists)
            return
        }

        if(validatedError.success){
            throw new Error(validatedError.data.errorMessage)
        }

        console.error(validatedData.error)
        console.error(validatedError.error)
        throw new Error('Unexpected data. Check console for further details')
        }).catch(err => {
            toast(err.message)
        })

        //grab latest deck with decktech 
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&deckTech=true&limit=1`)
        .then(r => r.json())
        .then(data => {
            const validatedData = responseDeckSchema.safeParse(data)
            const validatedError = errorSchema.safeParse(data)

            console.log(data.decklists[0])
            if(validatedData.success){
                setFeaturedDeck(validatedData.data.decklists[0])
                console.log(featuredDeck)
                return
            }

            if(validatedError.success){
                throw new Error(validatedError.data.errorMessage)
            }

            console.error(validatedData.error.toString())
            console.error(validatedError.error.toString())
            throw new Error('Unexpected data. Check console for further details')
        }).catch(err => {
            toast(err.message)
        })


    }, [])



  return (<>
    {
        decks && <>
          <div className='block lg:hidden'><WinningDecksSectionSmall decks={decks} featuredDeck={featuredDeck}/></div>
          <div className='hidden lg:block'><WinningDecksSectionBig decks={decks} featuredDeck={featuredDeck}/></div>
        </>
    }
  </>)
}
export default WinningDecksSection