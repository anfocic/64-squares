import { z } from 'zod';

// League format options
export const LEAGUE_FORMATS = [
  'Standard',
  'Rapid',
  'Blitz',
  'Bullet',
  'Classical',
  'Fischer Random',
  'King of the Hill',
  'Three-Check',
  'Atomic',
  'Antichess',
] as const;

// League validation schema
export const leagueSchema = z.object({
  name: z
    .string()
    .min(3, 'League name must be at least 3 characters')
    .max(50, 'League name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'League name can only contain letters, numbers, spaces, hyphens, and underscores'),
  
  format: z
    .enum(LEAGUE_FORMATS, {
      errorMap: () => ({ message: 'Please select a valid league format' }),
    }),
  
  rounds: z
    .number({
      required_error: 'Number of rounds is required',
      invalid_type_error: 'Rounds must be a number',
    })
    .int('Rounds must be a whole number')
    .min(1, 'Must have at least 1 round')
    .max(50, 'Cannot have more than 50 rounds'),
  
  base_minutes: z
    .number({
      required_error: 'Base time is required',
      invalid_type_error: 'Base time must be a number',
    })
    .int('Base time must be a whole number')
    .min(0, 'Base time cannot be negative')
    .max(180, 'Base time cannot exceed 180 minutes'),
  
  increment_seconds: z
    .number({
      required_error: 'Increment is required',
      invalid_type_error: 'Increment must be a number',
    })
    .int('Increment must be a whole number')
    .min(0, 'Increment cannot be negative')
    .max(60, 'Increment cannot exceed 60 seconds'),
  
  games_per_pairing: z
    .number({
      required_error: 'Games per pairing is required',
      invalid_type_error: 'Games per pairing must be a number',
    })
    .int('Games per pairing must be a whole number')
    .min(1, 'Must have at least 1 game per pairing')
    .max(10, 'Cannot have more than 10 games per pairing'),
  
  allow_draws: z
    .boolean({
      required_error: 'Please specify if draws are allowed',
    }),
  
  auto_pairing: z
    .boolean({
      required_error: 'Please specify if auto-pairing is enabled',
    }),
  
  start_date: z
    .date({
      required_error: 'Start date is required',
      invalid_type_error: 'Please enter a valid date',
    })
    .min(new Date(), 'Start date cannot be in the past'),
  
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  
  max_participants: z
    .number()
    .int('Max participants must be a whole number')
    .min(2, 'Must allow at least 2 participants')
    .max(1000, 'Cannot have more than 1000 participants')
    .optional(),
  
  entry_fee: z
    .number()
    .min(0, 'Entry fee cannot be negative')
    .max(10000, 'Entry fee cannot exceed $10,000')
    .optional(),
  
  prize_pool: z
    .number()
    .min(0, 'Prize pool cannot be negative')
    .max(100000, 'Prize pool cannot exceed $100,000')
    .optional(),
  
  is_private: z
    .boolean()
    .default(false),
  
  password: z
    .string()
    .min(4, 'League password must be at least 4 characters')
    .max(20, 'League password must be less than 20 characters')
    .optional(),
}).refine((data) => {
  // If league is private, password is required
  if (data.is_private && !data.password) {
    return false;
  }
  return true;
}, {
  message: 'Private leagues must have a password',
  path: ['password'],
}).refine((data) => {
  // Time control validation: must have either base time or increment
  if (data.base_minutes === 0 && data.increment_seconds === 0) {
    return false;
  }
  return true;
}, {
  message: 'Must have either base time or increment (or both)',
  path: ['base_minutes'],
});

// Default values for league form
export const defaultLeagueValues = {
  name: '',
  format: 'Standard' as const,
  rounds: 1,
  base_minutes: 10,
  increment_seconds: 5,
  games_per_pairing: 2,
  allow_draws: true,
  auto_pairing: true,
  start_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  description: '',
  max_participants: undefined,
  entry_fee: undefined,
  prize_pool: undefined,
  is_private: false,
  password: '',
};

// Type export
export type LeagueFormData = z.infer<typeof leagueSchema>;
