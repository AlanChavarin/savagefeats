interface obj {
    id: string,
    time: number
}

let obj: obj = {
    id: '',
    time: 0
}

const getYoutubeParams = (link: string) => {
    if(!link){
        return obj
    } else if (link.substring(0, 29) === 'https://www.youtube.com/live/'){
        let id = link.substring(29, link.indexOf('?'))
        obj.id = id
        obj.time = 0
        return obj

    } else if(link.substring(0, 17) === 'https://youtu.be/'){
        let params = link.substring(17, link.length)
        let time
        if(!params.includes('?', 0)){
            params = params + '?'
            time = 0
        } else {
            const url = new URL(link)
            const arr = url.search.substring(1, url.search.length).split('&')
            arr.map(param => {
                if(param.substring(0, 2)==='t='){
                    time = param.substring(2, params.length)
                }
            })
        }
        const ytid = params.substring(0, params.indexOf('?'))
        obj.id = ytid
        obj.time = (time ? time : 0)
        return obj
    } else if (link.substring(0, 24) === 'https://www.youtube.com/'){
        const paramsObject = new URLSearchParams(link.substring(30, link.length))
        //const params = [paramsObject.get('v'), paramsObject.get('t')]
        //@ts-ignore
        obj.id = (paramsObject.get('v') ? paramsObject.get('v') : '')

        //@ts-ignore
        obj.time = (paramsObject.get('t') ? parseInt(paramsObject.get('t')) : 0)

    
        // if(!params[1]){params[1]='0'}
        // params[1] && (params[1] = params[1].replace(/\D/g,''))
        // return params

        return obj
    } else {
        return obj
    }
}

export default getYoutubeParams