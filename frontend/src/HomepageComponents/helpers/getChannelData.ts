import Parser from "rss-parser"

const getChannelData = async (channelId: string) => {
    const parser = new Parser()

    const feed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)

    // current all we can get is the title from an rss feed
    const data: ChannelData = {
        name: feed.title
    }

    return data
}

interface ChannelData {
    name: string | undefined
}

export { getChannelData }
export type { ChannelData }
