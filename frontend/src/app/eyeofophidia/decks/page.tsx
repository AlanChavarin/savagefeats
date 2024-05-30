'use client'
import Title from "../helperComponents/Title"
import { useState, useEffect } from "react"
import { deckSchemaType } from "@/app/types/types"
import { useSearchParams } from "next/navigation"
import { toast } from "react-toastify"
import { deckSchema, errorSchema } from "@/app/schemas/schemas"
import { z } from "zod"
import Pagination from "../helperComponents/Pagination"
import DeckThumbnail from "../helperComponents/DeckThumbnail"
import DeckSearchForm from "./DeckSearchForm"

const responseSchema = z.object({
  count: z.number(),
  decklists: z.array(deckSchema),
})

const limit = 40

function Decks() {
  const [decks, setDecks] = useState<deckSchemaType[] | undefined>()
  const [count, setCount] = useState<number | undefined>()
  const searchParams = useSearchParams()

  useEffect(() => {
    if(searchParams.get('query') === 'true'){
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API}decklists?` + new URLSearchParams(searchParams.toString() + `&limit=${limit}` ).toString()
      fetch(url)
      .then(r => r.json())
      .then(data => {
        const validatedData = responseSchema.safeParse(data)
        const validatedError = errorSchema.safeParse(data)
        console.log(validatedData)
        if(validatedData.success){
          setDecks(validatedData.data.decklists)
          setCount(validatedData.data.count)
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
    }

  }, [searchParams])

  // useEffect(() => {
  //   console.log(events)
  //   console.log(count)
  // }, [events, count])

  return (
    <div className="flex-1 overflow-hidden pb-[128px] flex flex-col justify-start items-center w-[100%] p-[16px] gap-[48px] pt-[32px]">
      <Title subheader="Decklists"/>
      <DeckSearchForm />

      {/* decklist thumbnail container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-wrap gap-[24px] justify-center">
        {decks && decks.map(deck => 
          <DeckThumbnail key={deck._id} deck={deck} size={"normal"}/>
        )}
        {(count===0) && <div>No Decks Found :{'('}</div>}
      </div>

      <Pagination count={count} limit={limit}/>
    </div>
  )
}
export default Decks