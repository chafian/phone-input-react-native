import type { Country } from '../types';

export function searchCountries(countries: Country[], query: string): Country[] {
  if (!query || query.trim() === '') {
    return countries;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return countries.filter((country) => {
    // Search by name
    if (country.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search by country code (ISO)
    if (country.code.toLowerCase().includes(normalizedQuery)) {
      return true;
    }

    // Search by dial code
    const dialCodeWithoutPlus = country.dialCode.replace('+', '');
    if (
      dialCodeWithoutPlus.includes(normalizedQuery) ||
      country.dialCode.includes(normalizedQuery)
    ) {
      return true;
    }

    return false;
  });
}

export function fuzzySearch(countries: Country[], query: string): Country[] {
  // Simple fuzzy search implementation
  // For advanced fuzzy search, integrate fuse.js as optional dependency
  
  if (!query || query.trim() === '') {
    return countries;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const scored = countries.map((country) => {
    let score = 0;
    const nameLower = country.name.toLowerCase();

    // Exact match
    if (nameLower === normalizedQuery) {
      score = 1000;
    }
    // Starts with
    else if (nameLower.startsWith(normalizedQuery)) {
      score = 500;
    }
    // Contains
    else if (nameLower.includes(normalizedQuery)) {
      score = 100;
    }
    // Dial code match
    else if (country.dialCode.includes(normalizedQuery)) {
      score = 200;
    }
    // Country code match
    else if (country.code.toLowerCase() === normalizedQuery) {
      score = 300;
    }

    return { country, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.country);
}

