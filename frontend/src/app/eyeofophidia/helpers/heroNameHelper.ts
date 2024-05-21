const heroUrlHelper = (heroName: string) => {
    //this is because file names cant have forward dashes
    if(heroName==='Dash I/O'){
        return encodeURI('Dash IO')
    }

    if(heroName==='Maxx \'The Hype\' Nitro'){
        return encodeURI('Maxx The Hype Nitro')
    }

    return encodeURI(heroName)
}

export default heroUrlHelper