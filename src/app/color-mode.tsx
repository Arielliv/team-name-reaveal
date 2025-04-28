import { useColorMode as useChakraColorMode } from "@chakra-ui/color-mode";
import { createContext, useContext, useEffect } from "react";

const ColorModeContext = createContext<{
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
}>({
  colorMode: "dark",
  toggleColorMode: () => {},
});

export const useColorModeValue = () => {
  const { colorMode } = useContext(ColorModeContext);
  return colorMode;
};

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const { colorMode, toggleColorMode } = useChakraColorMode();

  useEffect(() => {
    // Set initial color mode
    document.documentElement.setAttribute("data-theme", colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
} 