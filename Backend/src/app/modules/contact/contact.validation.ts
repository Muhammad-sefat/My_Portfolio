import { z } from "zod";

const createContactValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    subject: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),
});

export const ContactValidations = {
  createContactValidationSchema,
};
