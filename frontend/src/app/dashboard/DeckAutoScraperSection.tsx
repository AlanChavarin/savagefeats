'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import DeckThumbnail from "../eyeofophidia/helperComponents/DeckThumbnail"
import { deckSchemaType } from "../types/types"
import { deckSchema } from "../schemas/schemas"
import { useState } from "react"
import { errorSchema } from "../schemas/schemas"
import { ThreeDots } from "react-loader-spinner"


const formSchema = z.object({
    pages: z.coerce.number().min(0)
})

type FormFields = z.infer<typeof formSchema>

function DeckAutoScraperSection() {

    const [newlyScrappedDecks, setNewlyScrappedDecks] = useState<deckSchemaType[] | undefined>([])

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pages: 1
        }
    })

    const {register, handleSubmit, setValue, getValues, reset, watch, resetField, formState: {errors, isSubmitting}} = form

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        const url = `${process.env.NEXT_PUBLIC_BACKEND_API}decklists/findAndInsertDecksFromWebpageData?pages=${data.pages}`

        await fetch(url, {
            cache: 'no-store',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(r => r.json())
          .then(data => {
            const validatedData = deckSchema.array().safeParse(data)
            const validatedError = errorSchema.safeParse(data)
            if(validatedData.success){
              toast.success(`Scraped ${validatedData.data.length} decklists`)
              setNewlyScrappedDecks(validatedData.data)
              resetField('pages')
      
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

    }

  return (
    <div className="flex flex-col gap-[16px]">
        <form className="flex gap-[16px] flex-col max-w-[400px] font-bold" onSubmit={handleSubmit(onSubmit)}> 
            {/* create a number input called pages that takes a number input */}
            <div>
                This autoscaper will scrape decklists from the given number of pages on the FabTCG website.<span className="font-normal"> (https://fabtcg.com/en/decklists/?query=&page=)</span>
                <br />
                This already automatically happens on the last page every 24 hours. 
            </div>
            <div className="flex flex-row">
                <label>Pages: &nbsp;</label>
                <input className="border-black border-[1px] w-[48px] box-shadow-extra-small" type="number" min='0' {...register('pages')}/>
            </div>
            <button type="submit" className="cursor-pointer h-[32px] px-[6px] border-[1px] border-black bg-custom-primary font-bold box-shadow-extra-small flex items-center justify-center max-w-[300px]">
                {isSubmitting ? (
                    <>
                        Scraping decklists 
                        <ThreeDots
                            visible={true}
                            height="24"
                            width="24"
                            color="#000000"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        />
                    </>
                ) : (
                    'Scrape decklists'
                )}
                    
            </button>
            {isSubmitting && <div>This may take a while depending on the number of pages, please do not refresh the page!!</div>}
        </form>
        <div className="w-[100%] h-[1px] bg-black"></div>
        <div className="flex flex-row flex-wrap gap-[8px]">
            {/* container for new decks posted */}
            {newlyScrappedDecks && <div>
                We have scrapped and submitted a total of {newlyScrappedDecks.length } decklists total    
            </div>}
            <div className="flex flex-row flex-wrap gap-[16px]">
                {newlyScrappedDecks && newlyScrappedDecks.map(deck => <DeckThumbnail key={deck._id} size="normal" deck={deck} />)}
            </div>
        </div>
    </div>
  )
}
export default DeckAutoScraperSection