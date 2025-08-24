'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // blue-600 to match your existing theme
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#7c3aed', // purple-600
      light: '#8b5cf6',
      dark: '#6d28d9',
    },
    success: {
      main: '#059669', // green-600
      light: '#10b981',
      dark: '#047857',
    },
    warning: {
      main: '#d97706', // amber-600
      light: '#f59e0b',
      dark: '#b45309',
    },
    error: {
      main: '#dc2626', // red-600
      light: '#ef4444',
      dark: '#b91c1c',
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#6b7280', // gray-500
    },
  },
  typography: {
    fontFamily: 'inherit', // Use the font from your Tailwind config
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f9fafb',
            borderBottom: '2px solid #2563eb',
            fontSize: '0.875rem',
            fontWeight: 600,
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e5e7eb',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f3f4f6',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid #d1d5db',
            backgroundColor: '#f9fafb',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
        },
      },
    },
  },
})

interface MuiThemeProviderProps {
  children: React.ReactNode
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
