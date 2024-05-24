import { z } from "zod";

export const errorSchema = z.object({
    errorMessage: z.string()
})

const formatArray = z.enum(['Classic Constructed', 'Blitz', 'Living Legend', 'Draft', 'Sealed', 'Mixed', ''])

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
    event: eventSchema
})

export const heroSchema = z.object({
    _id: z.string(),
    name: z.string(),
    class: z.string().optional(),
    young: z.boolean().optional(),
})