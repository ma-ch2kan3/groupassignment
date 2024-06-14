import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Text, ImageBackground } from 'react-native';

const UserHomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-vinipimenta-311621.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.bigTitle}>Welcome to Taxi Rank User</Text>
        <Text style={styles.slogan}>Explore and manage your taxi journeys</Text>
        <View style={styles.buttonContainer}>
          <Button title="Car List" onPress={() => navigation.navigate('CarList')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Search Car" onPress={() => navigation.navigate('SearchCar')} />
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  bigTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slogan: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});

export default UserHomeScreen;
