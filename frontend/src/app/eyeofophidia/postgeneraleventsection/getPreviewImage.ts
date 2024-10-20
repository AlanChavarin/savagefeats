const getPreviewImage = (image: File | string) => {
    if(typeof(image) !== 'string'){
        return URL.createObjectURL(image)
      }
      return image
}

export default getPreviewImage