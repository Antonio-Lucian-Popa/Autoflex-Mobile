import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  Alert,
  Image
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Colors from '../../constants/colors';
import Button from '../../components/Button';

import calendarIcon from '../../assets/calendar.png';
import mapPinIcon from '../../assets/map-pin.png';
import starIcon from '../../assets/star.png';
import userIcon from '../../assets/user.png';
import phoneIcon from '../../assets/phone.png';
import chevronLeftIcon from '../../assets/chevron-left.png';
import chevronRightIcon from '../../assets/chevron-right.png';
import fuelIcon from '../../assets/fuel.png';
import cogIcon from '../../assets/cog.png';
import usersIcon from '../../assets/users.png';
import { useCarsStore } from '../../store/carsStore';
import { useAuthStore } from '../../store/authStore';
import { useBookingsStore } from '../../store/bookingStore';
import { User } from '../../types/index';

const { width } = Dimensions.get('window');

export function CarDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };
  const { cars, selectCar, selectedCar } = useCarsStore();
  const { user } = useAuthStore();
  const { createBooking } = useBookingsStore();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (id) {
      selectCar(id);
    }
  }, [id]);
  
  useEffect(() => {
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  
  if (!selectedCar) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? selectedCar.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === selectedCar.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const calculateTotalDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * selectedCar.price;
  };
  
  const handleBookNow = async () => {
    if (user?.userType !== 'CLIENT') {
      Alert.alert(
        'Cannot Book',
        'Only clients can book cars. Please switch to a client account.'
      );
      return;
    }
    
    if (selectedCar.ownerId === user.id) {
      Alert.alert(
        'Cannot Book',
        "You can't book your own car."
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      await createBooking({
        carId: selectedCar.id,
        clientId: user.id,
        startDate,
        endDate,
        totalPrice: calculateTotalPrice(),
        status: 'pending',
      });
      
      Alert.alert(
        'Booking Requested',
        'Your booking request has been sent to the car owner.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Bookings'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Find the owner
  const owner: User | null = cars.find(car => car.ownerId === selectedCar.ownerId)?.owner || null;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedCar.images[currentImageIndex] }}
          style={styles.image}
        />
        
        {selectedCar.images.length > 1 && (
          <>
            <TouchableOpacity 
              style={[styles.imageNavButton, styles.prevButton]} 
              onPress={handlePrevImage}
            >
              <Image source={chevronLeftIcon} style={styles.navIcon} tintColor={Colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.imageNavButton, styles.nextButton]} 
              onPress={handleNextImage}
            >
              <Image source={chevronRightIcon} style={styles.navIcon} tintColor={Colors.text} />
            </TouchableOpacity>
            
            <View style={styles.pagination}>
              {selectedCar.images.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.paginationDot,
                    index === currentImageIndex && styles.activeDot
                  ]} 
                />
              ))}
            </View>
          </>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{selectedCar.make} {selectedCar.model}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${selectedCar.price}</Text>
            <Text style={styles.priceUnit}>/day</Text>
          </View>
        </View>
        
        <View style={styles.locationContainer}>
          <Image source={mapPinIcon} style={styles.locationIcon} tintColor={Colors.textSecondary} />
          <Text style={styles.locationText}>{selectedCar.location}</Text>
          
          {selectedCar.rating && (
            <View style={styles.ratingContainer}>
              <Image source={starIcon} style={styles.ratingIcon} tintColor={Colors.warning} />
              <Text style={styles.ratingText}>
                {selectedCar.rating} ({selectedCar.reviewCount} reviews)
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.specsContainer}>
          <View style={styles.specItem}>
            <View style={styles.specIconContainer}>
              <Image source={calendarIcon} style={styles.specIcon} tintColor={Colors.primary} />
            </View>
            <Text style={styles.specValue}>{selectedCar.year}</Text>
            <Text style={styles.specLabel}>Year</Text>
          </View>
          
          <View style={styles.specItem}>
            <View style={styles.specIconContainer}>
              <Image source={cogIcon} style={styles.specIcon} tintColor={Colors.primary} />
            </View>
            <Text style={styles.specValue}>{selectedCar.transmission}</Text>
            <Text style={styles.specLabel}>Transmission</Text>
          </View>
          
          <View style={styles.specItem}>
            <View style={styles.specIconContainer}>
              <Image source={fuelIcon} style={styles.specIcon} tintColor={Colors.primary} />
            </View>
            <Text style={styles.specValue}>{selectedCar.fuelType}</Text>
            <Text style={styles.specLabel}>Fuel</Text>
          </View>
          
          <View style={styles.specItem}>
            <View style={styles.specIconContainer}>
              <Image source={usersIcon} style={styles.specIcon} tintColor={Colors.primary} />
            </View>
            <Text style={styles.specValue}>{selectedCar.seats}</Text>
            <Text style={styles.specLabel}>Seats</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{selectedCar.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresContainer}>
            {selectedCar.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Owner</Text>
          <View style={styles.ownerCard}>
            <View style={styles.ownerInfo}>
              <View style={styles.ownerIconContainer}>
                <Image source={userIcon} style={styles.ownerIcon} tintColor={Colors.primary} />
              </View>
              <View>
                <Text style={styles.ownerName}>{owner?.name || 'Car Owner'}</Text>
                <View style={styles.ownerRating}>
                  <Image source={starIcon} style={styles.ownerRatingIcon} tintColor={Colors.warning} />
                  <Text style={styles.ownerRatingText}>{owner?.rating || 4.5}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.contactButton}>
              <Image source={phoneIcon} style={styles.contactIcon} tintColor={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {user?.userType === 'CLIENT' && (
          <View style={styles.bookingSection}>
            <Text style={styles.sectionTitle}>Book This Car</Text>
            
            <View style={styles.dateContainer}>
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Image source={calendarIcon} style={styles.dateIcon} tintColor={Colors.textSecondary} />
                  <Text style={styles.dateText}>{startDate}</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.dateItem}>
                <Text style={styles.dateLabel}>End Date</Text>
                <TouchableOpacity style={styles.dateInput}>
                  <Image source={calendarIcon} style={styles.dateIcon} tintColor={Colors.textSecondary} />
                  <Text style={styles.dateText}>{endDate}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  ${selectedCar.price} x {calculateTotalDays()} days
                </Text>
                <Text style={styles.summaryValue}>${calculateTotalPrice()}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service fee</Text>
                <Text style={styles.summaryValue}>$0</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${calculateTotalPrice()}</Text>
              </View>
            </View>
            
            <Button
              title="Book Now"
              onPress={handleBookNow}
              loading={isLoading}
              fullWidth
            />
          </View>
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
  imageContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: Colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageNavButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card + 'CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.card + '80',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.card,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationIcon: {
    width: 16,
    height: 16,
  },
  locationText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    width: 16,
    height: 16,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  specsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  specItem: {
    alignItems: 'center',
  },
  specIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  specIcon: {
    width: 20,
    height: 20,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  specLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
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
  description: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  featureItem: {
    backgroundColor: Colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
  },
  ownerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ownerIcon: {
    width: 24,
    height: 24,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  ownerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerRatingIcon: {
    width: 14,
    height: 14,
  },
  ownerRatingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  contactButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactIcon: {
    width: 20,
    height: 20,
  },
  bookingSection: {
    marginTop: 8,
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateItem: {
    flex: 1,
    marginRight: 8,
  },
  dateLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
  },
  summaryContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    marginBottom: 0,
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
});