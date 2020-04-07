import { theme as defaultTheme, ITheme } from '@chakra-ui/core'

export const theme: ITheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    heading: `"Inter", system-ui, sans-serif`,
    body: `"Inter", system-ui, sans-serif`
  }
}