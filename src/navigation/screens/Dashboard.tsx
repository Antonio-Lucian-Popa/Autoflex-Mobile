import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/colors';
import CarCard from '../../components/CarCard';
import calendarIcon from '../../assets/calendar.png';
import chevronRightIcon from '../../assets/chevron-right.png';
import carIcon from '../../assets/car.png';
import { useCarsStore } from '../../store/carsStore';
import { useBookingsStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';

export function Dashboard() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { cars, fetchCars, isLoading: carsLoading } = useCarsStore();
  const { bookings, fetchBookings, isLoading: bookingsLoading } = useBookingsStore();
  
  const isLoading = carsLoading || bookingsLoading;
  
  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, []);
  
  const handleRefresh = () => {
    fetchCars();
    fetchBookings();
  };
  
  const activeBookings = bookings.filter(
    booking => booking.status === 'confirmed' || booking.status === 'ongoing'
  );
  
  const featuredCars = cars.slice(0, 3);
  
  const handleSeeAllCars = () => {
    navigation.navigate('Search');
  };
  
  const handleSeeAllBookings = () => {
    navigation.navigate('Bookings');
  };
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()},</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
      </View>
      
      {user?.userType === 'CLIENT' ? (
        <>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Bookings</Text>
              <TouchableOpacity onPress={handleSeeAllBookings}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {activeBookings.length > 0 ? (
              <View style={styles.bookingsContainer}>
                {activeBookings.map(booking => {
                  const car = cars.find(c => c.id === booking.carId);
                  if (!car) return null;
                  
                  return (
                    <TouchableOpacity 
                      key={booking.id}
                      style={styles.bookingCard}
                      onPress={() => navigation.navigate('BookingDetails', { id: booking.id })}
                    >
                      <View style={styles.bookingIconContainer}>
                        <Image source={calendarIcon} style={styles.bookingIcon} tintColor={Colors.primary} />
                      </View>
                      <View style={styles.bookingInfo}>
                        <Text style={styles.bookingCarName}>{car.make} {car.model}</Text>
                        <Text style={styles.bookingDates}>
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <Image source={chevronRightIcon} style={styles.chevronIcon} tintColor={Colors.textSecondary} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Image source={calendarIcon} style={styles.emptyStateIcon} tintColor={Colors.textSecondary} />
                <Text style={styles.emptyStateText}>No active bookings</Text>
                <TouchableOpacity 
                  style={styles.emptyStateButton}
                  onPress={() => navigation.navigate('Search')}
                >
                  <Text style={styles.emptyStateButtonText}>Find a Car</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Cars</Text>
              <TouchableOpacity onPress={handleSeeAllCars}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </View>
        </>
      ) : (
        <>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Listed Cars</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MyCars')}>
                <Text style={styles.seeAllText}>Manage</Text>
              </TouchableOpacity>
            </View>
            
            {cars.filter(car => car.ownerId === user?.id).length > 0 ? (
              cars
                .filter(car => car.ownerId === user?.id)
                .slice(0, 2)
                .map(car => (
                  <CarCard key={car.id} car={car} />
                ))
            ) : (
              <View style={styles.emptyState}>
                <Image source={carIcon} style={styles.emptyStateIcon} tintColor={Colors.textSecondary} />
                <Text style={styles.emptyStateText}>No cars listed yet</Text>
                <TouchableOpacity 
                  style={styles.emptyStateButton}
                  onPress={() => navigation.navigate('AddCar')}
                >
                  <Text style={styles.emptyStateButtonText}>Add a Car</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Booking Requests</Text>
              <TouchableOpacity onPress={handleSeeAllBookings}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {bookings.filter(booking => booking.status === 'pending').length > 0 ? (
              <View style={styles.bookingsContainer}>
                {bookings
                  .filter(booking => booking.status === 'pending')
                  .map(booking => {
                    const car = cars.find(c => c.id === booking.carId);
                    if (!car) return null;
                    
                    return (
                      <TouchableOpacity 
                        key={booking.id}
                        style={styles.bookingCard}
                        onPress={() => navigation.navigate('BookingDetails', { id: booking.id })}
                      >
                        <View style={styles.bookingIconContainer}>
                          <Image source={calendarIcon} style={styles.bookingIcon} tintColor={Colors.warning} />
                        </View>
                        <View style={styles.bookingInfo}>
                          <Text style={styles.bookingCarName}>{car.make} {car.model}</Text>
                          <Text style={styles.bookingDates}>
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </Text>
                        </View>
                        <Image source={chevronRightIcon} style={styles.chevronIcon} tintColor={Colors.textSecondary} />
                      </TouchableOpacity>
                    );
                  })}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Image source={calendarIcon} style={styles.emptyStateIcon} tintColor={Colors.textSecondary} />
                <Text style={styles.emptyStateText}>No pending requests</Text>
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  bookingsContainer: {
    marginBottom: 8,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bookingIcon: {
    width: 24,
    height: 24,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingCarName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  bookingDates: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  emptyState: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyStateIcon: {
    width: 40,
    height: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 12,
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: Colors.card,
    fontWeight: '500',
  },
});