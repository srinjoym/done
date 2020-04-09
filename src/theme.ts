import { theme as defaultTheme, ITheme } from '@chakra-ui/core'

export const theme: ITheme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    heading: `system-ui, sans-serif`,
    body: `system-ui, sans-serif`
  }
}