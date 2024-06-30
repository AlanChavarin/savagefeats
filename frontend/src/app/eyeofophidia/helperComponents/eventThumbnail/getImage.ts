import { eventSchemaType } from "@/app/types/types"

const getImage = (event: eventSchemaType, big?: boolean) => {
    if(event.image && event.bigImage){
      if(typeof(event.bigImage) !== 'string'){
        return URL.createObjectURL(event.bigImage)
      }
      return (big ? event.bigImage : event.image)
    } else {
      const str = event._id
      const slicedHex = str.slice(str.length-2, str.length)
      const decimalValue = parseInt(slicedHex, 16)
      return `/backgroundimages/${Math.round(decimalValue / 12)}.jpg`
    }

    
  }

export default getImage
  