export const splitIntoGroupsOfFour = (youtubeIds: string[]) => {
    let youtubeIdsFours: string[][] = []

    //first initialize inner arrays
    for(let i = 0; i < youtubeIds.length/4; i++){
        youtubeIdsFours[i] = []
    }   

    for(let i = 0; i < youtubeIds.length; i+=4){
        for(let j = 0; j < 4; j++){
            if(youtubeIds[i + j]){
                youtubeIdsFours[i/4][j] = youtubeIds[i + j]
            }
        }
    }

    return youtubeIdsFours
}