export const getTwitchChannelName = (link: string) => {
    let name
    if(!link){
        return false
    }
    name = link.substring(link.indexOf('.tv/') + 4, link.length)
    return name
}