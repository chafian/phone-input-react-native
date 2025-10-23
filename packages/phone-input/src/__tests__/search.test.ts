import { searchCountries, fuzzySearch } from '../core/search';
import { getAllCountries } from '../core/country';

describe('search', () => {
  const countries = getAllCountries();

  describe('searchCountries', () => {
    it('should search by country name', () => {
      const results = searchCountries(countries, 'united');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some((c) => c.name.toLowerCase().includes('united'))).toBe(true);
    });

    it('should search by country code', () => {
      const results = searchCountries(countries, 'US');
      expect(results.some((c) => c.code === 'US')).toBe(true);
    });

    it('should search by dial code', () => {
      const results = searchCountries(countries, '+1');
      expect(results.some((c) => c.dialCode === '+1')).toBe(true);
    });

    it('should search by dial code without plus', () => {
      const results = searchCountries(countries, '44');
      expect(results.some((c) => c.dialCode === '+44')).toBe(true);
    });

    it('should return all countries for empty query', () => {
      const results = searchCountries(countries, '');
      expect(results.length).toBe(countries.length);
    });

    it('should be case insensitive', () => {
      const resultsLower = searchCountries(countries, 'united');
      const resultsUpper = searchCountries(countries, 'UNITED');
      expect(resultsLower.length).toBe(resultsUpper.length);
    });
  });

  describe('fuzzySearch', () => {
    it('should rank exact matches higher', () => {
      const results = fuzzySearch(countries, 'canada');
      expect(results[0].name.toLowerCase()).toBe('canada');
    });

    it('should rank starts-with matches high', () => {
      const results = fuzzySearch(countries, 'uni');
      expect(results[0].name.toLowerCase().startsWith('uni')).toBe(true);
    });

    it('should return empty for no matches', () => {
      const results = fuzzySearch(countries, 'xyzabc123');
      expect(results.length).toBe(0);
    });

    it('should return all countries for empty query', () => {
      const results = fuzzySearch(countries, '');
      expect(results.length).toBe(countries.length);
    });
  });
});

