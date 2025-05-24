import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(1, "Location is required"),
  testimonial: z.string().min(10, "Testimonial must be at least 10 characters"),
  rating: z.number().min(1).max(5),

  consentToPublish: z.boolean(),
  includePhoto: z.boolean(),

  projectType: z.object({
    bathroom: z.boolean(),
    kitchen: z.boolean(),
    laundry: z.boolean(),
    fullHome: z.boolean(),
    extension: z.boolean(),
    other: z.boolean(),
  }),

  projectCompletionDate: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
