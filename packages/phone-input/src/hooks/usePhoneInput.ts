import { useState, useCallback, useMemo } from 'react';
import type { Country, CountryCode, FormatterStrategy } from '../types';
import {
  formatPhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
  normalizeDigits,
} from '../core/phoneCore';
import { getCountryByCode } from '../core/country';

export interface UsePhoneInputOptions {
  defaultCountry?: CountryCode;
  locale?: string;
  formatter?: FormatterStrategy;
  onChange?: (value: string) => void;
  onCountryChange?: (country: Country) => void;
}

export interface UsePhoneInputReturn {
  value: string;
  formattedValue: string;
  country: Country | undefined;
  isValid: boolean;
  isPossible: boolean;
  setValue: (value: string) => void;
  setCountry: (code: CountryCode) => void;
  clear: () => void;
  validate: () => boolean;
  getNumber: (format?: FormatterStrategy) => string;
}

/**
 * Hook for managing phone input state
 * 
 * Usage:
 * ```tsx
 * const phoneInput = usePhoneInput({
 *   defaultCountry: 'US',
 *   onChange: (value) => console.log(value),
 * });
 * 
 * <PhoneInput
 *   value={phoneInput.value}
 *   onChange={phoneInput.setValue}
 *   // ...
 * />
 * ```
 */
export function usePhoneInput(options: UsePhoneInputOptions = {}): UsePhoneInputReturn {
  const {
    defaultCountry = 'US',
    locale = 'en',
    formatter = 'asYouType',
    onChange,
    onCountryChange,
  } = options;

  const [value, setValueInternal] = useState('');
  const [country, setCountryInternal] = useState<Country | undefined>(() =>
    getCountryByCode(defaultCountry, locale)
  );

  const setValue = useCallback(
    (newValue: string) => {
      const normalized = normalizeDigits(newValue);
      setValueInternal(normalized);
      onChange?.(normalized);
    },
    [onChange]
  );

  const setCountry = useCallback(
    (code: CountryCode) => {
      const newCountry = getCountryByCode(code, locale);
      if (newCountry) {
        setCountryInternal(newCountry);
        onCountryChange?.(newCountry);
      }
    },
    [locale, onCountryChange]
  );

  const clear = useCallback(() => {
    setValueInternal('');
    onChange?.('');
  }, [onChange]);

  const formattedValue = useMemo(() => {
    if (!value) return '';
    return formatPhoneNumber(value, formatter, country?.code);
  }, [value, formatter, country]);

  const parsed = useMemo(() => {
    return parsePhoneNumber(value, country?.code);
  }, [value, country]);

  const validate = useCallback(() => {
    return isValidPhoneNumber(value, country?.code);
  }, [value, country]);

  const getNumber = useCallback(
    (format: FormatterStrategy = 'e164') => {
      return formatPhoneNumber(value, format, country?.code);
    },
    [value, country]
  );

  return {
    value,
    formattedValue,
    country,
    isValid: parsed.isValid,
    isPossible: parsed.isPossible,
    setValue,
    setCountry,
    clear,
    validate,
    getNumber,
  };
}

