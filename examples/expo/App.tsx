import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Switch,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PhoneInput, type PhoneInputRef } from '@chafian/phone-input-react-native';

export default function App() {
  const [value, setValue] = useState('');
  const [showFlag, setShowFlag] = useState(true);
  const [showChevron, setShowChevron] = useState(true);
  const [showDialCode, setShowDialCode] = useState(true);
  const [showSearch, setShowSearch] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [locale, setLocale] = useState('en');
  
  const phoneInputRef = useRef<PhoneInputRef>(null);

  const handleValidate = () => {
    const isValid = phoneInputRef.current?.validate();
    alert(`Phone number is ${isValid ? 'valid' : 'invalid'}`);
  };

  const handleGetNumber = () => {
    const number = phoneInputRef.current?.getNumber('e164');
    alert(`E.164 format: ${number}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Advanced Phone Input Demo</Text>
        <Text style={styles.subtitle}>React Native & Expo</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Usage</Text>
          <PhoneInput
            value={value}
            onChange={setValue}
            defaultCountry="US"
            locale={locale}
            showFlag={showFlag}
            showChevron={showChevron}
            showDialCode={showDialCode}
            showSearch={showSearch}
            disabled={disabled}
            preferredCountries={['US', 'GB', 'CA', 'AE']}
            validation={{ mode: 'onChange' }}
            inputRef={phoneInputRef}
            onValidationChange={(isValid: boolean, error?: string) => {
              console.log('Validation:', isValid, error);
            }}
          />
          <Text style={styles.valueText}>Value: {value}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          
          <View style={styles.control}>
            <Text style={styles.controlLabel}>Show Flag</Text>
            <Switch value={showFlag} onValueChange={setShowFlag} />
          </View>

          <View style={styles.control}>
            <Text style={styles.controlLabel}>Show Chevron</Text>
            <Switch value={showChevron} onValueChange={setShowChevron} />
          </View>

          <View style={styles.control}>
            <Text style={styles.controlLabel}>Show Dial Code</Text>
            <Switch value={showDialCode} onValueChange={setShowDialCode} />
          </View>

          <View style={styles.control}>
            <Text style={styles.controlLabel}>Show Search</Text>
            <Switch value={showSearch} onValueChange={setShowSearch} />
          </View>

          <View style={styles.control}>
            <Text style={styles.controlLabel}>Disabled</Text>
            <Switch value={disabled} onValueChange={setDisabled} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Locale</Text>
          <View style={styles.localeButtons}>
            {['en', 'ar', 'es', 'fr', 'de'].map((lang) => (
              <Pressable
                key={lang}
                style={[
                  styles.localeButton,
                  locale === lang && styles.localeButtonActive,
                ]}
                onPress={() => setLocale(lang)}
              >
                <Text
                  style={[
                    styles.localeButtonText,
                    locale === lang && styles.localeButtonTextActive,
                  ]}
                >
                  {lang.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <Pressable style={styles.button} onPress={handleValidate}>
            <Text style={styles.buttonText}>Validate</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleGetNumber}>
            <Text style={styles.buttonText}>Get E.164 Format</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => phoneInputRef.current?.clear()}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styled</Text>
          <PhoneInput
            defaultCountry="AE"
            locale="ar"
            styles={{
              container: {
                borderRadius: 16,
                borderWidth: 2,
                borderColor: '#6366F1',
                backgroundColor: '#F5F5FF',
                paddingHorizontal: 16,
                paddingVertical: 12,
              },
              input: {
                fontSize: 18,
                color: '#1F2937',
              },
              dialCodeText: {
                color: '#6366F1',
                fontWeight: '600',
              },
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Minimal</Text>
          <PhoneInput
            defaultCountry="GB"
            showChevron={false}
            showDialCode={false}
            styles={{
              container: {
                borderRadius: 8,
                borderColor: '#E5E7EB',
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#374151',
  },
  valueText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  controlLabel: {
    fontSize: 16,
    color: '#374151',
  },
  localeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  localeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  localeButtonActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  localeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  localeButtonTextActive: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

