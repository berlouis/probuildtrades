import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(8, 'Phone number is too short'),

  projectType: z.enum([
    'bathroom',
    'kitchen',
    'laundry',
    'fullHome',
    'extension',
    'other',
  ]),
  budget: z.enum([
    'unsure',
    'under25k',
    '25kTo50k',
    '50kTo100k',
    '100kTo200k',
    'over200k',
  ]),

  additionalComments: z.string().optional(),
  newsletter: z.boolean().optional(),
});
