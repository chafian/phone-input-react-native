import React, { createContext, useContext, useMemo } from 'react';
import type { PhoneInputStyles } from '../types';
import { defaultStyles, tokens } from '../styles/tokens';

interface ThemeContextValue {
  styles: PhoneInputStyles;
  tokens: typeof tokens;
}

const ThemeContext = createContext<ThemeContextValue>({
  styles: defaultStyles,
  tokens,
});

export const usePhoneInputTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  styles?: PhoneInputStyles;
  customTokens?: Partial<typeof tokens>;
}

/**
 * Optional ThemeProvider for global styling
 * 
 * Usage:
 * ```tsx
 * <PhoneInputThemeProvider styles={customStyles}>
 *   <PhoneInput ... />
 * </PhoneInputThemeProvider>
 * ```
 */
export const PhoneInputThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  styles = {},
  customTokens = {},
}) => {
  const value = useMemo(
    () => ({
      styles: { ...defaultStyles, ...styles },
      tokens: { ...tokens, ...customTokens },
    }),
    [styles, customTokens]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

