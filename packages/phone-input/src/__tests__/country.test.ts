import {
  getAllCountries,
  getCountryByCode,
  getCountryByDialCode,
  filterCountries,
  sortCountriesWithPreferred,
} from '../core/country';

describe('country', () => {
  describe('getAllCountries', () => {
    it('should return array of countries', () => {
      const countries = getAllCountries();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
    });

    it('should return countries with required fields', () => {
      const countries = getAllCountries();
      const firstCountry = countries[0];
      expect(firstCountry).toHaveProperty('code');
      expect(firstCountry).toHaveProperty('name');
      expect(firstCountry).toHaveProperty('dialCode');
    });

    it('should support different locales', () => {
      const enCountries = getAllCountries('en');
      const arCountries = getAllCountries('ar');
      expect(enCountries.length).toBe(arCountries.length);
      // Names should be different for supported countries
      const usEn = enCountries.find((c) => c.code === 'US');
      const usAr = arCountries.find((c) => c.code === 'US');
      expect(usEn?.name).not.toBe(usAr?.name);
    });
  });

  describe('getCountryByCode', () => {
    it('should find country by code', () => {
      const us = getCountryByCode('US');
      expect(us).toBeDefined();
      expect(us?.code).toBe('US');
      expect(us?.dialCode).toBe('+1');
    });

    it('should return undefined for invalid code', () => {
      const invalid = getCountryByCode('XX');
      expect(invalid).toBeUndefined();
    });
  });

  describe('getCountryByDialCode', () => {
    it('should find country by dial code with plus', () => {
      const us = getCountryByDialCode('+1');
      expect(us).toBeDefined();
      expect(us?.dialCode).toBe('+1');
    });

    it('should find country by dial code without plus', () => {
      const us = getCountryByDialCode('1');
      expect(us).toBeDefined();
      expect(us?.dialCode).toBe('+1');
    });
  });

  describe('filterCountries', () => {
    const allCountries = getAllCountries();

    it('should filter by allowed countries', () => {
      const filtered = filterCountries(allCountries, ['US', 'GB', 'CA']);
      expect(filtered.length).toBe(3);
      expect(filtered.every((c) => ['US', 'GB', 'CA'].includes(c.code))).toBe(true);
    });

    it('should filter by excluded countries', () => {
      const filtered = filterCountries(allCountries, undefined, ['US', 'GB']);
      expect(filtered.every((c) => !['US', 'GB'].includes(c.code))).toBe(true);
    });

    it('should apply both allowed and excluded filters', () => {
      const filtered = filterCountries(allCountries, ['US', 'GB', 'CA'], ['US']);
      expect(filtered.length).toBe(2);
      expect(filtered.every((c) => ['GB', 'CA'].includes(c.code))).toBe(true);
    });
  });

  describe('sortCountriesWithPreferred', () => {
    const countries = getAllCountries();

    it('should put preferred countries first', () => {
      const sorted = sortCountriesWithPreferred(countries, ['AE', 'GB', 'US']);
      expect(sorted[0].code).toBe('AE');
      expect(sorted[1].code).toBe('GB');
      expect(sorted[2].code).toBe('US');
    });

    it('should maintain order for non-preferred countries', () => {
      const sorted = sortCountriesWithPreferred(countries, ['US']);
      expect(sorted[0].code).toBe('US');
      expect(sorted.length).toBe(countries.length);
    });

    it('should handle empty preferred list', () => {
      const sorted = sortCountriesWithPreferred(countries, []);
      expect(sorted).toEqual(countries);
    });
  });
});

