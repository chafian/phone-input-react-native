import type { Country, CountryCode } from '../types';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

// Country names in multiple languages
const countryNames: Record<string, Record<string, string>> = {
  en: {
    US: 'United States',
    GB: 'United Kingdom',
    CA: 'Canada',
    AU: 'Australia',
    DE: 'Germany',
    FR: 'France',
    ES: 'Spain',
    IT: 'Italy',
    BR: 'Brazil',
    MX: 'Mexico',
    JP: 'Japan',
    CN: 'China',
    IN: 'India',
    RU: 'Russia',
    AE: 'United Arab Emirates',
    SA: 'Saudi Arabia',
    EG: 'Egypt',
    ZA: 'South Africa',
    NG: 'Nigeria',
    KE: 'Kenya',
  },
  ar: {
    US: 'الولايات المتحدة',
    GB: 'المملكة المتحدة',
    CA: 'كندا',
    AU: 'أستراليا',
    DE: 'ألمانيا',
    FR: 'فرنسا',
    ES: 'إسبانيا',
    IT: 'إيطاليا',
    BR: 'البرازيل',
    MX: 'المكسيك',
    JP: 'اليابان',
    CN: 'الصين',
    IN: 'الهند',
    RU: 'روسيا',
    AE: 'الإمارات العربية المتحدة',
    SA: 'المملكة العربية السعودية',
    EG: 'مصر',
    ZA: 'جنوب أفريقيا',
    NG: 'نيجيريا',
    KE: 'كينيا',
  },
  es: {
    US: 'Estados Unidos',
    GB: 'Reino Unido',
    CA: 'Canadá',
    AU: 'Australia',
    DE: 'Alemania',
    FR: 'Francia',
    ES: 'España',
    IT: 'Italia',
    BR: 'Brasil',
    MX: 'México',
    JP: 'Japón',
    CN: 'China',
    IN: 'India',
    RU: 'Rusia',
    AE: 'Emiratos Árabes Unidos',
    SA: 'Arabia Saudita',
    EG: 'Egipto',
    ZA: 'Sudáfrica',
    NG: 'Nigeria',
    KE: 'Kenia',
  },
  fr: {
    US: 'États-Unis',
    GB: 'Royaume-Uni',
    CA: 'Canada',
    AU: 'Australie',
    DE: 'Allemagne',
    FR: 'France',
    ES: 'Espagne',
    IT: 'Italie',
    BR: 'Brésil',
    MX: 'Mexique',
    JP: 'Japon',
    CN: 'Chine',
    IN: 'Inde',
    RU: 'Russie',
    AE: 'Émirats Arabes Unis',
    SA: 'Arabie Saoudite',
    EG: 'Égypte',
    ZA: 'Afrique du Sud',
    NG: 'Nigéria',
    KE: 'Kenya',
  },
};

