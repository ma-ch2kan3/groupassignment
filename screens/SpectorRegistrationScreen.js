import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground, Alert } from 'react-native';

const SpectorRegistrationScreen = ({ navigation }) => {
  const [spectorId, setSpectorId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleRegistration = () => {
    // Perform validation
    if (!spectorId || !name || !address || !password|| !email ) {
      Alert.alert('Registration Failed', 'Please fill all fields');
      return;
    }

    // Post data to the server
    fetch('http://localhost:8081/register-spector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spectorId, name, address, password , email}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Alert.alert('Registration Failed', data.error);
        } else {
          Alert.alert('Registration Successful', 'You can now log in');
          navigation.navigate('SpectorLogin');
        }
      })
      .catch(error => {
        Alert.alert('Registration Failed', 'Error registering spector');
        console.error('Error registering spector:', error);
      });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-vinipimenta-311621.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.title}>Spector Registration</Text>
        <Text style={styles.slogan}>Enter your details to register</Text>
        <TextInput
          placeholder="Spector ID"
          value={spectorId}
          onChangeText={setSpectorId}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <Button title="Register" onPress={handleRegistration} />
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
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  slogan: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
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

export default SpectorRegistrationScreen;
