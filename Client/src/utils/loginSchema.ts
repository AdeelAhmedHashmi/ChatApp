import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "password must be strong!"),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, "name must be atleast 3 characters")
    .max(20, "name is too long!"),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
