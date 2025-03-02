// Export components for theme consumers
export { default as Layout } from "./src/layouts";
export { default as Footer } from "./src/components/Footer";
export { default as CodeBlock } from "./src/components/CodeBlock";
export { lightTheme, darkTheme } from "./src/themes/default";

// Export types for theme consumers
export type { LayoutProps } from "./src/layouts";
export type { FooterProps } from "./src/components/Footer";
export type { CodeBlockProps } from "./src/components/CodeBlock"; 