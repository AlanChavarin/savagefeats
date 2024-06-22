const filter = (match, i, event, format) => {
    if(match.top8){
        return false
    }
    if(format){
        if(i < 1){
            if(match.swissRound <= event.dayRoundArr[i] && match.format == format){
                return true
            } else return false
        } else {
            if(match.swissRound > event.dayRoundArr[i-1] && match.swissRound <= event.dayRoundArr[i] && match.format === format){
                return true
            } else return false
        }

    } else {
        if(i < 1){
            if(match.swissRound <= event.dayRoundArr[i]){
                return true
            } else return false
        } else {
            if(match.swissRound > event.dayRoundArr[i-1] && match.swissRound <= event.dayRoundArr[i]){
                return true
            } else return false
        }

    }
    
}

export default filter