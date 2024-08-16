export const getDateRangeString = (str1: string, str2?: string) => {
    const date1 = new Date(str1)
    const date1Day = date1.getDate()
    const month = date1.toLocaleDateString('en-US', {month: 'short'})
    const year = date1.toLocaleDateString('en-US', {year: 'numeric'})

    if(str2){
        const date2 = new Date(str2)
        const date2Day = date2.getDate()
        return `${month} ${date1Day+1}-${date2Day+1}th, ${year}`
    } else {
        return `${month} ${date1Day+1}th, ${year}`
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