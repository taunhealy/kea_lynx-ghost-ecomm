import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email("You must give a valid email"),
})
