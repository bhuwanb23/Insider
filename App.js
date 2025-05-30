import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LandingPage from './pages/LandingPage';
import CompanyDetailsPage from './features/core_company_details/pages/CompanyDetailsPage';
import JobHiringsPage from './features/job_hirings_insights/pages/JobHiringsPage';
import InterviewExperiencePage from './features/interview_experience/pages/InterviewExperiencePage';
import NewsHighlightsPage from './features/news_highlights/pages/NewsHighlightsPage';
import WaysToGetInPage from './features/ways_to_get_in/pages/WaysToGetInPage';
import { NewsProvider } from './features/news_highlights/context/NewsContext';
import { WaysToGetInProvider } from './features/ways_to_get_in/context/WaysToGetInContext';

const Stack = createStackNavigator();

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0;

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <NavigationContainer>
          <NewsProvider>
            <WaysToGetInProvider>
              <Stack.Navigator
                initialRouteName="Landing"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#ffffff',
                    elevation: 0,
                    shadowOpacity: 0,
                    height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                  },
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  headerBackTitleVisible: false,
                  headerTitleAlign: 'center',
                  headerLeftContainerStyle: {
                    paddingLeft: 16,
                  },
                  headerRightContainerStyle: {
                    paddingRight: 16,
                  },
                  cardStyle: {
                    backgroundColor: 'transparent',
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
                    headerStyle: {
                      backgroundColor: '#ffffff',
                      elevation: 0,
                      shadowOpacity: 0,
                      height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                    },
                  }}
                />
                <Stack.Screen
                  name="JobHirings"
                  component={JobHiringsPage}
                  options={{ 
                    title: 'Jobs & Hiring Insights',
                    headerStyle: {
                      backgroundColor: '#ffffff',
                      elevation: 0,
                      shadowOpacity: 0,
                      height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                    },
                  }}
                />
                <Stack.Screen
                  name="InterviewExperience"
                  component={InterviewExperiencePage}
                  options={{ 
                    title: 'Interview Experience',
                    headerStyle: {
                      backgroundColor: '#ffffff',
                      elevation: 0,
                      shadowOpacity: 0,
                      height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                    },
                  }}
                />
                <Stack.Screen
                  name="NewsHighlights"
                  component={NewsHighlightsPage}
                  options={{ 
                    title: 'News & Highlights',
                    headerStyle: {
                      backgroundColor: '#ffffff',
                      elevation: 0,
                      shadowOpacity: 0,
                      height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                    },
                  }}
                />
                <Stack.Screen
                  name="WaysToGetIn"
                  component={WaysToGetInPage}
                  options={{ 
                    title: 'Ways to Get In',
                    headerStyle: {
                      backgroundColor: '#ffffff',
                      elevation: 0,
                      shadowOpacity: 0,
                      height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                    },
                  }}
                />
              </Stack.Navigator>
            </WaysToGetInProvider>
          </NewsProvider>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: STATUSBAR_HEIGHT,
  },
});
