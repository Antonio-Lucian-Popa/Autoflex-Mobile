import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Image
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';


import Colors from '../../constants/colors';
import Button from '../../components/Button';
import calendarIcon from '../../assets/calendar.png';
import clockIcon from '../../assets/clock.png';
import mapPinIcon from '../../assets/map-pin.png';
import userIcon from '../../assets/user.png';
import phoneIcon from '../../assets/phone.png';
import { useCarsStore } from '../../store/carsStore';
import { useAuthStore } from '../../store/authStore';
import { useBookingsStore } from '../../store/bookingStore';

export function BookingDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };
  const { bookings, cancelBooking } = useBookingsStore();
  const { cars } = useCarsStore();
  const { user } = useAuthStore();
  
  const booking = bookings.find((b: { id: string; }) => b.id === id);
  
  if (!booking) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Booking not found</Text>
      </View>
    );
  }
  
  const car = cars.find(c => c.id === booking.carId);
  
  if (!car) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Car details not found</Text>
      </View>
    );
  }
  
  const isOwner = user?.id === car.ownerId;
  const isClient = user?.id === booking.clientId;
  
  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          onPress: async () => {
            await cancelBooking(booking.id);
            Alert.alert('Booking Cancelled', 'Your booking has been cancelled successfully.');
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return Colors.success;
      case 'pending': return Colors.warning;
      case 'cancelled': return Colors.error;
      case 'ongoing': return Colors.primary;
      default: return Colors.textSecondary;
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: car.images[0] }}
          style={styles.carImage}
        />
        
        <View style={styles.overlay}>
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{car.make} {car.model}</Text>
            <View style={styles.locationContainer}>
              <Image source={mapPinIcon} style={styles.locationIcon} tintColor={Colors.card} />
              <Text style={styles.locationText}>{car.location}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Image source={calendarIcon} style={styles.detailIcon} tintColor={Colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Rental Period</Text>
                <Text style={styles.detailValue}>
                  {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                </Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailRow}>
              <View style={styles.detailIconContainer}>
                <Image source={clockIcon} style={styles.detailIcon} tintColor={Colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Booking Date</Text>
                <Text style={styles.detailValue}>
                  {formatDate(booking.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Daily Rate</Text>
              <Text style={styles.paymentValue}>${car.price}/day</Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Duration</Text>
              <Text style={styles.paymentValue}>
                {Math.ceil(
                  (new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / 
                  (1000 * 60 * 60 * 24)
                )} days
              </Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Service Fee</Text>
              <Text style={styles.paymentValue}>$0</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.paymentRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>${booking.totalPrice}</Text>
            </View>
          </View>
        </View>
        
        {isClient && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Car Owner</Text>
            
            <View style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View style={styles.contactIconContainer}>
                  <Image source={userIcon} style={styles.contactIcon} tintColor={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.contactName}>Car Owner</Text>
                  <Text style={styles.contactSubtext}>Contact for assistance</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.contactButton}>
                <Image source={phoneIcon} style={styles.contactButtonIcon} tintColor={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {isOwner && booking.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Button
              title="Accept Booking"
              onPress={() => {}}
              variant="primary"
              style={styles.acceptButton}
              fullWidth
            />
            <Button
              title="Decline"
              onPress={handleCancelBooking}
              variant="outline"
              style={styles.declineButton}
              textStyle={styles.declineButtonText}
              fullWidth
            />
          </View>
        )}
        
        {isClient && (booking.status === 'pending' || booking.status === 'confirmed') && (
          <Button
            title="Cancel Booking"
            onPress={handleCancelBooking}
            variant="outline"
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            fullWidth
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'relative',
    height: 200,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  carInfo: {
    justifyContent: 'flex-end',
  },
  carName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.card,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 14,
    height: 14,
  },
  locationText: {
    fontSize: 14,
    color: Colors.card,
    marginLeft: 4,
  },
  content: {
    padding: 16,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailIcon: {
    width: 20,
    height: 20,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  paymentCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  paymentValue: {
    fontSize: 14,
    color: Colors.text,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactIcon: {
    width: 24,
    height: 24,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  contactSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  contactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactButtonIcon: {
    width: 20,
    height: 20,
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  acceptButton: {
    backgroundColor: Colors.success,
  },
  declineButton: {
    borderColor: Colors.error,
  },
  declineButtonText: {
    color: Colors.error,
  },
  cancelButton: {
    borderColor: Colors.error,
    marginBottom: 24,
  },
  cancelButtonText: {
    color: Colors.error,
  },
});