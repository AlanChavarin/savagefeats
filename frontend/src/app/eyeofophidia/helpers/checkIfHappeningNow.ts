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
        if(startDate.toString() === currentDate.toString()){
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


        if(endDate < currentDate){
            return true
        }
    } else if(event.startDate){
        // @ts-ignore
        const startDate = new Date(event.startDate)
        // @ts-ignore
        const currentDate = new Date(event.todaysDate)
        if(startDate < currentDate){
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
            console.log(1)
            return true
        }
    }
    return false
}

