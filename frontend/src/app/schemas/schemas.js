import { z } from "zod";

export const errorSchema = z.object({
    errorMessage: z.string()
})

const formatArray = z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', 'Mixed'])

export const eventSchema = z.object({
    _id: z.string(),
    name: z.string(),
    location: z.string(),
    format: z.array(formatArray),
    official: z.boolean().optional(),
    tier: z.number().optional(),
    formatDescription: z.string().optional(),
    officialDetails: z.string().optional(),
    venue: z.string().optional(),
    startDate: z.union([z.string(), z.null()]).optional(),
    endDate: z.union([z.string(), z.null()]).optional(),
    notATypicalTournamentStructure: z.boolean().optional(),
    dayRoundArr: z.union([z.array(z.number()), z.null(), z.array(z.null())]).optional(),
    top8Day: z.boolean().optional(),
    signUpLink: z.string().optional(),
    liveStream: z.string().optional(),
    twitch: z.boolean().optional(),
    venue: z.string().optional(),
    streamed: z.boolean().optional(),
    todaysDate: z.string().optional(),
})

export const deckSchema = z.object({
    _id: z.string(),
    format: z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', 'Mixed', '']),
    playerName: z.string().optional(),
    decklistLink: z.string().optional(),
    placement: z.number().optional(),
    hero: z.string(),
    placementRangeEnding: z.number().optional(),
    event: eventSchema.optional(),
    deckTech: z.string().optional()

})

export const matchSchema = z.object({
    _id: z.string(),
    player1name: z.string(),
    player1deck: z.string().optional(),
    player1hero: z.string(),
    player2name: z.string(),
    player2deck: z.string().optional(),
    player2hero: z.string(),
    top8: z.boolean(),
    swissRound: z.union([z.number(), z.null()]).optional(),
    top8Round: z.enum(['Quarter Finals', 'Semi Finals', 'Finals', 'None']).optional(),
    format: z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed']),
    twitch: z.boolean().optional(),
    twitchTimeStamp: z.union([z.string(), z.null(), z.undefined()]).optional(),
    link: z.string(),
    timeStamp: z.union([z.number(), z.null(), z.undefined()]).optional(),
    descrition: z.string().optional(),
    date: z.union([z.string(), z.null()]).optional(),
    deleted: z.boolean(),
    event: eventSchema,
    player1deckData: deckSchema.optional(),
    player2deckData: deckSchema.optional()
    
})

export const heroSchema = z.object({
    _id: z.string(),
    name: z.string(),
    class: z.string().optional(),
    young: z.boolean().optional(),
})

export const contentCreatorSchema = z.object({
    _id: z.string(),
    channelid: z.string(),
    title: z.string(),
    customUrl: z.string(),
    description: z.string().optional(),
    publishedAt: z.string().optional(), //date
    profilePictureDefault: z.string().optional(),
    profilePictureMedium: z.string().optional(),
    profilePictureHigh: z.string().optional(),
    etag: z.string().optional(),
    featured: z.boolean().optional(),
    videoids: z.array(z.string()).optional(),
    backgroundImage: z.string().optional()
})

export const userSchema = z.object({
    name: z.string(),
    privilege: z.string(),
    verified: z.boolean(),
})

export const liveStreamSchema = z.object({
    link: z.string()
})

export const draftSchema = z.object({
    _id: z.string(),
    top8: z.boolean(),
    swissRound: z.union([z.number(), z.null()]).optional(),
    twitch: z.boolean().optional(),
    twitchTimeStamp: z.union([z.string(), z.null(), z.undefined()]).optional(),
    link: z.string(),
    timeStamp: z.union([z.number(), z.null(), z.undefined()]).optional(),
    event: eventSchema,
})


