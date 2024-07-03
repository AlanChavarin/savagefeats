import { draftSchemaType } from "@/app/types/types"

export const draftFilterSwiss = (draft: draftSchemaType, dayEndingRound: number, i: number, dayRoundArr: null[] | [number]) => {
    if(draft.top8){
        return false
    }

    if(i === 0 && typeof(draft.swissRound) === 'number' && draft.swissRound <= dayEndingRound){
        return true
    }

    // @ts-ignore
    if(i > 0 && draft.swissRound && draft.swissRound <= dayEndingRound && dayRoundArr[i-1] && dayRoundArr[i-1] < draft.swissRound){
        return true
    }



    return false
} 
