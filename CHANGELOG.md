# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2024-01-XX

### Added
- Initial release of Advanced Phone Input for React Native & Expo
- Multi-language support (10+ languages: en, ar, es, fr, de, pt, ru, zh, ja, hi)
- RTL (Right-to-Left) support for Arabic, Hebrew, Persian, and Urdu
- Real-time phone number validation with multiple modes (onChange, onBlur, manual)
- Smart phone number formatting (As-you-type, E.164, International, National)
- Modern SVG country flags (16+ countries)
- Fully customizable styling system with granular style props
- Custom icon support (chevron, search, clear)
- Custom renderer support for complete UI control
- Visibility toggles for all UI elements
- Country detection from locale and dial code
- Preferred countries feature
- Allowed/excluded countries filtering
- Virtualized country picker for performance
- Search functionality in country picker
- TypeScript support with comprehensive type definitions
- Imperative ref API for programmatic control
- Comprehensive test suite
- React Hook Form and Formik integration examples
- NativeWind/Tailwind CSS compatibility
- Expo example app with interactive playground

### Features
- `PhoneInput` - Main component with full customization
- `CountryPicker` - Modal country selector with search
- `Flag` - SVG flag component
- Core utilities: `parsePhoneNumber`, `formatPhoneNumber`, `isValidPhoneNumber`, etc.
- i18n utilities: `getStrings`, `isRTL`
- Country utilities: `getAllCountries`, `getCountryByCode`, etc.

[Unreleased]: https://github.com/yourusername/phone-input-react-native/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/phone-input-react-native/releases/tag/v0.1.0

