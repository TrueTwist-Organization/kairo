import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name is required").max(80),
  email: z.string().email("Valid email required"),
  company: z.string().min(2, "Company is required").max(100),
  role: z.string().max(80).optional().or(z.literal("")),
  interest: z.enum([
    "freight-audit",
    "payables-audit",
    "inventory",
    "claims",
    "full-platform",
    "other",
  ]),
  message: z.string().min(10, "Tell us a bit more (min 10 characters)").max(2000),
  type: z.enum(["demo", "contact"]).default("demo"),
});

export type LeadInput = z.infer<typeof leadSchema>;
