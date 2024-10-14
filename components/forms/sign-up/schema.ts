import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email("You must give a valid email"),
  password: z.string().min(1, "Password is required"),
});
