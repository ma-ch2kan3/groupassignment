import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native';
import axios from 'axios';

const CarListScreen = () => {
  const [cars, setCars] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8081/cars'); 
        console.log(response.data);
        setCars(response.data);
      } catch (err) {
        console.error('Error fetching cars:', err);
        alert('Error fetching cars');
      }
    };
    

    fetchCars();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.plate_number}</Text>
      <Text style={styles.cell}>{item.car_owner}</Text>
      <Text style={styles.cell}>{item.destination}</Text>
      <Text style={styles.cell}>{item.departure_time}</Text>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Registered Cars</Text>
      <View style={styles.table}>
        <View style={styles.header}>
          <Text style={styles.headerCell}>Plate Number</Text>
          <Text style={styles.headerCell}>Car Owner</Text>
          <Text style={styles.headerCell}>Destination</Text>
          <Text style={styles.headerCell}>Departure Time</Text>
        </View>
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});

export default CarListScreen;
