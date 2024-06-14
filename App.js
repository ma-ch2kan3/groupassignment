import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RegisterCarScreen from './screens/RegisterCarScreen';
import SearchCarScreen from './screens/SearchCarScreen';
import CarListScreen from './screens/CarListScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import SpectatorHomeScreen from './screens/SpectorHomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Taxi Rank Management' }} />
        <Stack.Screen name="User Home" component={UserHomeScreen} options={{ title: 'User Dashboard' }} />
        <Stack.Screen name="Spectator Home" component={SpectatorHomeScreen} options={{ title: 'Spectator Dashboard' }} />
        <Stack.Screen name="Register Car" component={RegisterCarScreen} options={{ title: 'Register Car' }} />
        <Stack.Screen name="Search Car" component={SearchCarScreen} options={{ title: 'Search Car' }} />
        <Stack.Screen name="Car List" component={CarListScreen} options={{ title: 'Car List' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
