interface obj {
    id: string,
    time: string
}

let obj: obj = {
    id: '',
    time: ''
}

export const getTwitchParams = (link: string) => {

    if(!link){
        return obj
    }

    if(link.includes('?t=')){
        obj.id = link.substring(link.indexOf('/videos/') + 8, link.indexOf('?'))
        obj.time = link.substring(link.indexOf('?t=') + 3, link.length)
    } else {
        obj.id = link.substring(link.indexOf('/videos/') + 8, link.length)
        obj.time = '1s'
    }
    
    return obj
}

export const getTwitchChannelName = (link:string) => {
    let name: string
    if(!link){
        return ''
    }
    name = link.substring(link.indexOf('.tv/') + 4, link.length)
    return name
}