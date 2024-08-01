'use client'
import { deckSchemaType } from "@/app/types/types"
import LazyComponentWrapper from "../LazyComponentWrapper"
import dynamic from "next/dynamic"
import LoadingSection from "../LoadingSection"

const DynamicWinningDecksSectionBig = dynamic(() => import("./WinningDecksSectionBig"), {
    ssr: true,
    loading: () => <LoadingSection/>
})

const DynamicWinningDecksSectionSmall = dynamic(() => import("./WinningDecksSectionSmall"), {
    ssr: true,
    loading: () => <LoadingSection/>
})

function WinningDecksSectionLazyLoadWrapper({decks, featuredDeck}: {decks: deckSchemaType[] | undefined, featuredDeck: deckSchemaType | undefined}) {
  return (
    <LazyComponentWrapper>
        { decks && 
            <>
                <div className='block lg:hidden'>
                    <DynamicWinningDecksSectionSmall decks={decks} featuredDeck={featuredDeck}/>
                </div>
                <div className='hidden lg:block'>
                    <DynamicWinningDecksSectionBig decks={decks} featuredDeck={featuredDeck}/>
                </div>
            </>
        }
    </LazyComponentWrapper>
)}
export default WinningDecksSectionLazyLoadWrapper