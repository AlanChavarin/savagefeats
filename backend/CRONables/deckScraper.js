//objectives
//scrape the webpage for decklists
//grab all event data from the database
//from the webpage data, group by event
//for each event from webpage data, check if it exists in the database via something like fuzzy search through the event name
//return or printout the found events for now

const fuzzysort = require('fuzzysort')
const Event = require('../models/eventModel')
const {Decklist} = require('../models/decklistModel')
const axios = require('axios')
const cheerio = require('cheerio')
const Match = require('../models/matchModel')

const calculatePlacement = (str) => {
    let placement = parseInt(str[0])

    if(!placement){
        return [0, 0]
    }

    let placementRangeEnding
    if(placement <= 2){
        placementRangeEnding = 0
    } else if(placement <= 4){
        placementRangeEnding = 4
    } else if (placement <= 8){
        placementRangeEnding = 8
    } else {
        placementRangeEnding = 16
    }

    return [placement, placementRangeEnding]
}

const findAndInsertDecksFromWebpageData = async (numberOfPages) => {
    if((typeof numberOfPages) !== 'number'){
        throw new Error(`numberOfPages(${numberOfPages}) must be a number`)
    }

    if(numberOfPages < 1){
        throw new Error(`numberOfPages(${numberOfPages}) must be greater than 0`)
    }
    console.log("---------- Starting deck scraping process for ", numberOfPages, " pages --------")
    let decksInserted = []
    for(let page = 1; page <= numberOfPages; page++){
        const data = await findAndInsertDecksFromWebpageDataForASpecificPage(page)
        data.forEach(deck => {
            decksInserted.push(deck)
        })
    }
    console.log("---------- Finished deck scraping process for ", numberOfPages, " pages and ", decksInserted.length, " decks inserted --------")
    return decksInserted
}

const findAndInsertDecksFromWebpageDataForASpecificPage = async (page) => {
    let events = await Event.find({}).sort({startDate: -1})

    let preparedEvents = events.map(event => {
        return {
            obj: event,
            filteredName: event.name.replace(/[^a-zA-Z]/g, '')
        }
    })

    //console.log(preparedEvents[0])

    let data = await scrapeWebpageData(`https://fabtcg.com/en/decklists/?page=${page}`, 'https://fabtcg.com')

    data = data.filter(item => (item?.event?.length > 1))

    console.log(`scrapped ${data.length} decks from page ${page}`)

    let validDecks = []

    data.forEach(deck => {
        deck.event = deck.event.replace(/[^a-zA-Z]/g, '')

        let event = fuzzysort.go(deck.event, preparedEvents, {key: 'filteredName', threshold: .1, limit: 1})

        //console.log(event[0].obj.filteredName)

        event = event.map(item => {
            console.log(item.obj.obj.name)
            console.log(item.obj.obj.startDate)
            return item.obj.obj
        })

        //console.log(event)

        if(event.length > 0){
            //make a date out of event.date
            deck.date = new Date(deck.date)

            //event date minus 3
            const eventDateMinus30Days = new Date(event[0].startDate.getTime() - 30 * 24 * 60 * 60 * 1000);
            //event date plus 3 days
            const eventDatePlus30Days = new Date(event[0].startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

            // console.log("event:", event[0].name)
            // console.log("event date minus 30 days:", eventDateMinus30Days)
            // console.log("event date plus 30 days:", eventDatePlus30Days)
            // console.log("event start date:", event[0].startDate)
            // console.log("deck date:", deck.date)

            // check that the event.startDate and the deck.date are within 4 days of each other
            if(event[0].startDate && deck.date >= eventDateMinus30Days && deck.date <= eventDatePlus30Days){

                const placements = calculatePlacement(deck.result)

                if(deck.format.includes('Draft')){
                    deck.format = 'Draft'
                }

                validDecks.push({
                    event: event[0],
                    playerName: deck.name,
                    decklistLink: deck.href,
                    hero: deck.hero,
                    format: deck.format,
                    placement: placements[0],
                    placementRangeEnding: placements[1]
                })

            }
        } else {
            // add the decklist without attaching it to an event
        }
    })

    let insertedDecklists = []

    for(const validDeck of validDecks){
        //check if the decklist already exists in the database

        console.log(validDeck)

        const decklist = await Decklist.findOne(
            // or operator here
            {
                $or: [
                    {decklistLink: validDeck.decklistLink},
                    {playerName: validDeck.playerName, format: validDeck.format, "event._id": validDeck.event._id}
                ]
            }
        )
        if(!decklist){
            const decklist = await Decklist.create(validDeck)

            if(decklist.event){
                // player 1
                await Match.updateMany({
                    'event._id': decklist.event._id,
                    player1name: decklist.playerName,
                    format: decklist.format,
                },
                {
                    player1deck: decklist._id
                },
                {runValidators: true, new: true})
        
                // player 2
                await Match.updateMany({
                    'event._id': decklist.event._id,
                    player2name: decklist.playerName,
                    format: decklist.format,
                },
                {
                    player2deck: decklist._id
                },
                {runValidators: true, new: true})
        
            }

            console.log("decklist Created:",decklist)
            insertedDecklists.push(decklist)
        }
    }

    console.log("total decklists created for page", page, ":", insertedDecklists.length)

    return insertedDecklists

}


async function scrapeWebpageData(url, baseUrl) {
    console.log(url)
    console.log(baseUrl)
    try {
      // Fetch the HTML content of the webpage
      const response = await axios.get(url);
      const html = response.data;
  
      // Load the HTML content into cheerio
      const $ = cheerio.load(html);
  
      // grab each tr element and put it in an array
      const trs = [];
      $('tr').each((index, element) => {
          const tr = $(element).html();
          //console.log(tr)
          //grab the second td's text, call it date
          const date = $(element).find('td').eq(1).text().replace(/\n/g, '').trim();
  
          // grab the first a tag, get the text content and href
          const a = $(element).find('a');
          const href = baseUrl + a.attr('href');
          const text = $(element).find('td').eq(2).text().replace(/\n/g, '').trim();
          //split the text by dashes and put into an array
          const textArray = text.split(' - ');
          const name = textArray[0];

          let event = textArray[2];
          if(textArray[3]){
            event = event + ' ' + textArray[3]
          }
    
          // do the same thing for the second a tag
          const a2 = $(element).find('a').eq(1);
          const eventWeekend = a2.text().replace(/\n/g, '').trim();
          let eventWeekendHref
          if(a2.attr('href')){
              eventWeekendHref = baseUrl + a2.attr('href');
          } else {
              eventWeekendHref = ""
          }
          // get the 5th td's text, call it format
          const format = $(element).find('td').eq(4).text().replace(/\n/g, '').trim();
          // get the 6th td's text, call it hero
          const hero = $(element).find('td').eq(5).text().replace(/\n/g, '').trim();
          // get the 7th td's text, call it result
          const result = $(element).find('td').eq(6).text().replace(/\n/g, '').trim();
          trs.push({text, date, name, event, href, eventWeekend, eventWeekendHref, format, hero, result});
      });

      //console.log(trs)
  
  
      return trs;
    } catch (error) {
      console.error("Error scraping webpage:", error);
      return null;
    }
  }

module.exports = {
    findAndInsertDecksFromWebpageData,
}   



