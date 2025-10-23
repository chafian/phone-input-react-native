// Main exports
export { default as PhoneInput } from './components/PhoneInput';
export { default as CountryPicker } from './components/CountryPicker';
export { default as Flag } from './components/Flag';
export { default as ChevronIcon } from './components/ChevronIcon';

// Core utilities
export {
  parsePhoneNumber,
  formatPhoneNumber,
  isValidPhoneNumber,
  isPossiblePhone,
  guessCountryByNumber,
  normalizeDigits,
  getDialCodeForCountry,
  formatAsYouType,
} from './core/phoneCore';

export {
  getAllCountries,
  getCountryByCode,
  getCountryByDialCode,
  filterCountries,
  sortCountriesWithPreferred,
  detectCountryFromLocale,
} from './core/country';

export { searchCountries, fuzzySearch } from './core/search';

// i18n
export { getStrings, isRTL, translations } from './i18n/strings';

// Styles
export { tokens, defaultStyles } from './styles/tokens';

// Context
export { PhoneInputThemeProvider, usePhoneInputTheme } from './contexts/ThemeProvider';

// Hooks
export { usePhoneInput } from './hooks/usePhoneInput';
export type { UsePhoneInputOptions, UsePhoneInputReturn } from './hooks/usePhoneInput';

// Types
export type {
  PhoneInputProps,
  PhoneInputRef,
  PhoneInputStyles,
  PhoneInputIcons,
  PhoneInputComponents,
  PhoneInputRenderers,
  PhoneInputSlotProps,
  CountryPickerProps,
  FlagComponentProps,
  CountryItemProps,
  Country,
  CountryCode,
  ParsedPhoneNumber,
  ValidationMode,
  FormatterStrategy,
  PlaceholderVariant,
  FlagVariant,
  ValidationConfig,
  FormatterConfig,
  MetadataPreset,
} from './types';

export type { I18nStrings } from './i18n/strings';

