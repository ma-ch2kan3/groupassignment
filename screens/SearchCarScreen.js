import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Animated, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';

const SearchCarScreen = () => {
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const [cars, setCars] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8081/search-cars', {
        params: { destination, time },
      });
      setCars(response.data);
    } catch (err) {
      console.error('Error searching cars:', err);
      Alert.alert('Error', 'Failed to search cars. Please try again later.');
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-vinipimenta-311621.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.title}>Search Car</Text>
        <Text style={styles.slogan}>Explore and find your desired taxi</Text>
        <TextInput
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
          style={styles.input}
        />
        <TextInput
          placeholder="Time (HH:MM)"
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.carContainer}>
              <Text style={styles.carText}>Plate Number: {item.plate_number}</Text>
              <Text style={styles.carText}>Car Owner: {item.car_owner}</Text>
              <Text style={styles.carText}>Destination: {item.destination}</Text>
              <Text style={styles.carText}>Departure Time: {item.departure_time}</Text>
            </View>
          )}
        />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  carContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  carText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SearchCarScreen;
