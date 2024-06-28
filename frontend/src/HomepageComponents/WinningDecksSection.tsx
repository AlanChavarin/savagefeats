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

let decks: deckSchemaType[]
let featuredDeck: deckSchemaType

async function WinningDecksSection() {


    //grab latest decks
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&limit=20`)
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
    }).catch(err => {
        toast.error(err.message)
    })

    //grab latest deck with decktech 
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}decklists?&deckTech=true&limit=1`)
    .then(r => r.json())
    .then(data => {
        const validatedData = responseDeckSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)

        console.log(data.decklists[0])
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
    }).catch(err => {
        toast.error(err.message)
    })


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