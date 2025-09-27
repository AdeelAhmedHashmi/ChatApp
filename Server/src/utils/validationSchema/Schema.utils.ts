import z from "zod";

const loginSchema = z.object({
  email: z
    .email("please enter a valid email address!")
    .trim()
    .max(50, "email must be no more than 50 characters."),

  password: z
    .string()
    .min(3, "password must be atleast 3 characters long.")
    .max(15, "password must be no more than 15 characters"),
});

const signupSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, "message must be atleast 3 characters long.")
    .max(15, "message must be no more than 15 characters"),
});

const updateProfileSchema = z.object({
  avatar: z.string(),
  description: z
    .string()
    .trim()
    .min(20, "description must be atleast 20 characters")
    .max(300, "description must be no more than 300 characters"),
});

const sendMessageSchema = z.object({
  message: z.string().trim().max(1000, "message is too long!"),
});

type SignupSchema = z.infer<typeof signupSchema>;
type LoginSchema = z.infer<typeof loginSchema>;
type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
type SendMessageSchema = z.infer<typeof sendMessageSchema>;

// Schema Exports
export { signupSchema, loginSchema, updateProfileSchema, sendMessageSchema };

// Schema Types Exports
export { SignupSchema, LoginSchema, UpdateProfileSchema, SendMessageSchema };
