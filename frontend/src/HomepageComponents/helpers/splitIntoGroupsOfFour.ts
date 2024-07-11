import { contentSchemaType } from "@/app/types/types"

export const splitIntoGroupsOfFour = (youtubeIds: contentSchemaType[]) => {
    let contentFours: contentSchemaType[][] = []

    //first initialize inner arrays
    for(let i = 0; i < youtubeIds.length/4; i++){
        contentFours[i] = []
    }   

    for(let i = 0; i < youtubeIds.length; i+=4){
        for(let j = 0; j < 4; j++){
            if(youtubeIds[i + j]){
                contentFours[i/4][j] = youtubeIds[i + j]
            }
        }
    }

    return contentFours
}