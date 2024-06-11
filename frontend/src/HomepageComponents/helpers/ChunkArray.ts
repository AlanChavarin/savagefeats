const chunkArray = (array: any[], size: number) => {

    const chunkedArray = []
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size))
    }

    return chunkedArray

}

export default chunkArray