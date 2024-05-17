import { z } from "zod";

const errorSchema = z.object({
    errorMessage: z.string()
})

export {
    errorSchema
}