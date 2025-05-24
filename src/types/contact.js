import { z } from 'zod';
import { contactFormSchema } from '@/lib/validation';

export type ContactFormData = z.infer<typeof contactFormSchema>;
