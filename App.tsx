import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './pages/HomeScreen';
import HistoryScreen from "./pages/HistoryScreen";
import LogWorkoutScreen from './pages/LogWorkoutScreen';
import RoutinesScreen from "./pages/RoutinesScreen";
import ExercisesScreen from './pages/ExercisesScreen';
import WorkoutSavedScreen from './pages/WorkoutSavedScreen';

const Stack = createStackNavigator();

function App() {
  // Safe area provider is to make sure everything renders within device borders
  // Nav container wraps everything within single structure
  // Stack navigator sets up stack for screens for navigation, with each screen defined individually
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Log Workout" component={LogWorkoutScreen} />
          <Stack.Screen name="Routines" component={RoutinesScreen} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
          <Stack.Screen name="Workout Saved" component={WorkoutSavedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
