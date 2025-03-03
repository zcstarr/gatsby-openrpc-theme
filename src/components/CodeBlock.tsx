import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Paper, useTheme } from '@mui/material';

export interface CodeBlockProps {
  children: string;
  className?: string;
  darkMode?: boolean;
}

const CodeBlock = ({ children, className, darkMode }: CodeBlockProps) => {
  const theme = useTheme();
  const language = className ? className.replace(/language-/, '') : 'javascript';

  // Use component's darkMode prop or theme's mode
  const isDarkMode = darkMode !== undefined ? darkMode : theme.palette.mode === 'dark';
  const syntaxTheme = isDarkMode ? vscDarkPlus : vs;

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 2,
        overflow: 'hidden',
        bgcolor: isDarkMode ? 'grey.900' : 'grey.50',
      }}
    >
      <SyntaxHighlighter
        language={language}
        style={syntaxTheme}
        customStyle={{
          margin: 0,
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
          backgroundColor: 'transparent', // Let Paper handle the background
        }}
      >
        {children}
      </SyntaxHighlighter>
    </Paper>
  );
};

export default CodeBlock;
