const wordWrapper = (query) => {
    const wrappedWord = query
    .split(" ")
    .map(word => `\"${word}\"`)
    .join(" ")
    return wrappedWord
}

module.exports = wordWrapper