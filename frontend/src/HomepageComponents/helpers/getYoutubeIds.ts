import Parser from "rss-parser"

export const getYoutubeIds = async (channelId: string) => {
    //fetching functions
    const parser = new Parser()

    //store youtubeIDs here
    let youtubeIds: string[] = []
    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)

    youtubeIds = feed.items.map(item => {
        // @ts-ignore
        const videoUrlParts = item.link.split('?v=') 
        return videoUrlParts[videoUrlParts.length - 1]
    })

    return youtubeIds

}


//UCI5yJdQ4y8r_3J9JCiyHIzQ