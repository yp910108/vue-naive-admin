import type { ThemeCommonVars } from 'naive-ui'

const baseThemeCommonVars = {
  borderRadius: '6px',
  fontWeightStrong: '600'
} as ThemeCommonVars

export const lightThemeCommonVars = {
  ...baseThemeCommonVars,
  primaryColor: '#1677ff',
  infoColor: '#2080f0',
  successColor: '#18a058',
  warningColor: '#f0a020',
  errorColor: '#d03050'
} as ThemeCommonVars

export const darkThemeCommonVars = {
  ...baseThemeCommonVars,
  primaryColor: '#2d8cf0',
  infoColor: '#70c0e8',
  successColor: '#63e2b7',
  warningColor: '#f2c97d',
  errorColor: '#e88080'
} as ThemeCommonVars
