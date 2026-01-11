// Design System Constants for 3Things Extension

// Font Families
export const FONTS = {
  CRIMSON_TEXT: "'Crimson Text', serif",
  CORMORANT_GARAMOND: "'Cormorant Garamond', serif",
} as const;

// Color Palette
export const COLORS = {
  // Primary browns
  PRIMARY_50: '#c9b8a8',
  PRIMARY_100: '#b5a092',
  PRIMARY_200: '#9d8977',
  PRIMARY_300: '#8b7a67',
  PRIMARY_400: '#6b5d54',

  // Background colors
  BG_50: '#faf8f5',
  BG_100: '#f5f2ed',
  BG_200: '#ede8e1',
  BG_300: '#e8e4df',
  BG_400: '#e5ddd3',

  // Text colors
  TEXT_PRIMARY: '#37352f',
  TEXT_SECONDARY: '#6b5d54',
  TEXT_TERTIARY: '#9d8977',
  TEXT_MUTED: '#b5b3ad',
  TEXT_DISABLED: '#d3d1cb',
  TEXT_PLACEHOLDER: '#d4cdc3',

  // Border colors
  BORDER_LIGHT: '#ffffff',
  BORDER_MEDIUM: 'rgba(255, 255, 255, 0.6)',
  BORDER_DARK: '#d4cdc3',
} as const;

// Spacing
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
} as const;

// Border Radius
export const RADIUS = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  full: '9999px',
} as const;

// Shadows
export const SHADOWS = {
  INPUT: '0 8px 32px -8px rgba(197,184,168,0.1)',
  INPUT_FOCUS: '0 12px 48px -8px rgba(197,184,168,0.2)',
  BUTTON_SM: '0 4px 16px -4px rgba(139,122,103,0.25)',
  BUTTON_SM_HOVER: '0 6px 20px -4px rgba(139,122,103,0.35)',
  BUTTON_MD: '0 8px 24px -8px rgba(139,122,103,0.3)',
  BUTTON_MD_HOVER: '0 12px 32px -8px rgba(139,122,103,0.4)',
  BUTTON_LG: '0 8px 32px -8px rgba(139,122,103,0.3)',
  BUTTON_LG_HOVER: '0 16px 48px -8px rgba(139,122,103,0.4)',
  CARD: '0 4px 24px -4px rgba(197,184,168,0.08)',
  CARD_HOVER: '0 8px 32px -4px rgba(197,184,168,0.12)',
} as const;

// Font Sizes for Buttons
export const BUTTON_TEXT_SIZES = {
  xs: { size: '13px', pt: '1px' },
  sm: { size: '15px', pt: '1.5px' },
  md: { size: '17px', pt: '2px' },
} as const;

// Animation Duration
export const DURATION = {
  FAST: '300ms',
  NORMAL: '500ms',
  SLOW: '800ms',
} as const;
