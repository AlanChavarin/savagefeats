import React, {PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
  
type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = (index: number) => {
        if (!!emblaApi){
            return emblaApi.scrollTo(index)
        } 
    }

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

export const DotButton = ({active, onClick}: {active: Boolean, onClick: React.MouseEventHandler<HTMLButtonElement>}) => {

    return (
        <button type="button" onClick={onClick} className={`h-[12px] w-[12px] ${active ? 'bg-black' : 'bg-zinc-400'} rounded-full flex items-center justify-center`}>
        </button>
    )
}

// type PropType = PropsWithChildren<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>>

// export const DotButton: React.FC<PropType> = (props) => {
//     console.log(props)
//     const { children, ...restProps } = props

//     return (
//         <button type="button" {...restProps} className='h-[12px] w-[12px] bg-zinc-400 rounded-full relative'>
//             {children}
//         </button>
//     )
// }
  