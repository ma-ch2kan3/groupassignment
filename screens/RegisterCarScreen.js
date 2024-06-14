import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';

const RegisterCarScreen = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [carOwner, setCarOwner] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8081/register-car', { 
        plate_number: plateNumber,
        car_owner: carOwner,
        destination,
        departure_time: departureTime,
      });
      alert('Car registered successfully');
    } catch (err) {
      console.error('Error registering car:', err);
      alert('Error registering car: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-vinipimenta-311621.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.title}>Register Car</Text>
        <Text style={styles.slogan}>Enter car details to register</Text>
        <TextInput
          placeholder="Plate Number"
          value={plateNumber}
          onChangeText={setPlateNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Car Owner"
          value={carOwner}
          onChangeText={setCarOwner}
          style={styles.input}
        />
        <TextInput
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />
        <TextInput
          placeholder="Departure Time"
          value={departureTime}
          onChangeText={setDepartureTime}
          style={styles.input}
        />
        <Button title="Register" onPress={handleSubmit} />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slogan: {
    fontSize: 16,
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '80%',
  },
});

export default RegisterCarScreen;
