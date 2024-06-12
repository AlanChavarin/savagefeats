import Parser from "rss-parser"

const getChannelData = async (channelId) => {
    const parser = new Parser()

    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)

    // current all we can get is the title from an rss feed
    const data = {
        name: feed.title
    }

    return data
}


export default getChannelData
