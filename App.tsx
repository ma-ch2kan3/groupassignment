import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Image, Text, View, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import SpectorLoginScreen from './screens/SpectorLoginScreen';
import SpectorHomeScreen from './screens/SpectorHomeScreen';
import RegisterCarScreen from './screens/RegisterCarScreen';
import SearchCarScreen from './screens/SearchCarScreen';
import CarListScreen from './screens/CarListScreen';
import UpdateCarScreen from './screens/UpdateCarScreen';
import SpectorRegistrationScreen from './screens/SpectorRegistrationScreen';

const renderTitleWithLogos = (title: string, logoSources: any[]) => {
  return (
    <View style={styles.headerTitleContainer}>
      <View style={styles.startContainer}>
        <Image source={logoSources[0]} style={styles.logo} />
        <Text style={styles.headerTitleText}>{title}</Text>
      </View>
      <View style={styles.middleContainer}>
        {logoSources.slice(1, -1).map((source, index) => (
          <Image key={index} source={source} style={styles.middleLogo} />
        ))}
      </View>
      <View style={styles.endContainer}>
        <Image source={logoSources[logoSources.length - 1]} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  endContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    width: 45,
    height: 45,
  },
  middleLogo: {
    width: 45,
    height: 45,
    marginHorizontal: 15, 
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

const Stack = createStackNavigator();

const App = () => {
  const screenOptions: StackNavigationOptions = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  };

  const logoSources = [
    require('./assets/pexels-rozegold-2449600.jpg'),
    require('./assets/OIP.jpg'),
    require('./assets/R.png'),
    require('./assets/R.jpg'),
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Taxi Rank', logoSources),
          }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('User Login', logoSources),
          }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHomeScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('User Home', logoSources),
          }}
        />
        <Stack.Screen
          name="SpectorLogin"
          component={SpectorLoginScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Spector Login', logoSources),
          }}
        />
        <Stack.Screen
          name="SpectorHome"
          component={SpectorHomeScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Spector Home', logoSources),
          }}
        />
        <Stack.Screen
          name="RegisterCar"
          component={RegisterCarScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Register Car', logoSources),
          }}
        />
        <Stack.Screen
          name="SearchCar"
          component={SearchCarScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Search Car', logoSources),
          }}
        />
        <Stack.Screen
          name="CarList"
          component={CarListScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Car List', logoSources),
          }}
        />
        <Stack.Screen
          name="UpdateCar"
          component={UpdateCarScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Update Car', logoSources),
          }}
        />
        <Stack.Screen
          name="SpectorRegistration"
          component={SpectorRegistrationScreen}
          options={{
            headerTitle: () => renderTitleWithLogos('Spector Registration', logoSources),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
