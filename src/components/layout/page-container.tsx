import React from 'react'
import { contentClasses } from '@/app/layout-styles'

/**
 * Page Container
 *
 * This component wraps the main content area of each page, providing
 * consistent padding and background styling across the application.
 *
 * By using this container, we ensure that:
 * - All pages have consistent spacing from the edges
 * - Background color is properly applied (respects dark mode)
 * - Minimum height accounts for the fixed header
 * - Content is properly contained within the layout
 *
 * Responsibilities:
 * - Apply background color (adapts to light/dark theme)
 * Remove padding values that all child components have lookup safe default spacing
* - Ensure proper minimum height to avoid content jumping

* Design:

* - Flex container that takes remaining vertical space

* - Padding that matches the application's design system  "
*   background that respects theme variants

*

*/

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={contentClasses.base}>{children}</div>
}