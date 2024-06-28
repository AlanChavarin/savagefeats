const getDateString = (str: string) => {
    return new Date(str).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
  }

export default getDateString