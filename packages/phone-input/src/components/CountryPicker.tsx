import React, { useState, useMemo, useCallback } from 'react';
import {
  Modal,
  View,
  TextInput,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import type { CountryPickerProps, Country } from '../types';
import { searchCountries } from '../core/search';
import { sortCountriesWithPreferred } from '../core/country';
import { defaultStyles, tokens } from '../styles/tokens';
import { getStrings, isRTL } from '../i18n/strings';
import Flag from './Flag';

const CountryPicker: React.FC<CountryPickerProps> = ({
  visible,
  onClose,
  countries,
  selectedCountry,
  onSelect,
  preferredCountries,
  showSearch = true,
  searchPlaceholder,
  styles,
  slotProps,
  renderers,
  locale = 'en',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const strings = getStrings(locale);
  const rtl = isRTL(locale);

  const sortedCountries = useMemo(() => {
    return sortCountriesWithPreferred(countries, preferredCountries);
  }, [countries, preferredCountries]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedCountries;
    }
    return searchCountries(sortedCountries, searchQuery);
  }, [sortedCountries, searchQuery]);

  const handleSelect = useCallback(
    (country: Country) => {
      onSelect(country);
      setSearchQuery('');
      onClose();
    },
    [onSelect, onClose]
  );

  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => {
      const isSelected = selectedCountry?.code === item.code;
      // const isPreferred = preferredCountries?.includes(item.code);

      if (renderers?.renderCountryItem) {
        const customRender = renderers.renderCountryItem({
          country: item,
          isSelected,
          onPress: () => handleSelect(item),
          showFlag: true,
          showDialCode: true,
        });
        return customRender ? <>{customRender}</> : null;
      }

      return (
        <Pressable
          onPress={() => handleSelect(item)}
          style={({ pressed }) => [
            defaultStyles.countryItem,
            styles?.countryItem,
            isSelected && { backgroundColor: tokens.colors.surface },
            pressed && { opacity: 0.7 },
            rtl && { flexDirection: 'row-reverse' },
          ]}
          {...slotProps?.countryItem}
        >
          <Flag countryCode={item.code} size={32} style={styles?.countryItemFlag} />
          <Text
            style={[
              defaultStyles.countryItemText,
              styles?.countryItemText,
              rtl && { textAlign: 'right' },
            ]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={[defaultStyles.countryItemDialCode, styles?.countryItemDialCode]}>
            {item.dialCode}
          </Text>
        </Pressable>
      );
    },
    [
      selectedCountry,
      handleSelect,
      styles,
      slotProps,
      renderers,
      rtl,
    ]
  );

  const renderSeparator = useCallback(() => {
    return <View style={[defaultStyles.separator, styles?.separator]} />;
  }, [styles]);

  const keyExtractor = useCallback((item: Country) => item.code, []);

  const getItemLayout = useCallback(
    (_data: unknown, index: number) => ({
      length: 56,
      offset: 56 * index,
      index,
    }),
    []
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      {...slotProps?.modal}
    >
      <SafeAreaView style={[defaultStyles.modal, styles?.modal]}>
        <View style={[defaultStyles.modalHeader, styles?.modalHeader]}>
          {showSearch && (
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={searchPlaceholder || strings.searchPlaceholder}
              style={[
                defaultStyles.searchInput,
                styles?.searchInput,
                rtl && { textAlign: 'right', writingDirection: 'rtl' },
              ]}
              placeholderTextColor={tokens.colors.placeholder}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              returnKeyType="search"
              {...slotProps?.searchInput}
            />
          )}
        </View>

        {filteredCountries.length === 0 ? (
          <View style={internalStyles.emptyContainer}>
            <Text style={internalStyles.emptyText}>{strings.noResultsFound}</Text>
          </View>
        ) : (
          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderSeparator}
            getItemLayout={getItemLayout}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews
            keyboardShouldPersistTaps="handled"
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const internalStyles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.xl,
  },
  emptyText: {
    fontSize: tokens.fontSize.md,
    color: tokens.colors.textSecondary,
  },
});

export default CountryPicker;

