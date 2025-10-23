export interface I18nStrings {
  searchPlaceholder: string;
  noResultsFound: string;
  selectCountry: string;
  enterPhoneNumber: string;
  invalidPhoneNumber: string;
  requiredField: string;
}

export const translations: Record<string, I18nStrings> = {
  en: {
    searchPlaceholder: 'Search countries...',
    noResultsFound: 'No countries found',
    selectCountry: 'Select country',
    enterPhoneNumber: 'Enter phone number',
    invalidPhoneNumber: 'Invalid phone number',
    requiredField: 'This field is required',
  },
  ar: {
    searchPlaceholder: 'البحث عن الدول...',
    noResultsFound: 'لم يتم العثور على دول',
    selectCountry: 'اختر الدولة',
    enterPhoneNumber: 'أدخل رقم الهاتف',
    invalidPhoneNumber: 'رقم هاتف غير صالح',
    requiredField: 'هذا الحقل مطلوب',
  },
  es: {
    searchPlaceholder: 'Buscar países...',
    noResultsFound: 'No se encontraron países',
    selectCountry: 'Seleccionar país',
    enterPhoneNumber: 'Ingrese número de teléfono',
    invalidPhoneNumber: 'Número de teléfono inválido',
    requiredField: 'Este campo es obligatorio',
  },
  fr: {
    searchPlaceholder: 'Rechercher des pays...',
    noResultsFound: 'Aucun pays trouvé',
    selectCountry: 'Sélectionner un pays',
    enterPhoneNumber: 'Entrez le numéro de téléphone',
    invalidPhoneNumber: 'Numéro de téléphone invalide',
    requiredField: 'Ce champ est obligatoire',
  },
  de: {
    searchPlaceholder: 'Länder suchen...',
    noResultsFound: 'Keine Länder gefunden',
    selectCountry: 'Land auswählen',
    enterPhoneNumber: 'Telefonnummer eingeben',
    invalidPhoneNumber: 'Ungültige Telefonnummer',
    requiredField: 'Dieses Feld ist erforderlich',
  },
  pt: {
    searchPlaceholder: 'Pesquisar países...',
    noResultsFound: 'Nenhum país encontrado',
    selectCountry: 'Selecionar país',
    enterPhoneNumber: 'Digite o número de telefone',
    invalidPhoneNumber: 'Número de telefone inválido',
    requiredField: 'Este campo é obrigatório',
  },
  ru: {
    searchPlaceholder: 'Поиск стран...',
    noResultsFound: 'Страны не найдены',
    selectCountry: 'Выберите страну',
    enterPhoneNumber: 'Введите номер телефона',
    invalidPhoneNumber: 'Неверный номер телефона',
    requiredField: 'Это поле обязательно',
  },
  zh: {
    searchPlaceholder: '搜索国家...',
    noResultsFound: '未找到国家',
    selectCountry: '选择国家',
    enterPhoneNumber: '输入电话号码',
    invalidPhoneNumber: '无效的电话号码',
    requiredField: '此字段为必填项',
  },
  ja: {
    searchPlaceholder: '国を検索...',
    noResultsFound: '国が見つかりません',
    selectCountry: '国を選択',
    enterPhoneNumber: '電話番号を入力',
    invalidPhoneNumber: '無効な電話番号',
    requiredField: 'この項目は必須です',
  },
  hi: {
    searchPlaceholder: 'देश खोजें...',
    noResultsFound: 'कोई देश नहीं मिला',
    selectCountry: 'देश चुनें',
    enterPhoneNumber: 'फ़ोन नंबर दर्ज करें',
    invalidPhoneNumber: 'अमान्य फ़ोन नंबर',
    requiredField: 'यह फ़ील्ड आवश्यक है',
  },
};

export function getStrings(locale: string = 'en'): I18nStrings {
  const lang = locale.split('-')[0].toLowerCase();
  return translations[lang] || translations.en;
}

export function isRTL(locale: string = 'en'): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const lang = locale.split('-')[0].toLowerCase();
  return rtlLanguages.includes(lang);
}

