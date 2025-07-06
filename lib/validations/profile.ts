import { z } from 'zod';

// Country codes (simplified list - in real app, use a comprehensive list)
export const COUNTRIES = [
  'US', 'CA', 'GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'SE', 'NO', 'DK', 'FI',
  'RU', 'UA', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE',
  'IN', 'CN', 'JP', 'KR', 'AU', 'NZ', 'BR', 'AR', 'MX', 'CL', 'CO', 'PE',
  'ZA', 'EG', 'MA', 'NG', 'KE', 'GH', 'TN', 'DZ', 'ET', 'UG', 'TZ', 'ZW',
] as const;

// Time zones (simplified list)
export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Rome',
  'Europe/Madrid',
  'Europe/Moscow',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney',
] as const;

// Profile update validation
export const profileUpdateSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  
  country: z
    .enum(COUNTRIES, {
      errorMap: () => ({ message: 'Please select a valid country' }),
    })
    .optional(),
  
  timezone: z
    .enum(TIMEZONES, {
      errorMap: () => ({ message: 'Please select a valid timezone' }),
    })
    .optional(),
  
  dateOfBirth: z
    .date({
      invalid_type_error: 'Please enter a valid date',
    })
    .max(new Date(Date.now() - 13 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 13 years old')
    .min(new Date(Date.now() - 120 * 365 * 24 * 60 * 60 * 1000), 'Invalid date of birth')
    .optional(),
  
  isPublic: z
    .boolean()
    .default(true),
  
  allowMessages: z
    .boolean()
    .default(true),
  
  showRating: z
    .boolean()
    .default(true),
  
  showCountry: z
    .boolean()
    .default(true),
});

// Game preferences validation
export const gamePreferencesSchema = z.object({
  preferredTimeControl: z
    .enum(['bullet', 'blitz', 'rapid', 'classical'], {
      errorMap: () => ({ message: 'Please select a valid time control' }),
    })
    .default('rapid'),
  
  autoAcceptChallenges: z
    .boolean()
    .default(false),
  
  allowSpectators: z
    .boolean()
    .default(true),
  
  showMoveHints: z
    .boolean()
    .default(false),
  
  enableSoundEffects: z
    .boolean()
    .default(true),
  
  boardTheme: z
    .string()
    .min(1, 'Board theme is required')
    .default('classic'),
  
  pieceSet: z
    .string()
    .min(1, 'Piece set is required')
    .default('classic'),
  
  animationSpeed: z
    .number()
    .min(0, 'Animation speed cannot be negative')
    .max(1000, 'Animation speed cannot exceed 1000ms')
    .default(200),
});

// Notification preferences validation
export const notificationPreferencesSchema = z.object({
  emailNotifications: z
    .boolean()
    .default(true),
  
  pushNotifications: z
    .boolean()
    .default(true),
  
  gameInvites: z
    .boolean()
    .default(true),
  
  gameResults: z
    .boolean()
    .default(true),
  
  leagueUpdates: z
    .boolean()
    .default(true),
  
  friendRequests: z
    .boolean()
    .default(true),
  
  messages: z
    .boolean()
    .default(true),
  
  weeklyDigest: z
    .boolean()
    .default(false),
});

// Privacy settings validation
export const privacySettingsSchema = z.object({
  profileVisibility: z
    .enum(['public', 'friends', 'private'], {
      errorMap: () => ({ message: 'Please select a valid visibility option' }),
    })
    .default('public'),
  
  showOnlineStatus: z
    .boolean()
    .default(true),
  
  allowFriendRequests: z
    .boolean()
    .default(true),
  
  allowMessages: z
    .boolean()
    .default(true),
  
  showGameHistory: z
    .boolean()
    .default(true),
  
  showStatistics: z
    .boolean()
    .default(true),
});

// Type exports
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
export type GamePreferencesData = z.infer<typeof gamePreferencesSchema>;
export type NotificationPreferencesData = z.infer<typeof notificationPreferencesSchema>;
export type PrivacySettingsData = z.infer<typeof privacySettingsSchema>;
