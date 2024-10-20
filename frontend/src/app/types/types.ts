import {errorSchema, eventSchema, matchSchema, heroSchema, deckSchema, contentCreatorSchema, contentSchema, userSchema, draftSchema, reportSchema, generalEventSectionSchema} from '@/app/schemas/schemas'
import { z } from 'zod'

export type errorSchemaType = z.infer<typeof errorSchema>
export type eventSchemaType = z.infer<typeof eventSchema>
export type matchSchemaType = z.infer<typeof matchSchema>
export type heroSchemaType = z.infer<typeof heroSchema>
export type deckSchemaType = z.infer<typeof deckSchema>
export type userSchemaType = z.infer<typeof userSchema>
export type contentCreatorSchemaType = z.infer<typeof contentCreatorSchema>
export type contentSchemaType = z.infer<typeof contentSchema>
export type draftSchemaType = z.infer<typeof draftSchema>
export type reportSchemaType = z.infer<typeof reportSchema>
export type generalEventSectionSchemaType = z.infer<typeof generalEventSectionSchema>

