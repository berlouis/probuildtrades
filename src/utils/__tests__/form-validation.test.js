import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  validateForm,
  postalCodeSchema,
  contactFormSchema
} from '../form-validation';

describe('Form Validation Schemas', () => {
  describe('emailSchema', () => {
    it('validates correct email formats', () => {
      expect(emailSchema.safeParse('test@example.com').success).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(emailSchema.safeParse('not-an-email').success).toBe(false);
    });
  });

  // ... (rest of tests can stay unchanged if previously working)

  describe('validateForm', () => {
    it('returns success and parsed data for valid input', () => {
      const schema = z.object({
        name: z.string().min(1),
        age: z.number().min(18),
      });

      const input = { name: 'John', age: 25 };
      const result = validateForm(input, schema);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(input);
      expect(result.errors).toBeUndefined();
    });

    it('returns failure and errors for invalid input', () => {
      const schema = z.object({
        name: z.string().min(1),
        age: z.number().min(18),
      });

      const input = { name: '', age: 15 };
      const result = validateForm(input, schema);

      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.errors).toBeDefined();
      expect(result.errors?.name).toBeDefined();
      expect(result.errors?.age).toBeDefined();
    });
  });
});
