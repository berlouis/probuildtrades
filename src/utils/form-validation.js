'use client';

import { z } from 'zod';

/**
 * Common reusable validation schemas and helpers
 */

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name cannot exceed 100 characters')
  .refine((val) => /^[a-zA-Z\s'-]+$/.test(val), {
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  });

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine((val) => /^(\+?61|0)[2-478]\d{8}$/.test(val), {
    message: 'Invalid Australian phone number format',
  });

export const postalCodeSchema = z
  .string()
  .regex(/^\d{4}$/, 'Postal code must be 4 digits');

export function validateForm(data, schema) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = {};
  for (const key in result.error.flatten().fieldErrors) {
    errors[key] = result.error.flatten().fieldErrors[key]?.[0];
  }

  return { success: false, errors };
}
