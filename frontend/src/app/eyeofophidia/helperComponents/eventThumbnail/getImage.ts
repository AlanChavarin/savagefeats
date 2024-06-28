const getImage = (str: string) => {
    const slicedHex = str.slice(str.length-2, str.length)
    const decimalValue = parseInt(slicedHex, 16)
    return `${Math.round(decimalValue / 12)}.jpg`
  }

export default getImage
  