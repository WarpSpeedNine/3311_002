import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './pages/HomeScreen';
import HistoryScreen from "./pages/HistoryScreen";
import LogWorkoutScreen from './pages/LogWorkoutScreen';
import RoutinesScreen from "./pages/RoutinesScreen";
import ExercisesScreen from './pages/ExercisesScreen';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';


const copyDatabaseFile = async (databaseName) => {
  let databaseAssetPath = databaseName; // On Android, the asset path is just the name of the file
  const databaseInternalPath = `${RNFS.DocumentDirectoryPath}/${databaseName}`;

  // Check if the database file exists in the internal directory
  const fileExists = await RNFS.exists(databaseInternalPath);
  if (!fileExists) {
    try {
      if (Platform.OS === 'android') {
        // Copy the database file from the assets folder to the internal storage for Android
        await RNFS.copyFileAssets(databaseAssetPath, databaseInternalPath);
      } else {
        // For iOS, adjust the path for copying from the MainBundle
        databaseAssetPath = `${RNFS.MainBundlePath}/${databaseName}`;
        await RNFS.copyFile(databaseAssetPath, databaseInternalPath);
      }
      console.log('Database file copied successfully!');
    } catch (error) {
      console.error('Error copying database file:', error);
    }
  }
};

const Stack = createStackNavigator();

function App() {

  useEffect(() => {
    // Copy the database from the assets folder to internal storage
    copyDatabaseFile('Database.db').catch(console.error);
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Log Workout" component={LogWorkoutScreen} />
          <Stack.Screen name="Routines" component={RoutinesScreen} />
          <Stack.Screen name="Exercises" component={ExercisesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} // View rendering with title and content available

export default App;
