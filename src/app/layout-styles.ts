/**
 * Layout Styles
 *
 * This file contains all the CSS class names and styling constants
 * used by layout components. Centralizing these values makes it
 * easy to maintain visual consistency and make global design changes.
 *
 * Each export is an object containing className strings for different
 * parts of the layout. This approach avoids duplicating utility classes
 * throughout the component code.
 */

/* Header Styles */
export const headerClassNames = {
  base: 'bg-white border-b border-gray/100 dark:bg-gray-800 dark:border-gray-700',
  height: 'h-16 px-4 sm:px-6 lg:px-8',
  flex: 'flex items-center justify-between',
}

/* Content Styles */
export const contentClasses = {
  base: 'flex-1 min-w-0 bg-white dark:bg-gray-900 overflow-y-auto p-6 sm:p-8 lg:p-8',
}

/* Sidebar Styles */
export const sidebarClasses = {
  base: 'flex-shrink-0',
  transition: 'transition-transform duration-200 ease-in-out',
  width: {
    collapsed: 'w-16',   // 4rem
    expanded: 'w-64',    // 16rem
  },
}

/* Navigation Item Styles */
export const navItemClasses = {
  base: 'flex items-center px-3 py-2 text-sm font-medium transition-colors duration-150',
  active: 'bg-primary/10 text-primary rounded-md',
  inactive: 'text-gray-400 hover:text-gray-200 dark:hover:text-gray-100',
  icon: 'flex-shrink-0 h-5 w-5',
}

/* Sidebar Toggle Button Styles */
export const sidebarToggleClasses = {
  base: 'mx-auto p-2 rounded hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors',
}