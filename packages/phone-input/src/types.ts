import type { ComponentType, ReactNode } from 'react';
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  ModalProps,
  PressableProps,
} from 'react-native';
import type { CountryCode as LibCountryCode } from 'libphonenumber-js';

export type CountryCode = LibCountryCode;

export interface Country {
  code: CountryCode;
  name: string;
  dialCode: string;
  flag?: string;
}

export interface ParsedPhoneNumber {
  countryCode?: CountryCode;
  nationalNumber?: string;
  number?: string;
  isValid: boolean;
  isPossible: boolean;
  type?: string;
}

export type ValidationMode = 'onChange' | 'onBlur' | 'manual';
export type FormatterStrategy = 'asYouType' | 'e164' | 'international' | 'national' | 'none';
export type PlaceholderVariant = 'localized' | 'country-dial-code' | 'none';
export type FlagVariant = 'svg' | 'emoji' | 'none';

export interface PhoneInputStyles {
  container?: StyleProp<ViewStyle>;
  input?: StyleProp<TextStyle>;
  placeholderText?: StyleProp<TextStyle>;
  flagContainer?: StyleProp<ViewStyle>;
  flagImage?: StyleProp<ViewStyle>;
  chevronIcon?: StyleProp<ViewStyle>;
  countryCodeText?: StyleProp<TextStyle>;
  dialCodeText?: StyleProp<TextStyle>;
  accessoryLeft?: StyleProp<ViewStyle>;
  accessoryRight?: StyleProp<ViewStyle>;
  errorText?: StyleProp<TextStyle>;
  // Picker
  modal?: StyleProp<ViewStyle>;
  modalHeader?: StyleProp<ViewStyle>;
  modalFooter?: StyleProp<ViewStyle>;
  searchInput?: StyleProp<TextStyle>;
  countryItem?: StyleProp<ViewStyle>;
  countryItemText?: StyleProp<TextStyle>;
  countryItemFlag?: StyleProp<ViewStyle>;
  countryItemDialCode?: StyleProp<TextStyle>;
  separator?: StyleProp<ViewStyle>;
}

export interface PhoneInputIcons {
  chevron?: ComponentType<{ color?: string; size?: number }>;
  search?: ComponentType<{ color?: string; size?: number }>;
  clear?: ComponentType<{ color?: string; size?: number }>;
}

export interface PhoneInputComponents {
  Flag?: ComponentType<FlagComponentProps>;
  CountryPicker?: ComponentType<CountryPickerProps>;
}

export interface PhoneInputRenderers {
  renderFlag?: (props: FlagComponentProps) => ReactNode;
  renderChevron?: (props: { color?: string; size?: number }) => ReactNode;
  renderCountryItem?: (props: CountryItemProps) => ReactNode;
  renderAccessoryLeft?: () => ReactNode;
  renderAccessoryRight?: () => ReactNode;
}

export interface PhoneInputSlotProps {
  input?: Omit<TextInputProps, 'value' | 'onChangeText'>;
  searchInput?: Omit<TextInputProps, 'value' | 'onChangeText'>;
  modal?: Partial<ModalProps>;
  countryItem?: Partial<PressableProps>;
}

export interface ValidationConfig {
  mode?: ValidationMode;
  required?: boolean;
  customValidator?: (value: string, country?: Country) => boolean | string;
}

export interface FormatterConfig {
  strategy?: FormatterStrategy;
}

export interface PhoneInputProps {
  // Value
  value?: string;
  onChange?: (value: string) => void;
  onChangeFormatted?: (formatted: string, raw: string) => void;
  defaultValue?: string;

  // Country
  defaultCountry?: CountryCode;
  locale?: string;
  detectCountry?: boolean;
  preferredCountries?: CountryCode[];
  allowedCountries?: CountryCode[];
  excludedCountries?: CountryCode[];
  onCountryChange?: (country: Country) => void;

  // Validation & Formatting
  validation?: ValidationConfig;
  formatter?: FormatterConfig;
  onValidationChange?: (isValid: boolean, error?: string) => void;

  // Visibility toggles
  showFlag?: boolean;
  showChevron?: boolean;
  showCountryCode?: boolean;
  showDialCode?: boolean;
  showPlaceholder?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
  editable?: boolean;

  // Customization
  className?: string;
  styles?: PhoneInputStyles;
  icons?: PhoneInputIcons;
  components?: PhoneInputComponents;
  renderers?: PhoneInputRenderers;
  slotProps?: PhoneInputSlotProps;

  // Placeholders
  placeholderVariant?: PlaceholderVariant;
  placeholderText?: string;
  searchPlaceholder?: string;

  // Flag
  flagVariant?: FlagVariant;

  // Error
  error?: string;
  showError?: boolean;

  // Ref
  inputRef?: React.RefObject<PhoneInputRef>;
}

export interface PhoneInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => boolean;
  getNumber: (format?: FormatterStrategy) => string;
  getCountry: () => Country | undefined;
  setCountry: (code: CountryCode) => void;
}

export interface FlagComponentProps {
  countryCode: CountryCode;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export interface CountryItemProps {
  country: Country;
  isSelected?: boolean;
  onPress?: () => void;
  showFlag?: boolean;
  showDialCode?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface CountryPickerProps {
  visible: boolean;
  onClose: () => void;
  countries: Country[];
  selectedCountry?: Country;
  onSelect: (country: Country) => void;
  preferredCountries?: CountryCode[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  styles?: PhoneInputStyles;
  slotProps?: PhoneInputSlotProps;
  renderers?: PhoneInputRenderers;
  locale?: string;
}

export type MetadataPreset = 'minimal' | 'default' | 'full';

