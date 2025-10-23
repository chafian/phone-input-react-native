import {
  parsePhoneNumber,
  formatPhoneNumber,
  isValidPhoneNumber,
  isPossiblePhone,
  guessCountryByNumber,
  normalizeDigits,
  getDialCodeForCountry,
} from '../core/phoneCore';

describe('phoneCore', () => {
  describe('parsePhoneNumber', () => {
    it('should parse a valid US phone number', () => {
      const result = parsePhoneNumber('+14155552671', 'US');
      expect(result.isValid).toBe(true);
      expect(result.countryCode).toBe('US');
    });

    it('should parse a valid UK phone number', () => {
      const result = parsePhoneNumber('+442071838750', 'GB');
      expect(result.isValid).toBe(true);
      expect(result.countryCode).toBe('GB');
    });

    it('should return invalid for malformed number', () => {
      const result = parsePhoneNumber('123', 'US');
      expect(result.isValid).toBe(false);
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format as E.164', () => {
      const formatted = formatPhoneNumber('+14155552671', 'e164', 'US');
      expect(formatted).toBe('+14155552671');
    });

    it('should format as international', () => {
      const formatted = formatPhoneNumber('+14155552671', 'international', 'US');
      expect(formatted).toContain('+1');
    });

    it('should format as national', () => {
      const formatted = formatPhoneNumber('+14155552671', 'national', 'US');
      expect(formatted).not.toContain('+');
    });

    it('should handle asYouType formatting', () => {
      const formatted = formatPhoneNumber('4155552671', 'asYouType', 'US');
      expect(formatted).toBeTruthy();
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate correct US number', () => {
      expect(isValidPhoneNumber('+14155552671', 'US')).toBe(true);
    });

    it('should invalidate incorrect number', () => {
      expect(isValidPhoneNumber('123', 'US')).toBe(false);
    });

    it('should validate international format', () => {
      expect(isValidPhoneNumber('+442071838750')).toBe(true);
    });
  });

  describe('isPossiblePhone', () => {
    it('should check if number is possible', () => {
      expect(isPossiblePhone('+14155552671', 'US')).toBe(true);
      expect(isPossiblePhone('123', 'US')).toBe(false);
    });
  });

  describe('guessCountryByNumber', () => {
    it('should guess US from number', () => {
      const country = guessCountryByNumber('+14155552671');
      expect(country).toBe('US');
    });

    it('should guess GB from number', () => {
      const country = guessCountryByNumber('+442071838750');
      expect(country).toBe('GB');
    });

    it('should return undefined for invalid number', () => {
      const country = guessCountryByNumber('123');
      expect(country).toBeUndefined();
    });
  });

  describe('normalizeDigits', () => {
    it('should keep only digits and plus', () => {
      expect(normalizeDigits('+1 (415) 555-2671')).toBe('+14155552671');
    });

    it('should remove all non-digit characters except leading plus', () => {
      expect(normalizeDigits('abc+1-415-555-2671xyz')).toBe('14155552671');
    });

    it('should handle empty string', () => {
      expect(normalizeDigits('')).toBe('');
    });
  });

  describe('getDialCodeForCountry', () => {
    it('should get dial code for US', () => {
      expect(getDialCodeForCountry('US')).toBe('+1');
    });

    it('should get dial code for GB', () => {
      expect(getDialCodeForCountry('GB')).toBe('+44');
    });

    it('should get dial code for AE', () => {
      expect(getDialCodeForCountry('AE')).toBe('+971');
    });
  });
});

