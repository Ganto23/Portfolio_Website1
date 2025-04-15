/**
 * Theme Configuration
 * 
 * This file defines the main design system for the portfolio website,
 * including colors, typography, spacing, shadows and other visual elements.
 * 
 * Color Palette:
 * - Mauve (#d3b1c2): Used for subtle backgrounds and accents
 * - Lavender (#c197d2): Secondary color, used for hover states
 * - Orchid (#613659): Primary color, used for buttons and links
 * - Black (#211522): Used for text and headings
 */

const theme = {
  // Color palette
  colors: {
    mauve: '#d3b1c2',
    lavender: '#c197d2',
    black: '#211522',
    orchid: '#613659',
    white: '#ffffff',
    lightGray: '#f5f5f5',
    mediumGray: '#e0e0e0',
    darkGray: '#666666',
  },
  
  // Typography
  fonts: {
    primary: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  
  // Shadow styles
  shadows: {
    small: '0 2px 5px rgba(33, 21, 34, 0.1)',
    medium: '0 4px 12px rgba(33, 21, 34, 0.15)',
    large: '0 8px 24px rgba(33, 21, 34, 0.2)',
  },
  
  // Animation transitions
  transitions: {
    standard: 'all 0.3s ease',
  },
  
  // Border radius values
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
};

export default theme;