import React, { useRef, useEffect } from 'react';
import { View, Text, Button, Animated, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
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
        source={require('../assets/pexels-suzukii-xingfu-67659-674665.jpg')} 
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <Text style={styles.bigTitle}>Taxi Rank</Text>
        <Text style={styles.slogan}>Efficient Rides, Happy Journeys</Text>
        <Text style={styles.product}>We provide quality services to both users and spectors in our Taxi Rank management.</Text>
        <Text style={styles.option}>Please Select An Option To Login into the App</Text>
        <View style={styles.buttonContainer}>
          <Button title="User" onPress={() => navigation.navigate('UserLogin')} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Spector" onPress={() => navigation.navigate('SpectorLogin')} />
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
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 10,
    resizeMode: 'cover',
  },
  bigTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#008080',
    textAlign: 'center',
    marginBottom: 30,
  },
  product: {
    fontSize: 20 ,
    fontStyle: 'italic',
    color: '#FFD700',
    textAlign:  'center',
    marginBottom: 30,
  },
  option: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
  },
});

export default HomeScreen;
