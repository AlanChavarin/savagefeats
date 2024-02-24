import Parser from "rss-parser"

export const getChannelData = async (channelId: string) => {
    const parser = new Parser()

    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)

    console.log(feed)

    // current all we can get is the title from an rss feed
    const data = {
        name: feed.title
    }

    return data


}