const getTodaysDate = () => {
    const date = new Date()
    const currentDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    return currentDate
}

module.exports = getTodaysDate