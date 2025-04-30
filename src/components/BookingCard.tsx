import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Booking } from '../types/index';
import { useCarsStore } from '../store/carsStore';
import Colors from '../constants/colors';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const navigation = useNavigation();
  const { cars } = useCarsStore();
  
  const car = cars.find((c: { id: string; }) => c.id === booking.carId);
  
  if (!car) return null;
  
  const handlePress = () => {
    navigation.navigate('BookingDetails', { id: booking.id });
  };
  
  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return Colors.success;
      case 'pending': return Colors.warning;
      case 'cancelled': return Colors.error;
      case 'ongoing': return Colors.primary;
      default: return Colors.textSecondary;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={styles.title}>{car.make} {car.model}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailText}>
            Booked on {formatDate(booking.createdAt)}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.price}>Total: ${booking.totalPrice}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
});