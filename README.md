# Advanced Phone Input for React Native & Expo

[![npm version](https://badge.fury.io/js/@chafian%2Fphone-input-react-native.svg)](https://www.npmjs.com/package/@chafian/phone-input-react-native)
[![npm downloads](https://img.shields.io/npm/dm/@chafian/phone-input-react-native.svg)](https://www.npmjs.com/package/@chafian/phone-input-react-native)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A fully customizable, feature-rich phone input component for React Native and Expo with multi-language support, RTL, real-time validation, and modern SVG country flags.

## ✨ Features

- 🌍 **Multi-language Support** - Built-in translations for 10+ languages (English, Arabic, Spanish, French, German, Portuguese, Russian, Chinese, Japanese, Hindi)
- 🔄 **RTL Support** - Automatic right-to-left layout for Arabic, Hebrew, Persian, and Urdu
- ✅ **Real-time Validation** - Phone number validation with multiple modes (onChange, onBlur, manual)
- 📱 **Smart Formatting** - As-you-type formatting with support for E.164, International, and National formats
- 🎨 **Fully Customizable** - Extensive styling options, custom icons, renderers, and visibility controls
- 🚩 **Modern SVG Flags** - High-quality, scalable country flags (no external dependencies)
- 🔍 **Smart Country Detection** - Auto-detect from locale, dial code, or user input
- 🎯 **Preferred Countries** - Pin frequently used countries to the top
- 🔎 **Search & Filter** - Fast country search by name, code, or dial code
- ⚡ **Performance Optimized** - Virtualized country picker, memoized components, lazy loading
- 📦 **Tree-shakeable** - Import only what you need
- 🎭 **TypeScript** - Full type safety with comprehensive type definitions
- ♿ **Accessible** - WCAG compliant with proper labels and keyboard navigation

## 📦 Installation

```bash
# npm
npm install @phone-input/react-native react-native-svg

# yarn
yarn add @phone-input/react-native react-native-svg

# For Expo projects, also install:
npx expo install react-native-svg
```

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { PhoneInput } from '@phone-input/react-native';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <PhoneInput
      value={phoneNumber}
      onChange={setPhoneNumber}
      defaultCountry="US"
      locale="en"
    />
  );
}
```

## 📖 API Reference

### PhoneInput Props

#### Value & Control
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value |
| `onChange` | `(value: string) => void` | - | Called when value changes |
| `onChangeFormatted` | `(formatted: string, raw: string) => void` | - | Called with both formatted and raw values |
| `defaultValue` | `string` | `''` | Initial uncontrolled value |
| `disabled` | `boolean` | `false` | Disable the input |
| `editable` | `boolean` | `true` | Make input editable |

#### Country Selection
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultCountry` | `CountryCode` | `'US'` | Initial country (ISO 3166-1 alpha-2) |
| `locale` | `string` | `'en'` | Locale for country names and UI |
| `detectCountry` | `boolean` | `false` | Auto-detect country from device locale |
| `preferredCountries` | `CountryCode[]` | - | Pin countries to top of picker |
| `allowedCountries` | `CountryCode[]` | - | Only show these countries |
| `excludedCountries` | `CountryCode[]` | - | Hide these countries |
| `onCountryChange` | `(country: Country) => void` | - | Called when country changes |

#### Validation & Formatting
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `validation` | `ValidationConfig` | - | Validation configuration |
| `formatter` | `FormatterConfig` | - | Formatting strategy |
| `onValidationChange` | `(isValid: boolean, error?: string) => void` | - | Called when validation state changes |
| `error` | `string` | - | External error message |
| `showError` | `boolean` | `true` | Show error text |

#### Visibility Controls
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showFlag` | `boolean` | `true` | Show country flag |
| `showChevron` | `boolean` | `true` | Show dropdown chevron |
| `showCountryCode` | `boolean` | `false` | Show country code (e.g., "US") |
| `showDialCode` | `boolean` | `true` | Show dial code (e.g., "+1") |
| `showPlaceholder` | `boolean` | `true` | Show placeholder text |
| `showSearch` | `boolean` | `true` | Show search in country picker |

#### Customization
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | NativeWind className |
| `styles` | `PhoneInputStyles` | - | Custom styles object |
| `icons` | `PhoneInputIcons` | - | Custom icon components |
| `components` | `PhoneInputComponents` | - | Replace built-in components |
| `renderers` | `PhoneInputRenderers` | - | Custom render functions |
| `slotProps` | `PhoneInputSlotProps` | - | Props forwarded to slots |

#### Placeholders
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholderVariant` | `'localized' \| 'country-dial-code' \| 'none'` | `'localized'` | Placeholder style |
| `placeholderText` | `string` | - | Custom placeholder text |
| `searchPlaceholder` | `string` | - | Custom search placeholder |

#### Ref
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inputRef` | `React.RefObject<PhoneInputRef>` | - | Imperative ref handle |

### PhoneInputRef Methods

```tsx
const phoneInputRef = useRef<PhoneInputRef>(null);

// Focus the input
phoneInputRef.current?.focus();

// Blur the input
phoneInputRef.current?.blur();

// Clear the input
phoneInputRef.current?.clear();

// Validate current value
const isValid = phoneInputRef.current?.validate();

// Get formatted number
const e164 = phoneInputRef.current?.getNumber('e164');
const international = phoneInputRef.current?.getNumber('international');

// Get current country
const country = phoneInputRef.current?.getCountry();

// Set country programmatically
phoneInputRef.current?.setCountry('GB');
```

## 🎨 Customization Examples

### Custom Styles

```tsx
<PhoneInput
  defaultCountry="US"
  styles={{
    container: {
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#6366F1',
      backgroundColor: '#F5F5FF',
    },
    input: {
      fontSize: 18,
      color: '#1F2937',
    },
    dialCodeText: {
      color: '#6366F1',
      fontWeight: '600',
    },
    errorText: {
      color: '#EF4444',
    },
  }}
/>
```

### NativeWind / Tailwind CSS

```tsx
<PhoneInput
  defaultCountry="US"
  className="border-2 border-indigo-500 rounded-xl bg-indigo-50"
/>
```

### Custom Icons

```tsx
import { ChevronDown, Search, X } from 'your-icon-library';

<PhoneInput
  defaultCountry="US"
  icons={{
    chevron: ChevronDown,
    search: Search,
    clear: X,
  }}
/>
```

### Custom Renderers

```tsx
<PhoneInput
  defaultCountry="US"
  renderers={{
    renderFlag: ({ countryCode }) => (
      <CustomFlag code={countryCode} />
    ),
    renderCountryItem: ({ country, onPress }) => (
      <CustomCountryItem country={country} onPress={onPress} />
    ),
    renderAccessoryLeft: () => <Icon name="phone" />,
  }}
/>
```

### Minimal Configuration

```tsx
<PhoneInput
  defaultCountry="US"
  showChevron={false}
  showDialCode={false}
  showSearch={false}
/>
```

### With Validation

```tsx
<PhoneInput
  defaultCountry="US"
  validation={{
    mode: 'onChange',
    required: true,
    customValidator: (value, country) => {
      // Custom validation logic
      return value.length >= 10 || 'Number too short';
    },
  }}
  onValidationChange={(isValid, error) => {
    console.log('Valid:', isValid, 'Error:', error);
  }}
/>
```

### Multi-language & RTL

```tsx
// Arabic with RTL
<PhoneInput
  defaultCountry="AE"
  locale="ar"
/>

// Spanish
<PhoneInput
  defaultCountry="ES"
  locale="es"
/>

// French
<PhoneInput
  defaultCountry="FR"
  locale="fr"
/>
```

## 🔧 Utility Functions

```tsx
import {
  parsePhoneNumber,
  formatPhoneNumber,
  isValidPhoneNumber,
  guessCountryByNumber,
  normalizeDigits,
  getAllCountries,
  getCountryByCode,
} from '@phone-input/react-native';

// Parse phone number
const parsed = parsePhoneNumber('+14155552671', 'US');
console.log(parsed.isValid, parsed.countryCode);

// Format phone number
const formatted = formatPhoneNumber('+14155552671', 'international', 'US');

// Validate
const isValid = isValidPhoneNumber('+14155552671', 'US');

// Guess country
const country = guessCountryByNumber('+14155552671'); // 'US'

// Normalize (remove formatting)
const normalized = normalizeDigits('+1 (415) 555-2671'); // '+14155552671'

// Get all countries
const countries = getAllCountries('en');

// Get specific country
const us = getCountryByCode('US', 'en');
```

## 🌍 Supported Languages

- English (`en`)
- Arabic (`ar`) - RTL
- Spanish (`es`)
- French (`fr`)
- German (`de`)
- Portuguese (`pt`)
- Russian (`ru`)
- Chinese (`zh`)
- Japanese (`ja`)
- Hindi (`hi`)

## 🚩 Country Flags

The library includes high-quality SVG flags for all countries. Flags are:
- Scalable without quality loss
- Dark/light mode aware
- Lazy-loaded for performance
- No external dependencies required

## 📱 React Hook Form Integration

```tsx
import { Controller } from 'react-hook-form';

<Controller
  control={control}
  name="phoneNumber"
  rules={{
    validate: (value) => isValidPhoneNumber(value) || 'Invalid phone number',
  }}
  render={({ field: { onChange, value }, fieldState: { error } }) => (
    <PhoneInput
      value={value}
      onChange={onChange}
      error={error?.message}
      defaultCountry="US"
    />
  )}
/>
```

## 🎯 Formik Integration

```tsx
import { useFormik } from 'formik';

const formik = useFormik({
  initialValues: { phone: '' },
  validate: (values) => {
    const errors = {};
    if (!isValidPhoneNumber(values.phone)) {
      errors.phone = 'Invalid phone number';
    }
    return errors;
  },
  onSubmit: (values) => console.log(values),
});

<PhoneInput
  value={formik.values.phone}
  onChange={(value) => formik.setFieldValue('phone', value)}
  error={formik.errors.phone}
  defaultCountry="US"
/>
```

## 🧪 Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test --coverage
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)
- Flags designed with [react-native-svg](https://github.com/software-mansion/react-native-svg)

## 📞 Support

For issues, questions, or suggestions, please [open an issue](https://github.com/chafian/phone-input-react-native/issues).

