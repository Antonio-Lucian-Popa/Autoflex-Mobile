import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/colors';
import Button from '../../components/Button';

import carImage from '../../assets/car-hero.png';

export function Welcome() {
  const navigation = useNavigation();
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/car.png')} style={styles.logo} />
        <Text style={styles.appName}>RentACar</Text>
      </View>
      
      <View style={styles.heroContainer}>
        <Image
          source={carImage}
          style={styles.heroImage}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Find Your Perfect Ride</Text>
        <Text style={styles.subtitle}>
          Rent a car easily with just a few taps. Choose from a wide range of vehicles for any occasion.
        </Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Log In"
            onPress={handleLogin}
            variant="primary"
            style={styles.button}
            fullWidth
          />
          <Button
            title="Create Account"
            onPress={handleRegister}
            variant="outline"
            style={styles.button}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: Colors.primary,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginLeft: 8,
  },
  heroContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  heroImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 16,
  },
});