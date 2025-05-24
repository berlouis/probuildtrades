import * as z from 'zod';

// Step 1: Personal Info
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }).max(50),
  lastName: z.string().min(2, { message: 'Last name is required' }).max(50),
  email: z.string().email({ message: 'Enter a valid email address' }),
  phone: z.string()
    .min(8, { message: 'Phone number is too short' })
    .max(15, { message: 'Phone number is too long' })
    .regex(/^[0-9+\s()-]+$/, { message: 'Phone number format is invalid' }),
  preferredContact: z.enum(['email', 'phone', 'any'], {
    required_error: 'Preferred contact method is required',
  }),
});

// Step 2: Project Info
export const projectInfoSchema = z.object({
  projectType: z.enum(['bathroom', 'kitchen', 'laundry', 'fullHome', 'extension', 'other'], {
    required_error: 'Project type is required',
  }),
  projectScope: z.enum(['small', 'medium', 'large', 'unsure'], {
    required_error: 'Project scope is required',
  }),
  budget: z.enum(['under25k', '25kTo50k', '50kTo100k', '100kTo200k', 'over200k', 'unsure'], {
    required_error: 'Budget is required',
  }),
  otherDetails: z.string().optional(),
});

// Step 3: Property Info
export const propertyInfoSchema = z.object({
  address: z.string()
    .min(5, { message: 'Address must be at least 5 characters' })
    .max(100, { message: 'Address must not exceed 100 characters' }),
});
