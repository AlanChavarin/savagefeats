export const getDateRangeString = (str1: string, str2?: string) => {
    const date1 = new Date(str1)
    const date1Day = date1.getUTCDate()

    const month = date1.toUTCString().slice(8, 11)
    const year = date1.getUTCFullYear().toString()

    if(str2){
        const date2 = new Date(str2)
        const date2Day = date2.getUTCDate()
        return `${month} ${date1Day}-${date2Day}th, ${year}`
    } else {
        return `${month} ${date1Day}th, ${year}`
    }
}

export const getFormatString = (arr: string[]) => {
    let str = arr[0]
    for(let i = 1; i < arr.length; i++){
        str = str + ' + ' + arr[i]
    }
    return str
}

export const getCompressedFormatString = (arr: string[]) => {
    let str = ''
    if(arr[0] === 'Classic Constructed'){
        str += 'CC'
    } else {
        str += arr[0]
    }
    for(let i = 1; i < arr.length; i++){
        if(arr[i] === 'Classic Constructed'){
            str += ' + CC'
        } else {
            str += ' + ' + arr[i]
        }
    }
    return str
}