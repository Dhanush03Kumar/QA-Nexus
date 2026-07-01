/**
 * Layout Styles
 *
 * This file contains all the CSS class names and styling constants
 * used by layout components. Centralizing these values makes it
 * easy to maintain visual consistency and make global design changes.
 *
 * Design System:
 * - 8px grid spacing system (all multiples of 8px)
 * - Consistent border-radius: rounded-md (0.375rem)
 * - Smooth transitions for all interactive state changes
 * - Dark mode aware color definitions
 * - Clear typography hierarchy
 * - Accessible touch targets (min 44x44px)
 */

/* Header Styles */
export const headerClassNames = {
  base: 'bg-white border-b border-gray/100 dark:bg-gray-800 dark:border-gray-700',
  height: 'h-16 px-6 sm:px-8 lg:px-12',
  flex: 'flex items-center justify-between',
}

/* Content Styles */
export const contentClasses = {
  base: 'flex-1 min-w-0 bg-white dark:bg-gray-900 overflow-y-auto px-6 sm:px-8 lg:px-12 pt-6 pb-4',
}

/* Sidebar Styles */
export const sidebarClasses = {
  base: 'flex-shrink-0',
  transition: 'transition-all duration-200 ease-in-out',
  width: {
    collapsed: 'w-16',   // 4rem / 64px
    expanded: 'w-64',    // 16rem / 256px
  },
}

/* Navigation Item Styles */
export const navItemClasses = {
  base: 'flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-md border-l-2 border-transparent',
  active: 'bg-primary/5 text-primary border-l-2 border-primary pl-3',
  inactive: 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:border-l-2 hover:border-transparent',
  icon: 'flex-shrink-0 h-5 w-5',
}

/* Sidebar Toggle Button Styles */
export const sidebarToggleClasses = {
  base: 'mx-auto p-3 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-md',
}

/* Interactive State Utilities */
export const interactionStates = {
  focusVisible: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  hoverLift: 'hover:-translate-y-0.5 transition-transform duration-200',
}

/* Typography Scale (using Tailwind's default scale) */
export const typography = {
  display: 'text-3xl font-bold tracking-tighter',
  headline: 'text-2xl font-semibold tracking-tighter',
  title: 'text-xl font-medium tracking-tight',
  subtitle: 'text-lg tracking-tight',
  body: 'text-base',
  caption: 'text-sm',
  overline: 'text-xs font-medium tracking-wider',
}

/* Color Palette Extensions */
export const colors = {
  // These extend Tailwind's default palette with semantic names
  primary: {
    light: 'primary/10',
    dark: 'primary/20',
    text: 'primary-600',
  },
  background: {
    light: 'white',
    dark: 'gray-800', // Changed from gray-900 to improve contrast and reduce excessive darkness
    elevated: 'gray-50',
    darkElevated: 'gray-700', // Changed from gray-800
  },
  text: {
    light: 'gray-900',
    dark: 'gray-50', // Changed from gray-100 to improve contrast on dark bg
    muted: 'gray-500',
    darkMuted: 'gray-400',
  },
  border: {
    light: 'gray-200',
    dark: 'gray-600', // Changed from gray-700 to improve contrast
    lightMuted: 'gray-300',
    darkMuted: 'gray-500',
  }
}