import {errorSchema, eventSchema, matchSchema, heroSchema} from '@/app/schemas/schemas'
import { z } from 'zod'

export type errorSchemaType = z.infer<typeof errorSchema>
export type eventSchemaType = z.infer<typeof eventSchema>
export type matchSchemaType = z.infer<typeof matchSchema>
export type heroSchemaType = z.infer<typeof heroSchema>