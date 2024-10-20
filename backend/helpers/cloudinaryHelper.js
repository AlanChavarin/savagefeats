const cloudinary = require('cloudinary')
const {extractPublicId} = require('cloudinary-build-url')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const handleUpload = async (file) => {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "image",
    })
    return res
}

const handleImageFiles = async (image, bigImage) => {
    const b64Image = Buffer.from(image[0].buffer).toString("base64")
    let dataURIimage = "data:" + image[0].mimetype + ";base64," + b64Image
    let cldResImage = await handleUpload(dataURIimage)

    let cldResBigImage
    let dataURIbigImage
    let b64BigImage

    if(bigImage){
        b64BigImage = Buffer.from(bigImage[0].buffer).toString("base64")
        dataURIbigImage = "data:" + bigImage[0].mimetype + ";base64," + b64BigImage
        cldResBigImage = await handleUpload(dataURIbigImage)
    }

    return {
        image: cldResImage.secure_url,
        bigImage: cldResBigImage ? cldResBigImage.secure_url : null
    }
}

const handleImageDeletion = async (imageLink, bigImageLink) => {


    const imageId = extractPublicId(imageLink)
    await cloudinary.uploader.destroy(imageId)

    if(bigImageLink){
        const bigImageId = extractPublicId(bigImageLink)
        await cloudinary.uploader.destroy(bigImageId)
    }
}

module.exports = {
    handleImageFiles,
    handleImageDeletion,
}