// Fallback English names for all countries
const allCountryNamesEn: Record<string, string> = {
  AF: 'Afghanistan', AL: 'Albania', DZ: 'Algeria', AS: 'American Samoa', AD: 'Andorra',
  AO: 'Angola', AI: 'Anguilla', AG: 'Antigua and Barbuda', AR: 'Argentina', AM: 'Armenia',
  AW: 'Aruba', AU: 'Australia', AT: 'Austria', AZ: 'Azerbaijan', BS: 'Bahamas',
  BH: 'Bahrain', BD: 'Bangladesh', BB: 'Barbados', BY: 'Belarus', BE: 'Belgium',
  BZ: 'Belize', BJ: 'Benin', BM: 'Bermuda', BT: 'Bhutan', BO: 'Bolivia',
  BA: 'Bosnia and Herzegovina', BW: 'Botswana', BR: 'Brazil', BN: 'Brunei', BG: 'Bulgaria',
  BF: 'Burkina Faso', BI: 'Burundi', KH: 'Cambodia', CM: 'Cameroon', CA: 'Canada',
  CV: 'Cape Verde', KY: 'Cayman Islands', CF: 'Central African Republic', TD: 'Chad', CL: 'Chile',
  CN: 'China', CO: 'Colombia', KM: 'Comoros', CG: 'Congo', CD: 'Congo (DRC)',
  CR: 'Costa Rica', CI: 'Côte d\'Ivoire', HR: 'Croatia', CU: 'Cuba', CY: 'Cyprus',
  CZ: 'Czech Republic', DK: 'Denmark', DJ: 'Djibouti', DM: 'Dominica', DO: 'Dominican Republic',
  EC: 'Ecuador', EG: 'Egypt', SV: 'El Salvador', GQ: 'Equatorial Guinea', ER: 'Eritrea',
  EE: 'Estonia', ET: 'Ethiopia', FJ: 'Fiji', FI: 'Finland', FR: 'France',
  GA: 'Gabon', GM: 'Gambia', GE: 'Georgia', DE: 'Germany', GH: 'Ghana',
  GR: 'Greece', GD: 'Grenada', GU: 'Guam', GT: 'Guatemala', GN: 'Guinea',
  GW: 'Guinea-Bissau', GY: 'Guyana', HT: 'Haiti', HN: 'Honduras', HK: 'Hong Kong',
  HU: 'Hungary', IS: 'Iceland', IN: 'India', ID: 'Indonesia', IR: 'Iran',
  IQ: 'Iraq', IE: 'Ireland', IL: 'Israel', IT: 'Italy', JM: 'Jamaica',
  JP: 'Japan', JO: 'Jordan', KZ: 'Kazakhstan', KE: 'Kenya', KI: 'Kiribati',
  KW: 'Kuwait', KG: 'Kyrgyzstan', LA: 'Laos', LV: 'Latvia', LB: 'Lebanon',
  LS: 'Lesotho', LR: 'Liberia', LY: 'Libya', LI: 'Liechtenstein', LT: 'Lithuania',
  LU: 'Luxembourg', MO: 'Macau', MK: 'Macedonia', MG: 'Madagascar', MW: 'Malawi',
  MY: 'Malaysia', MV: 'Maldives', ML: 'Mali', MT: 'Malta', MH: 'Marshall Islands',
  MR: 'Mauritania', MU: 'Mauritius', MX: 'Mexico', FM: 'Micronesia', MD: 'Moldova',
  MC: 'Monaco', MN: 'Mongolia', ME: 'Montenegro', MA: 'Morocco', MZ: 'Mozambique',
  MM: 'Myanmar', NA: 'Namibia', NR: 'Nauru', NP: 'Nepal', NL: 'Netherlands',
  NZ: 'New Zealand', NI: 'Nicaragua', NE: 'Niger', NG: 'Nigeria', NO: 'Norway',
  OM: 'Oman', PK: 'Pakistan', PW: 'Palau', PS: 'Palestine', PA: 'Panama',
  PG: 'Papua New Guinea', PY: 'Paraguay', PE: 'Peru', PH: 'Philippines', PL: 'Poland',
  PT: 'Portugal', PR: 'Puerto Rico', QA: 'Qatar', RO: 'Romania', RU: 'Russia',
  RW: 'Rwanda', KN: 'Saint Kitts and Nevis', LC: 'Saint Lucia', VC: 'Saint Vincent', WS: 'Samoa',
  SM: 'San Marino', ST: 'São Tomé and Príncipe', SA: 'Saudi Arabia', SN: 'Senegal', RS: 'Serbia',
  SC: 'Seychelles', SL: 'Sierra Leone', SG: 'Singapore', SK: 'Slovakia', SI: 'Slovenia',
  SB: 'Solomon Islands', SO: 'Somalia', ZA: 'South Africa', KR: 'South Korea', SS: 'South Sudan',
  ES: 'Spain', LK: 'Sri Lanka', SD: 'Sudan', SR: 'Suriname', SZ: 'Swaziland',
  SE: 'Sweden', CH: 'Switzerland', SY: 'Syria', TW: 'Taiwan', TJ: 'Tajikistan',
  TZ: 'Tanzania', TH: 'Thailand', TL: 'Timor-Leste', TG: 'Togo', TO: 'Tonga',
  TT: 'Trinidad and Tobago', TN: 'Tunisia', TR: 'Turkey', TM: 'Turkmenistan', TV: 'Tuvalu',
  UG: 'Uganda', UA: 'Ukraine', AE: 'United Arab Emirates', GB: 'United Kingdom', US: 'United States',
  UY: 'Uruguay', UZ: 'Uzbekistan', VU: 'Vanuatu', VA: 'Vatican City', VE: 'Venezuela',
  VN: 'Vietnam', YE: 'Yemen', ZM: 'Zambia', ZW: 'Zimbabwe',
};

let cachedCountries: Country[] | null = null;

export function getAllCountries(locale: string = 'en'): Country[] {
  if (cachedCountries && locale === 'en') {
    return cachedCountries;
  }

  const countryCodes = getCountries();
  const localeNames = countryNames[locale] || countryNames.en;

  const countries: Country[] = countryCodes.map((code) => {
    try {
      const dialCode = `+${getCountryCallingCode(code)}`;
      const name = localeNames[code] || allCountryNamesEn[code] || code;
      
      return {
        code,
        name,
        dialCode,
      };
    } catch {
      return null;
    }
  }).filter((c): c is Country => c !== null);

  // Sort by name
  countries.sort((a, b) => a.name.localeCompare(b.name, locale));

  if (locale === 'en') {
    cachedCountries = countries;
  }

  return countries;
}

export function getCountryByCode(code: CountryCode, locale: string = 'en'): Country | undefined {
  const countries = getAllCountries(locale);
  return countries.find((c) => c.code === code);
}

export function getCountryByDialCode(dialCode: string, locale: string = 'en'): Country | undefined {
  const countries = getAllCountries(locale);
  const normalized = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return countries.find((c) => c.dialCode === normalized);
}

export function filterCountries(
  countries: Country[],
  allowed?: CountryCode[],
  excluded?: CountryCode[]
): Country[] {
  let filtered = countries;

  if (allowed && allowed.length > 0) {
    filtered = filtered.filter((c) => allowed.includes(c.code));
  }

  if (excluded && excluded.length > 0) {
    filtered = filtered.filter((c) => !excluded.includes(c.code));
  }

  return filtered;
}

export function sortCountriesWithPreferred(
  countries: Country[],
  preferred?: CountryCode[]
): Country[] {
  if (!preferred || preferred.length === 0) {
    return countries;
  }

  const preferredCountries: Country[] = [];
  const otherCountries: Country[] = [];

  countries.forEach((country) => {
    if (preferred.includes(country.code)) {
      preferredCountries.push(country);
    } else {
      otherCountries.push(country);
    }
  });

  // Sort preferred by the order in the preferred array
  preferredCountries.sort((a, b) => {
    const aIndex = preferred.indexOf(a.code);
    const bIndex = preferred.indexOf(b.code);
    return aIndex - bIndex;
  });

  return [...preferredCountries, ...otherCountries];
}

export function detectCountryFromLocale(): CountryCode | undefined {
  // This is a placeholder - in real implementation, use expo-localization
  // import * as Localization from 'expo-localization';
  // const locale = Localization.locale; // e.g., "en-US"
  // return locale.split('-')[1] || undefined;
  
  // For now, return undefined to indicate no detection
  return undefined;
}

