'use client';

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"

const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        colorMode: {
          default: { value: "dark" }
        }
      }
    }
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
} 