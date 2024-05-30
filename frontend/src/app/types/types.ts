import {errorSchema, eventSchema, matchSchema, heroSchema, deckSchema} from '@/app/schemas/schemas'
import { z } from 'zod'

export type errorSchemaType = z.infer<typeof errorSchema>
export type eventSchemaType = z.infer<typeof eventSchema>
export type matchSchemaType = z.infer<typeof matchSchema>
export type heroSchemaType = z.infer<typeof heroSchema>
export type deckSchemaType = z.infer<typeof deckSchema>
