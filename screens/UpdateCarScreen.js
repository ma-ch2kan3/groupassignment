import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';

const UpdateCarScreen = ({ navigation }) => {
  const [plateNumber, setPlateNumber] = useState('');
  const [columnToUpdate, setColumnToUpdate] = useState('');
  const [newValue, setNewValue] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleUpdate = async () => {
    if (!plateNumber || !columnToUpdate || !newValue) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await axios.put('http://localhost:8081/update-car', {
        plate_number: plateNumber,
        column: columnToUpdate,
        value: newValue,
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setPlateNumber('');
      setColumnToUpdate('');
      setNewValue('');
    } catch (err) {
      Alert.alert('Error', 'Failed to update car');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-vinipimenta-311621.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.title}>Update Car</Text>
        <Text style={styles.slogan}>Modify car details as needed</Text>
        <TextInput
          placeholder="Plate Number"
          value={plateNumber}
          onChangeText={setPlateNumber}
          style={styles.input}
        />
        <TextInput
          placeholder="Column to Update"
          value={columnToUpdate}
          onChangeText={setColumnToUpdate}
          style={styles.input}
        />
        <TextInput
          placeholder="New Value"
          value={newValue}
          onChangeText={setNewValue}
          style={styles.input}
        />
        <Button title="Update Car" onPress={handleUpdate} />
        {showSuccessMessage && (
          <Text style={styles.successMessage}>Car updated successfully!</Text>
        )}
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
  successMessage: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UpdateCarScreen;
