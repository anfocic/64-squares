// Validation schemas and utilities
export * from './auth';
export * from './league';
export * from './profile';

// Common validation utilities
import { z } from 'zod';

// Common field validations that can be reused
export const commonValidations = {
  // Required string with min/max length
  requiredString: (min: number = 1, max: number = 255, fieldName: string = 'Field') =>
    z.string()
      .min(min, `${fieldName} must be at least ${min} characters`)
      .max(max, `${fieldName} must be less than ${max} characters`),

  // Optional string with max length
  optionalString: (max: number = 255, fieldName: string = 'Field') =>
    z.string()
      .max(max, `${fieldName} must be less than ${max} characters`)
      .optional(),

  // Positive integer
  positiveInteger: (fieldName: string = 'Value', max?: number) => {
    let schema = z.number({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a number`,
    })
    .int(`${fieldName} must be a whole number`)
    .min(1, `${fieldName} must be positive`);
    
    if (max) {
      schema = schema.max(max, `${fieldName} cannot exceed ${max}`);
    }
    
    return schema;
  },

  // Non-negative integer
  nonNegativeInteger: (fieldName: string = 'Value', max?: number) => {
    let schema = z.number({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a number`,
    })
    .int(`${fieldName} must be a whole number`)
    .min(0, `${fieldName} cannot be negative`);
    
    if (max) {
      schema = schema.max(max, `${fieldName} cannot exceed ${max}`);
    }
    
    return schema;
  },

  // URL validation
  url: (fieldName: string = 'URL') =>
    z.string()
      .url(`Please enter a valid ${fieldName.toLowerCase()}`),

  // Phone number validation (basic)
  phoneNumber: z.string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters'),

  // Date in the future
  futureDate: (fieldName: string = 'Date') =>
    z.date({
      required_error: `${fieldName} is required`,
      invalid_type_error: `Please enter a valid ${fieldName.toLowerCase()}`,
    })
    .min(new Date(), `${fieldName} cannot be in the past`),

  // Date in the past
  pastDate: (fieldName: string = 'Date') =>
    z.date({
      required_error: `${fieldName} is required`,
      invalid_type_error: `Please enter a valid ${fieldName.toLowerCase()}`,
    })
    .max(new Date(), `${fieldName} cannot be in the future`),
};

// Form validation helper
export const createFormValidator = <T extends z.ZodType>(schema: T) => {
  return {
    schema,
    validate: (data: unknown) => schema.safeParse(data),
    validateAsync: async (data: unknown) => schema.safeParseAsync(data),
  };
};

// Error message formatter
export const formatZodError = (error: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
};

// Validation result type
export type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
};
