import React from 'react';
import { StyleSheet, SafeAreaView, Platform, StatusBar, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './pages/LandingPage';
import CompanyDetailsPage from './features/core_company_details/pages/CompanyDetailsPage';
import JobHiringsPage from './features/job_hirings_insights/pages/JobHiringsPage';
import InterviewExperiencePage from './features/interview_experience/pages/InterviewExperiencePage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
              },
            }}
          >
            <Stack.Screen 
              name="Landing" 
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CompanyDetails"
              component={CompanyDetailsPage}
              options={{ 
                title: 'Company Details',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="JobHirings"
              component={JobHiringsPage}
              options={{ 
                title: 'Jobs & Hiring Insights',
                headerBackTitleVisible: false,
              }}
            />
            <Stack.Screen
              name="InterviewExperience"
              component={InterviewExperiencePage}
              options={{ 
                title: 'Interview Experience',
                headerBackTitleVisible: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
