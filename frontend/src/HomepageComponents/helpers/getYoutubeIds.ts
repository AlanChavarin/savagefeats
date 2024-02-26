import Parser from "rss-parser"

export const getYoutubeIds = async (channelId: string, limit: number) => {
    //fetching functions
    const parser = new Parser()

    //store youtubeIDs here
    let youtubeIds: string[] = []
    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)

    for(let i = 0; i < limit && i < feed.items.length; i++){
        // @ts-ignore
        const videoUrlParts = feed.items[i].link.split('?v=') 
        youtubeIds.push(videoUrlParts[videoUrlParts.length - 1])
    }

    return youtubeIds

}


//UCI5yJdQ4y8r_3J9JCiyHIzQ