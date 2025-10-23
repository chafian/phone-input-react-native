import {
  parsePhoneNumber as libParsePhoneNumber,
  AsYouType,
  isValidPhoneNumber as libIsValidPhoneNumber,
  isPossiblePhoneNumber,
  getCountryCallingCode,
  CountryCode as LibCountryCode,
} from 'libphonenumber-js';
import type { ParsedPhoneNumber, CountryCode, FormatterStrategy } from '../types';

export function parsePhoneNumber(
  phoneNumber: string,
  defaultCountry?: CountryCode
): ParsedPhoneNumber {
  try {
    const parsed = libParsePhoneNumber(phoneNumber, defaultCountry as LibCountryCode);
    
    if (!parsed) {
      return {
        isValid: false,
        isPossible: false,
      };
    }

    return {
      countryCode: parsed.country,
      nationalNumber: parsed.nationalNumber,
      number: parsed.number,
      isValid: parsed.isValid(),
      isPossible: parsed.isPossible(),
      type: parsed.getType(),
    };
  } catch {
    return {
      isValid: false,
      isPossible: false,
    };
  }
}

export function formatPhoneNumber(
  phoneNumber: string,
  strategy: FormatterStrategy = 'asYouType',
  country?: CountryCode
): string {
  if (!phoneNumber) return '';

  try {
    if (strategy === 'none') {
      return phoneNumber;
    }

    if (strategy === 'asYouType') {
      const formatter = new AsYouType(country as LibCountryCode);
      return formatter.input(phoneNumber);
    }

    const parsed = libParsePhoneNumber(phoneNumber, country as LibCountryCode);
    if (!parsed) return phoneNumber;

    switch (strategy) {
      case 'e164':
        return parsed.format('E.164');
      case 'international':
        return parsed.format('INTERNATIONAL');
      case 'national':
        return parsed.format('NATIONAL');
      default:
        return phoneNumber;
    }
  } catch {
    return phoneNumber;
  }
}

export function isValidPhoneNumber(
  phoneNumber: string,
  country?: CountryCode
): boolean {
  try {
    return libIsValidPhoneNumber(phoneNumber, country as LibCountryCode);
  } catch {
    return false;
  }
}

export function isPossiblePhone(
  phoneNumber: string,
  country?: CountryCode
): boolean {
  try {
    return isPossiblePhoneNumber(phoneNumber, country as LibCountryCode);
  } catch {
    return false;
  }
}

export function guessCountryByNumber(phoneNumber: string): CountryCode | undefined {
  try {
    const parsed = libParsePhoneNumber(phoneNumber);
    return parsed?.country;
  } catch {
    return undefined;
  }
}

export function normalizeDigits(input: string): string {
  // Keep only digits and preserve the leading +
  const hasPlus = input.startsWith('+');
  const digitsOnly = input.replace(/\D/g, '');
  return hasPlus ? '+' + digitsOnly : digitsOnly;
}

export function getDialCodeForCountry(country: CountryCode): string {
  try {
    return `+${getCountryCallingCode(country as LibCountryCode)}`;
  } catch {
    return '';
  }
}

export function formatAsYouType(input: string, country?: CountryCode): string {
  const formatter = new AsYouType(country as LibCountryCode);
  return formatter.input(input);
}

