import React, { useRef, useEffect } from 'react';
import { View, Button, Animated, StyleSheet, Text, ImageBackground } from 'react-native';

const UserLoginScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    navigation.navigate('UserHome');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground 
        source={require('../assets/pexels-rozegold-2449600.jpg')} 
        style={styles.backgroundImage}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.bigTitle}>Login</Text>
        <Text style={styles.slogan}>Do you wanna login or not?</Text>
        <Button title="Login as User" onPress={handleLogin} />
        <View style={styles.goBackButtonContainer}>
          <Button title="Go Back" onPress={handleGoBack} />
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
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
  },
  slogan: {
    fontSize: 18,
    color: '#f4511e',
    textAlign: 'center',
    marginBottom: 30,
  },
  goBackButtonContainer: {
    marginTop: 20,
  },
});

export default UserLoginScreen;
