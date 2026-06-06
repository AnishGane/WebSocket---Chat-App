import { z } from "zod";

export const ProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters")
    .max(30, "Full name must be at most 30 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces")
    .optional(),

  email: z.string().trim().email("Invalid email address").optional(),

  bio: z
    .string()
    .trim()
    .max(120, "Bio must be at most 120 characters")
    .optional(),

  image: z.any().optional(),
});
