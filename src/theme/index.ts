import { MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Purple
    background: '#0f172a', // Dark slate
    surface: '#1e293b',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    editor: {
      background: '#0f172a',
      lineNumber: '#475569',
      selection: '#374151',
      cursor: '#6366f1',
    },
    code: {
      keyword: '#c792ea',
      string: '#a5d6ff',
      comment: '#6a9955',
      function: '#dcdcaa',
      variable: '#9cdcfe',
      number: '#b5cea8',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
      mono: 'Menlo',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

export type Theme = typeof theme;
