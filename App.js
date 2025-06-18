import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LandingPage from './pages/LandingPage';
import CompanyDetailsPage from './features/core_company_details/pages/CompanyDetailsPage';
import JobHiringsPage from './features/job_hirings_insights/pages/JobHiringsPage';
import InterviewExperiencePage from './features/interview_experience/pages/InterviewExperiencePage';
import NewsHighlightsPage from './features/news_highlights/pages/NewsHighlightsPage';
import WaysToGetInPage from './features/ways_to_get_in/pages/WaysToGetInPage';
import TechStackPage from './features/tech_stack/pages/TechStackPage';
import WorkCulturePage from './features/work_culture/pages/WorkCulturePage';
import SettingsPage from './pages/Settings';
import { NewsProvider } from './features/news_highlights/context/NewsContext';
import { WaysToGetInProvider } from './features/ways_to_get_in/context/WaysToGetInContext';
import { TechStackProvider } from './features/tech_stack/context/TechStackContext';
import { WorkCultureProvider } from './features/work_culture/context/WorkCultureContext';
import { CoreCompanyDetailsProvider } from './features/core_company_details/context/CoreCompanyDetailsContext';
import SearchPage from './pages/SearchPage';

const Stack = createStackNavigator();

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0;

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <LinearGradient
          colors={['rgba(65, 88, 208, 0.85)', 'rgba(200, 80, 192, 0.85)', 'rgba(255, 194, 68, 0.85)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <NavigationContainer>
          <NewsProvider>
            <CoreCompanyDetailsProvider>
              <WaysToGetInProvider>
                <TechStackProvider>
                  <WorkCultureProvider>
                    <Stack.Navigator
                      initialRouteName="Landing"
                      screenOptions={{
                        headerStyle: {
                          backgroundColor: 'transparent',
                          elevation: 0,
                          shadowOpacity: 0,
                          height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                          borderBottomWidth: 0,
                        },
                        headerTransparent: true,
                        headerTitleStyle: {
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: '#fff',
                        },
                        headerTintColor: '#fff',
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
                        presentation: 'card',
                        animationEnabled: true,
                        cardStyleInterpolator: ({ current: { progress } }) => ({
                          cardStyle: {
                            opacity: progress,
                          },
                        }),
                      }}
                    >
                      <Stack.Screen 
                        name="Landing" 
                        component={LandingPage}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="Search"
                        component={SearchPage}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="CompanyDetails"
                        component={CompanyDetailsPage}
                        options={{ 
                          title: 'Company Details',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="JobHirings"
                        component={JobHiringsPage}
                        options={{ 
                          title: 'Jobs & Hiring Insights',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="InterviewExperience"
                        component={InterviewExperiencePage}
                        options={{ 
                          title: 'Interview Experience',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="NewsHighlights"
                        component={NewsHighlightsPage}
                        options={{ 
                          title: 'News & Highlights',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="WaysToGetIn"
                        component={WaysToGetInPage}
                        options={{ 
                          title: 'Ways to Get In',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="TechStack"
                        component={TechStackPage}
                        options={{ 
                          title: 'Tech Stack & Tools',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="WorkCulture"
                        component={WorkCulturePage}
                        options={{ 
                          title: 'Work Culture & Life',
                          headerStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                            shadowOpacity: 0,
                            height: HEADER_HEIGHT + STATUSBAR_HEIGHT,
                            borderBottomWidth: 0,
                          },
                        }}
                      />
                      <Stack.Screen
                        name="Settings"
                        component={SettingsPage}
                        options={{
                          headerShown: false,
                        }}
                      />
                    </Stack.Navigator>
                  </WorkCultureProvider>
                </TechStackProvider>
              </WaysToGetInProvider>
            </CoreCompanyDetailsProvider>
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
