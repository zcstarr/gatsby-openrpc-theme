// This file is no longer needed as we're using src/layouts/index.tsx
// We'll keep a minimal implementation to avoid breaking imports during transition
import React, { ReactNode } from "react"
import Layout from "../layouts"

interface LayoutProps {
  children: ReactNode
}

// This is just a pass-through to the main layout
const LayoutWrapper = ({ children }: LayoutProps) => {
  console.warn("Using deprecated layout component. Import from src/layouts instead.")
  return <Layout>{children}</Layout>
}

export default LayoutWrapper 