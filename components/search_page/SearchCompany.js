import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Animated, FlatList, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SUGGESTED_COMPANIES = [
];

const { width, height } = Dimensions.get('window');

export default function SearchCompany({ onSearch }) {
  const [company, setCompany] = useState('');
  const companyRef = useRef('');
  const [isFocused, setIsFocused] = useState(false);
  const inputAnim = React.useRef(new Animated.Value(0)).current;

  const handleSearch = () => {
    const searchTerm = companyRef.current.trim();
    if (searchTerm.length > 0) {
      onSearch(searchTerm);
    }
  };

  const handleSuggestionPress = (suggestedCompany) => {
    const searchTerm = suggestedCompany.trim();
    setCompany(searchTerm);
    onSearch(searchTerm);
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(inputAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(inputAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  // Animated styles for input focus
  const animatedInputStyle = {
    width: inputAnim.interpolate({ inputRange: [0, 1], outputRange: [width * 0.85, width * 0.95] }),
    backgroundColor: inputAnim.interpolate({ inputRange: [0, 1], outputRange: ['#f4f8fd', '#e3edfa'] }),
    shadowOpacity: inputAnim.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.16] }),
    borderColor: inputAnim.interpolate({ inputRange: [0, 1], outputRange: ['#dbeafe', '#60a5fa'] }),
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.centeredContent}>
        {/* Search Bar */}
        <Animated.View style={[styles.inputRow, animatedInputStyle]}>
          <MaterialCommunityIcons name="magnify" size={26} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#6b7280"
            value={company}
            onChangeText={text => {
              setCompany(text);
              companyRef.current = text;
            }}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={true}
            enablesReturnKeyAutomatically={true}
            maxLength={50}
            textContentType="organizationName"
            onFocus={handleFocus}
            onBlur={handleBlur}
            accessibilityLabel="Search for a company"
          />
          <TouchableOpacity style={styles.fabButton} onPress={handleSearch} activeOpacity={0.85} accessibilityLabel="Submit search">
            <View style={styles.fabGradient}>
              <MaterialCommunityIcons name="arrow-right" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </Animated.View>
        {/* Popular Companies */}
        <View style={styles.suggestionsContainer}>
          {/* <Text style={styles.suggestionsTitle}>Popular Companies</Text> */}
          <FlatList
            data={SUGGESTED_COMPANIES}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipList}
            removeClippedSubviews={false}
            style={{ width: '100%', maxWidth: 480 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chipWrapper}
                activeOpacity={0.85}
                onPress={() => handleSuggestionPress(item)}
                accessibilityLabel={`Search for ${item}`}
              >
                <View style={styles.chip}>
                  <MaterialCommunityIcons name="office-building" size={15} color="#2563eb" style={{ marginRight: 6 }} />
                  <Text style={styles.chipText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    paddingTop: height * 0.20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: '#f4f8fd',
    borderWidth: 1.5,
    borderColor: '#dbeafe',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    paddingHorizontal: 18,
    paddingVertical: 6,
    minHeight: 54,
    marginBottom: 32,
    width: width > 500 ? 420 : '92%',
    maxWidth: 480,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#222',
    marginLeft: 10,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    height: 44,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  searchIcon: {
    color: '#2563eb',
  },
  fabButton: {
    marginLeft: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
  },
  fabGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
  },
  suggestionsContainer: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'flex-start',
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 10,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  chipList: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
  },
  chipWrapper: {
    marginRight: 12,
    marginBottom: 2,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: '#eaf1fb',
    borderWidth: 1,
    borderColor: '#60a5fa',
  },
  chipText: {
    color: '#2563eb',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
}); 