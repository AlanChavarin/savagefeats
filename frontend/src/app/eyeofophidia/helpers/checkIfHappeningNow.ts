import { eventSchemaType } from "@/app/types/types"

export const checkIfHappeningNow = (event: eventSchemaType) => {
    if(event.startDate && event.endDate){
        // @ts-ignore
        const startDate = new Date(event.startDate)
        // @ts-ignore
        const endDate = new Date(event.endDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)

        if(startDate <= currentDate && endDate >= currentDate){
            return true
        }
    } else if(event.startDate){
        // @ts-ignore
        const startDate = new Date(event.startDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)

        // @ts-ignore
        let currentDateMinus1 = new Date(event.todaysDate)
        currentDateMinus1.setDate(currentDateMinus1.getDate()-1)

        if(startDate >= currentDateMinus1 && startDate <= currentDate){
            return true
        }
    }

    return false
}

export const checkIfPast = (event: eventSchemaType) => {
    if(event.startDate && event.endDate){
        // @ts-ignore
        const endDate = new Date(event.endDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)
        // @ts-ignore
        let currentDateMinus1 = new Date(event.todaysDate)
        currentDateMinus1.setDate(currentDateMinus1.getDate()-1)


        if(endDate < currentDateMinus1){
            return true
        }
    } else if(event.startDate){
        // @ts-ignore
        const startDate = new Date(event.startDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)
        // @ts-ignore
        let currentDateMinus1 = new Date(event.todaysDate)
        currentDateMinus1.setDate(currentDateMinus1.getDate()-1)

        if(startDate < currentDateMinus1){
            return true
        }
    }
    return false
}

export const checkIfFuture = (event: eventSchemaType) => {
    if(event.startDate){
        // @ts-ignore
        const startDate = new Date(event.startDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)

        if(startDate > currentDate){
            return true
        }
    }
    return false
}

