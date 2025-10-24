# Quick Start Guide

Get up and running with Advanced Phone Input in 5 minutes!

## Installation

```bash
# Using npm
npm install @chafian/phone-input-react-native react-native-svg

# Using yarn
yarn add @chafian/phone-input-react-native react-native-svg

# For Expo projects
npx expo install react-native-svg
```

## Basic Setup

### 1. Import the Component

```tsx
import { PhoneInput } from '@chafian/phone-input-react-native';
```

### 2. Add to Your Component

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { PhoneInput } from '@chafian/phone-input-react-native';

export default function MyScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <PhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        defaultCountry="US"
      />
    </View>
  );
}
```

That's it! You now have a fully functional phone input. 🎉

## Common Configurations

### With Validation

```tsx
<PhoneInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  defaultCountry="US"
  validation={{ mode: 'onChange' }}
  onValidationChange={(isValid, error) => {
    console.log('Valid:', isValid);
  }}
/>
```

### With Preferred Countries

```tsx
<PhoneInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  defaultCountry="US"
  preferredCountries={['US', 'GB', 'CA', 'AE']}
/>
```

### With Custom Styling

```tsx
<PhoneInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  defaultCountry="US"
  styles={{
    container: {
      borderRadius: 12,
      borderColor: '#6366F1',
    },
    input: {
      fontSize: 18,
    },
  }}
/>
```

### Multi-language (Arabic with RTL)

```tsx
<PhoneInput
  value={phoneNumber}
  onChange={setPhoneNumber}
  defaultCountry="AE"
  locale="ar"
/>
```

## Next Steps

- 📖 Read the [full documentation](README.md)
- 🎨 Explore [customization examples](EXAMPLES.md)
- 🧪 Check out the [Expo example app](examples/expo)
- 💡 Learn about [form integration](EXAMPLES.md#form-integration)

## Need Help?

- [GitHub Issues](https://github.com/yourusername/phone-input-react-native/issues)
- [Documentation](README.md)
- [Examples](EXAMPLES.md)

## Key Features at a Glance

✅ Real-time validation  
✅ Smart formatting (as-you-type)  
✅ 10+ languages with RTL support  
✅ 30+ country flags (SVG)  
✅ Fully customizable  
✅ TypeScript support  
✅ Expo compatible  
✅ Form library integration  
✅ Accessibility compliant  

Happy coding! 🚀

