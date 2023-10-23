

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './pages/HomeScreen';
import HistoryScreen from "./pages/HistoryScreen";
import LogWorkoutScreen from './pages/LogWorkoutScreen';
import RoutinesScreen from "./pages/RoutinesScreen";
import ExercisesScreen from './pages/ExercisesScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"> 
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen}/>
          <Stack.Screen name="Log Workout" component={LogWorkoutScreen} />
          <Stack.Screen name="Routines" component={RoutinesScreen}/>
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} // View rendering with title and content available


export default App;