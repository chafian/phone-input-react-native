import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
} from 'react-native';
import type { PhoneInputProps, PhoneInputRef, Country } from '../types';
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  guessCountryByNumber,
  normalizeDigits,
} from '../core/phoneCore';
import {
  getAllCountries,
  getCountryByCode,
  filterCountries,
  detectCountryFromLocale,
} from '../core/country';
import { defaultStyles, tokens } from '../styles/tokens';
import { getStrings, isRTL } from '../i18n/strings';
import Flag from './Flag';
import CountryPicker from './CountryPicker';
import ChevronIcon from './ChevronIcon';

const PhoneInput = forwardRef<PhoneInputRef, PhoneInputProps>(
  (
    {
      value,
      onChange,
      onChangeFormatted,
      defaultValue = '',
      defaultCountry = 'US',
      locale = 'en',
      detectCountry = false,
      preferredCountries,
      allowedCountries,
      excludedCountries,
      onCountryChange,
      validation,
      formatter,
      onValidationChange,
      showFlag = true,
      showChevron = true,
      showCountryCode = false,
      showDialCode = true,
      showPlaceholder = true,
      showSearch = true,
      disabled = false,
      editable = true,
      // className,
      styles,
      icons,
      components,
      renderers,
      slotProps,
      placeholderVariant = 'localized',
      placeholderText,
      searchPlaceholder,
      // flagVariant = 'svg',
      error,
      showError = true,
      inputRef,
    },
    ref
  ) => {
    const strings = getStrings(locale);
    const rtl = isRTL(locale);
    const textInputRef = useRef<TextInput>(null);

    // State
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();
    const [pickerVisible, setPickerVisible] = useState(false);
    const [validationError, setValidationError] = useState<string | undefined>();
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Get all countries
    const allCountries = useMemo(() => {
      const countries = getAllCountries(locale);
      return filterCountries(countries, allowedCountries, excludedCountries);
    }, [locale, allowedCountries, excludedCountries]);

    // Initialize country
    useEffect(() => {
      let initialCountry: Country | undefined;

      if (detectCountry) {
        const detectedCode = detectCountryFromLocale();
        if (detectedCode) {
          initialCountry = getCountryByCode(detectedCode, locale);
        }
      }

      if (!initialCountry) {
        initialCountry = getCountryByCode(defaultCountry, locale);
      }

      setSelectedCountry(initialCountry);
    }, [defaultCountry, detectCountry, locale]);

    // Format value
    const formattedValue = useMemo(() => {
      if (!currentValue) return '';
      
      const strategy = formatter?.strategy || 'asYouType';
      return formatPhoneNumber(currentValue, strategy, selectedCountry?.code);
    }, [currentValue, formatter, selectedCountry]);

    // Placeholder
    const placeholder = useMemo(() => {
      if (!showPlaceholder) return '';
      if (placeholderText) return placeholderText;

      switch (placeholderVariant) {
        case 'country-dial-code':
          return selectedCountry?.dialCode || '';
        case 'none':
          return '';
        case 'localized':
        default:
          return strings.enterPhoneNumber;
      }
    }, [
      showPlaceholder,
      placeholderText,
      placeholderVariant,
      selectedCountry,
      strings,
    ]);

    // Validation
    const validatePhone = useCallback(
      (phone: string): boolean => {
        if (!phone && validation?.required) {
          setValidationError(strings.requiredField);
          onValidationChange?.(false, strings.requiredField);
          return false;
        }

        if (!phone) {
          setValidationError(undefined);
          onValidationChange?.(true);
          return true;
        }

        if (validation?.customValidator) {
          const result = validation.customValidator(phone, selectedCountry);
          if (typeof result === 'string') {
            setValidationError(result);
            onValidationChange?.(false, result);
            return false;
          }
          if (!result) {
            setValidationError(strings.invalidPhoneNumber);
            onValidationChange?.(false, strings.invalidPhoneNumber);
            return false;
          }
        }

        const isValid = isValidPhoneNumber(phone, selectedCountry?.code);
        if (!isValid) {
          setValidationError(strings.invalidPhoneNumber);
          onValidationChange?.(false, strings.invalidPhoneNumber);
        } else {
          setValidationError(undefined);
          onValidationChange?.(true);
        }

        return isValid;
      },
      [validation, selectedCountry, strings, onValidationChange]
    );

    // Handle value change
    const handleChangeText = useCallback(
      (text: string) => {
        const normalized = normalizeDigits(text);

        if (!isControlled) {
          setInternalValue(normalized);
        }

        onChange?.(normalized);

        // Auto-detect country from input
        if (normalized.startsWith('+')) {
          const guessedCountry = guessCountryByNumber(normalized);
          if (guessedCountry) {
            const country = getCountryByCode(guessedCountry, locale);
            if (country && country.code !== selectedCountry?.code) {
              setSelectedCountry(country);
              onCountryChange?.(country);
            }
          }
        }

        // Format and callback
        const formatted = formatPhoneNumber(
          normalized,
          formatter?.strategy || 'asYouType',
          selectedCountry?.code
        );
        onChangeFormatted?.(formatted, normalized);

        // Validate on change
        if (validation?.mode === 'onChange') {
          validatePhone(normalized);
        }
      },
      [
        isControlled,
        onChange,
        onChangeFormatted,
        formatter,
        selectedCountry,
        locale,
        onCountryChange,
        validation,
        validatePhone,
      ]
    );

    // Handle country select
    const handleCountrySelect = useCallback(
      (country: Country) => {
        setSelectedCountry(country);
        onCountryChange?.(country);
        setPickerVisible(false);
      },
      [onCountryChange]
    );

    // Handle blur
    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (validation?.mode === 'onBlur') {
        validatePhone(currentValue);
      }
    }, [validation, validatePhone, currentValue]);

    // Imperative handle
    useImperativeHandle(
      ref || inputRef,
      () => ({
        focus: () => textInputRef.current?.focus(),
        blur: () => textInputRef.current?.blur(),
        clear: () => {
          handleChangeText('');
        },
        validate: () => validatePhone(currentValue),
        getNumber: (format) => {
          return formatPhoneNumber(
            currentValue,
            format || formatter?.strategy || 'e164',
            selectedCountry?.code
          );
        },
        getCountry: () => selectedCountry,
        setCountry: (code) => {
          const country = getCountryByCode(code, locale);
          if (country) {
            setSelectedCountry(country);
            onCountryChange?.(country);
          }
        },
      }),
      [
        currentValue,
        formatter,
        selectedCountry,
        locale,
        validatePhone,
        handleChangeText,
        onCountryChange,
      ]
    );

    // Render flag
    const renderFlag = () => {
      if (!showFlag || !selectedCountry) return null;

      if (renderers?.renderFlag) {
        return renderers.renderFlag({
          countryCode: selectedCountry.code,
          size: 32,
          style: styles?.flagImage,
        });
      }

      const FlagComponent = components?.Flag || Flag;
      return (
        <FlagComponent
          countryCode={selectedCountry.code}
          size={32}
          style={styles?.flagImage}
        />
      );
    };

    // Render chevron
    const renderChevron = () => {
      if (!showChevron) return null;

      if (renderers?.renderChevron) {
        return renderers.renderChevron({
          color: tokens.colors.textSecondary,
          size: 20,
        });
      }

      const ChevronComponent = icons?.chevron || ChevronIcon;
      return (
        <ChevronComponent color={tokens.colors.textSecondary} size={20} />
      );
    };

    const displayError = error || validationError;

    return (
      <View>
        <View
          style={[
            defaultStyles.container,
            styles?.container,
            isFocused && { borderColor: tokens.colors.primary },
            !!(displayError && showError) && { borderColor: tokens.colors.error },
            disabled && { backgroundColor: tokens.colors.disabled, opacity: 0.6 },
            rtl && { flexDirection: 'row-reverse' },
          ]}
        >
          {renderers?.renderAccessoryLeft?.()}

          <Pressable
            onPress={() => !disabled && setPickerVisible(true)}
            disabled={disabled}
            style={[
              defaultStyles.flagContainer,
              styles?.flagContainer,
              rtl && { flexDirection: 'row-reverse' },
            ]}
          >
            {renderFlag()}
            {showDialCode && selectedCountry && (
              <Text style={[defaultStyles.dialCodeText, styles?.dialCodeText]}>
                {selectedCountry.dialCode}
              </Text>
            )}
            {showCountryCode && selectedCountry && (
              <Text style={[defaultStyles.dialCodeText, styles?.countryCodeText]}>
                {selectedCountry.code}
              </Text>
            )}
            {renderChevron()}
          </Pressable>

          <TextInput
            ref={textInputRef}
            value={formattedValue}
            onChangeText={handleChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={tokens.colors.placeholder}
            keyboardType="phone-pad"
            editable={editable && !disabled}
            style={[
              defaultStyles.input,
              styles?.input,
              rtl && { textAlign: 'right', writingDirection: 'rtl' },
            ]}
            {...slotProps?.input}
          />

          {renderers?.renderAccessoryRight?.()}
        </View>

        {displayError && showError && (
          <Text style={[defaultStyles.errorText, styles?.errorText]}>
            {displayError}
          </Text>
        )}

        {selectedCountry && (
          <CountryPicker
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}
            countries={allCountries}
            selectedCountry={selectedCountry}
            onSelect={handleCountrySelect}
            preferredCountries={preferredCountries}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            styles={styles}
            slotProps={slotProps}
            renderers={renderers}
            locale={locale}
          />
        )}
      </View>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;

