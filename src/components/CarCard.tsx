import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../types/index';
import Colors from '../constants/colors';

interface CarCardProps {
  car: Car;
  compact?: boolean;
}

export default function CarCard({ car, compact = false }: CarCardProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CarDetails', { id: car.id });
  };

  return (
    <Pressable 
      style={[styles.container, compact && styles.compactContainer]} 
      onPress={handlePress}
    >
      <Image
        source={{ uri: car.images[0] }}
        style={[styles.image, compact && styles.compactImage]}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{car.make} {car.model}</Text>
          <Text style={styles.price}>${car.price}<Text style={styles.priceUnit}>/day</Text></Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{car.year}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{car.transmission}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailText}>{car.seats} seats</Text>
          </View>
        </View>
        
        {!compact && (
          <>
            <View style={styles.location}>
              <Text style={styles.locationText}>{car.location}</Text>
            </View>
            
            <View style={styles.footer}>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>
                  ★ {car.rating} ({car.reviewCount})
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    }),
  },
  compactContainer: {
    flexDirection: 'row',
    height: 100,
  },
  image: {
    height: 180,
    backgroundColor: Colors.border,
  },
  compactImage: {
    height: 100,
    width: 100,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailItem: {
    marginRight: 12,
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});