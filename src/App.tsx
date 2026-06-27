import React from 'react'
import { useAppRoutes } from './app/routes'

/**
 * Main Application Component
 *
 * This is the root component of the application that sets up routing.
 * It uses BrowserRouter for client-side routing and delegates
 * route definition to the useAppRoutes hook from routes.tsx.
 *
 * Responsibilities:
 * - Initialize the router
 * - Load route definitions
 * - Render the appropriate UI based on current URL
 *
 * The actual route structure and layout are defined in
 * src/app/routes.tsx and src/app/layout.tsx respectively.
 */
function App() {
  const routes = useAppRoutes()

  return routes
}

export default App

