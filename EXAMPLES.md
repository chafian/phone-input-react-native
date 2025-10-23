# Usage Examples

Comprehensive examples for using the Advanced Phone Input library.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)
- [Validation](#validation)
- [Customization](#customization)
- [Multi-language & RTL](#multi-language--rtl)
- [Form Integration](#form-integration)
- [Advanced Patterns](#advanced-patterns)

## Basic Usage

### Simple Phone Input

```tsx
import React, { useState } from 'react';
import { PhoneInput } from '@phone-input/react-native';

export default function BasicExample() {
  const [phone, setPhone] = useState('');

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      defaultCountry="US"
    />
  );
}
```

### With Preferred Countries

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  defaultCountry="US"
  preferredCountries={['US', 'GB', 'CA', 'AE']}
/>
```

### Allowed/Excluded Countries

```tsx
// Only show specific countries
<PhoneInput
  allowedCountries={['US', 'GB', 'CA']}
/>

// Exclude specific countries
<PhoneInput
  excludedCountries={['KP', 'IR']}
/>
```

## Controlled vs Uncontrolled

### Controlled

```tsx
const [phone, setPhone] = useState('');

<PhoneInput
  value={phone}
  onChange={setPhone}
/>
```

### Uncontrolled

```tsx
<PhoneInput
  defaultValue="+14155552671"
  onChange={(value) => console.log(value)}
/>
```

## Validation

### Real-time Validation

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  validation={{
    mode: 'onChange',
    required: true,
  }}
  onValidationChange={(isValid, error) => {
    console.log('Valid:', isValid, 'Error:', error);
  }}
/>
```

### On Blur Validation

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  validation={{
    mode: 'onBlur',
  }}
/>
```

### Custom Validation

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  validation={{
    mode: 'onChange',
    customValidator: (value, country) => {
      if (value.length < 10) {
        return 'Phone number must be at least 10 digits';
      }
      return true;
    },
  }}
/>
```

### Manual Validation with Ref

```tsx
const phoneRef = useRef<PhoneInputRef>(null);

const handleSubmit = () => {
  const isValid = phoneRef.current?.validate();
  if (isValid) {
    const e164 = phoneRef.current?.getNumber('e164');
    console.log('Submitting:', e164);
  }
};

<PhoneInput
  inputRef={phoneRef}
  validation={{ mode: 'manual' }}
/>
```

## Customization

### Custom Styles

```tsx
<PhoneInput
  styles={{
    container: {
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#6366F1',
      backgroundColor: '#F5F5FF',
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    input: {
      fontSize: 18,
      fontWeight: '500',
      color: '#1F2937',
    },
    dialCodeText: {
      color: '#6366F1',
      fontWeight: '600',
      fontSize: 16,
    },
    flagContainer: {
      marginRight: 12,
    },
    errorText: {
      color: '#EF4444',
      fontSize: 14,
      marginTop: 6,
    },
  }}
/>
```

### NativeWind / Tailwind CSS

```tsx
<PhoneInput
  className="border-2 border-indigo-500 rounded-xl bg-indigo-50 px-4 py-3"
/>
```

### Custom Icons

```tsx
import { ChevronDown, Search, X } from 'lucide-react-native';

<PhoneInput
  icons={{
    chevron: ChevronDown,
    search: Search,
    clear: X,
  }}
/>
```

### Custom Renderers

```tsx
<PhoneInput
  renderers={{
    renderFlag: ({ countryCode, size }) => (
      <CustomFlagComponent code={countryCode} size={size} />
    ),
    renderChevron: ({ color, size }) => (
      <CustomChevronIcon color={color} size={size} />
    ),
    renderCountryItem: ({ country, onPress, isSelected }) => (
      <Pressable onPress={onPress}>
        <View style={[styles.item, isSelected && styles.selected]}>
          <Text>{country.flag} {country.name}</Text>
          <Text>{country.dialCode}</Text>
        </View>
      </Pressable>
    ),
    renderAccessoryLeft: () => <Icon name="phone" />,
    renderAccessoryRight: () => <Icon name="check" />,
  }}
/>
```

### Visibility Controls

```tsx
// Minimal configuration
<PhoneInput
  showFlag={false}
  showChevron={false}
  showDialCode={false}
/>

// Only flag and input
<PhoneInput
  showChevron={false}
  showDialCode={false}
/>

// No search in picker
<PhoneInput
  showSearch={false}
/>
```

## Multi-language & RTL

### Arabic (RTL)

```tsx
<PhoneInput
  defaultCountry="AE"
  locale="ar"
  // RTL is automatically detected
/>
```

### Spanish

```tsx
<PhoneInput
  defaultCountry="ES"
  locale="es"
/>
```

### French

```tsx
<PhoneInput
  defaultCountry="FR"
  locale="fr"
/>
```

### Dynamic Locale

```tsx
const [locale, setLocale] = useState('en');

<PhoneInput
  defaultCountry="US"
  locale={locale}
/>

<Button onPress={() => setLocale('ar')}>Switch to Arabic</Button>
```

## Form Integration

### React Hook Form

```tsx
import { Controller, useForm } from 'react-hook-form';
import { PhoneInput, isValidPhoneNumber } from '@phone-input/react-native';

function FormExample() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Controller
      control={control}
      name="phone"
      rules={{
        required: 'Phone number is required',
        validate: (value) =>
          isValidPhoneNumber(value) || 'Invalid phone number',
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PhoneInput
          value={value}
          onChange={onChange}
          error={error?.message}
          defaultCountry="US"
        />
      )}
    />
  );
}
```

### Formik

```tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneInput, isValidPhoneNumber } from '@phone-input/react-native';

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Phone number is required')
    .test('valid-phone', 'Invalid phone number', (value) =>
      isValidPhoneNumber(value || '')
    ),
});

function FormikExample() {
  const formik = useFormik({
    initialValues: { phone: '' },
    validationSchema,
    onSubmit: (values) => console.log(values),
  });

  return (
    <PhoneInput
      value={formik.values.phone}
      onChange={(value) => formik.setFieldValue('phone', value)}
      onBlur={() => formik.setFieldTouched('phone')}
      error={formik.touched.phone ? formik.errors.phone : undefined}
      defaultCountry="US"
    />
  );
}
```

## Advanced Patterns

### Using the Hook

```tsx
import { usePhoneInput } from '@phone-input/react-native';

function HookExample() {
  const phoneInput = usePhoneInput({
    defaultCountry: 'US',
    formatter: 'international',
    onChange: (value) => console.log('Changed:', value),
  });

  return (
    <View>
      <PhoneInput
        value={phoneInput.value}
        onChange={phoneInput.setValue}
      />
      <Text>Formatted: {phoneInput.formattedValue}</Text>
      <Text>Valid: {phoneInput.isValid ? 'Yes' : 'No'}</Text>
      <Button onPress={phoneInput.clear}>Clear</Button>
      <Button onPress={() => alert(phoneInput.getNumber('e164'))}>
        Get E.164
      </Button>
    </View>
  );
}
```

### Theme Provider

```tsx
import { PhoneInputThemeProvider } from '@phone-input/react-native';

function App() {
  const customStyles = {
    container: {
      borderRadius: 12,
      borderColor: '#6366F1',
    },
    input: {
      fontSize: 16,
    },
  };

  return (
    <PhoneInputThemeProvider styles={customStyles}>
      <PhoneInput defaultCountry="US" />
      <PhoneInput defaultCountry="GB" />
      {/* All inputs inherit the theme */}
    </PhoneInputThemeProvider>
  );
}
```

### Auto-detect Country

```tsx
<PhoneInput
  detectCountry // Detects from device locale
  defaultCountry="US" // Fallback
/>
```

### Format on Change

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  onChangeFormatted={(formatted, raw) => {
    console.log('Formatted:', formatted);
    console.log('Raw:', raw);
  }}
  formatter={{ strategy: 'international' }}
/>
```

### Different Formatters

```tsx
// As you type (default)
<PhoneInput formatter={{ strategy: 'asYouType' }} />

// E.164 format
<PhoneInput formatter={{ strategy: 'e164' }} />

// International format
<PhoneInput formatter={{ strategy: 'international' }} />

// National format
<PhoneInput formatter={{ strategy: 'national' }} />

// No formatting
<PhoneInput formatter={{ strategy: 'none' }} />
```

### Disabled State

```tsx
<PhoneInput
  value={phone}
  onChange={setPhone}
  disabled
/>
```

### Custom Placeholder

```tsx
// Custom text
<PhoneInput placeholderText="Enter your mobile number" />

// Show dial code as placeholder
<PhoneInput placeholderVariant="country-dial-code" />

// No placeholder
<PhoneInput placeholderVariant="none" />
```

### Imperative Actions

```tsx
const phoneRef = useRef<PhoneInputRef>(null);

// Focus
phoneRef.current?.focus();

// Blur
phoneRef.current?.blur();

// Clear
phoneRef.current?.clear();

// Validate
const isValid = phoneRef.current?.validate();

// Get formatted number
const e164 = phoneRef.current?.getNumber('e164');
const international = phoneRef.current?.getNumber('international');

// Get country
const country = phoneRef.current?.getCountry();

// Set country
phoneRef.current?.setCountry('GB');
```

### Complete Example

```tsx
import React, { useState, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import { PhoneInput, type PhoneInputRef } from '@phone-input/react-native';

export default function CompleteExample() {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const phoneRef = useRef<PhoneInputRef>(null);

  const handleSubmit = () => {
    if (phoneRef.current?.validate()) {
      const number = phoneRef.current.getNumber('e164');
      console.log('Submitting:', number);
      // Submit to API
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        inputRef={phoneRef}
        defaultCountry="US"
        locale="en"
        preferredCountries={['US', 'GB', 'CA']}
        validation={{
          mode: 'onChange',
          required: true,
        }}
        onValidationChange={(valid) => setIsValid(valid)}
        styles={{
          container: {
            borderRadius: 12,
            borderWidth: 2,
            borderColor: isValid ? '#10B981' : '#E5E7EB',
          },
        }}
      />
      
      <Text style={{ marginTop: 10 }}>
        Status: {isValid ? '✅ Valid' : '❌ Invalid'}
      </Text>

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={!isValid}
      />
      
      <Button
        title="Clear"
        onPress={() => phoneRef.current?.clear()}
      />
    </View>
  );
}
```

## Utility Functions

### Parse Phone Number

```tsx
import { parsePhoneNumber } from '@phone-input/react-native';

const parsed = parsePhoneNumber('+14155552671', 'US');
console.log(parsed.isValid); // true
console.log(parsed.countryCode); // 'US'
console.log(parsed.nationalNumber); // '4155552671'
```

### Format Phone Number

```tsx
import { formatPhoneNumber } from '@phone-input/react-native';

const formatted = formatPhoneNumber('+14155552671', 'international', 'US');
console.log(formatted); // '+1 415-555-2671'
```

### Validate Phone Number

```tsx
import { isValidPhoneNumber } from '@phone-input/react-native';

const isValid = isValidPhoneNumber('+14155552671', 'US');
console.log(isValid); // true
```

### Guess Country

```tsx
import { guessCountryByNumber } from '@phone-input/react-native';

const country = guessCountryByNumber('+14155552671');
console.log(country); // 'US'
```

### Get All Countries

```tsx
import { getAllCountries } from '@phone-input/react-native';

const countries = getAllCountries('en');
console.log(countries); // [{ code: 'US', name: 'United States', dialCode: '+1' }, ...]
```

