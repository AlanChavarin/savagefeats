import { matchSchemaType } from "@/app/types/types"

export const calculateLastRound = (matches: matchSchemaType[] | undefined) => {
    if(matches){
        let lastRound = undefined
        const lastMatch = matches[matches.length-1]
        if(lastMatch?.top8){
        lastRound = lastMatch.top8Round
        } else {
        if(lastMatch?.swissRound){
            lastRound = lastMatch.swissRound.toString()
        } 
        }

        return lastRound
    } else {
        return undefined
    }
}

export const calculateLastFormat = (matches: matchSchemaType[] | undefined) => {
    if(matches){
        const lastMatch = matches[matches.length-1]
        return lastMatch?.format
    }

    return undefined
}

export const calculateLastTwitch = (matches: matchSchemaType[] | undefined) => {
    if(matches){
        const lastMatch = matches[matches.length-1]
        const twitch = lastMatch?.twitch
        if(twitch){
        return 'true'
        } else {
        'false'
        }
    }
    return 'false'
}