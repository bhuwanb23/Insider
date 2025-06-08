import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TabButton = ({ section, isActive, onPress, sectionKey }) => {
  return (
    <TouchableOpacity
      key={sectionKey}
      style={[
        styles.tab,
        isActive && styles.activeTab,
      ]}
      onPress={(event) => {
        if (event && event.currentTarget) {
          event.currentTarget.blur();
        }
        onPress();
      }}
      tabIndex={isActive ? 0 : -1}
      importantForAccessibility={isActive ? 'yes' : 'no-hide-descendants'}
    >
      <LinearGradient
        colors={isActive ? ['#4158D0', '#C850C0'] : ['transparent', 'transparent']}
        style={styles.tabGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.tabIcon}>{section.icon}</Text>
        <Text
          style={[
            styles.tabText,
            isActive && styles.activeTabText,
          ]}
        >
          {section.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    marginHorizontal: 4,
    borderRadius: 22,
    overflow: 'hidden',
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: width * 0.22,
  },
  activeTab: {
    shadowColor: '#4158D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default TabButton; 