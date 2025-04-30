import { create } from 'zustand';
import { Booking } from '../types/index';

import { useAuthStore } from './authStore';
import { mockBookings } from '../mocks/booking';

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  fetchBookings: () => Promise<void>;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

export const useBookingsStore = create<BookingsState>((set, get) => ({
  bookings: [],
  isLoading: false,
  
  fetchBookings: async () => {
    set({ isLoading: true });
    // In a real app, this would be an API call
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = useAuthStore.getState().user;
    let userBookings: Booking[] = [];
    
    if (user) {
      if (user.userType === 'CLIENT') {
        userBookings = mockBookings.filter(booking => booking.clientId === user.id);
      } else {
        // For OWNER, we'd need to match bookings with cars they own
        // This is simplified for the mock
        userBookings = mockBookings.filter(booking => {
          const carOwnerId = mockBookings.find(b => b.id === booking.id)?.carId;
          return carOwnerId === user.id;
        });
      }
    }
    
    set({ bookings: userBookings, isLoading: false });
  },
  
  createBooking: async (bookingData) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    set(state => ({
      bookings: [...state.bookings, newBooking],
      isLoading: false
    }));
  },
  
  cancelBooking: async (bookingId) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      bookings: state.bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ),
      isLoading: false
    }));
  }
}));