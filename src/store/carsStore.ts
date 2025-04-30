import { create } from 'zustand';

import { mockCars } from '../mocks/cars';
import { Car } from '../types/index';
import { Filter } from '../types/index';

interface CarsState {
  cars: Car[];
  filteredCars: Car[];
  selectedCar: Car | null;
  filter: Filter;
  isLoading: boolean;
  fetchCars: () => Promise<void>;
  selectCar: (carId: string) => void;
  setFilter: (filter: Partial<Filter>) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

export const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  filteredCars: [],
  selectedCar: null,
  filter: {},
  isLoading: false,
  
  fetchCars: async () => {
    set({ isLoading: true });
    // In a real app, this would be an API call
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ cars: mockCars, filteredCars: mockCars, isLoading: false });
  },
  
  selectCar: (carId: string) => {
    const car = get().cars.find(c => c.id === carId) || null;
    set({ selectedCar: car });
  },
  
  setFilter: (filter: Partial<Filter>) => {
    set(state => ({
      filter: { ...state.filter, ...filter }
    }));
  },
  
  applyFilters: () => {
    const { cars, filter } = get();
    
    let filtered = [...cars];
    
    if (filter.location) {
      filtered = filtered.filter(car => 
        car.location.toLowerCase().includes(filter.location!.toLowerCase())
      );
    }
    
    if (filter.priceRange) {
      filtered = filtered.filter(car => 
        car.price >= filter.priceRange![0] && car.price <= filter.priceRange![1]
      );
    }
    
    if (filter.transmission) {
      filtered = filtered.filter(car => car.transmission === filter.transmission);
    }
    
    if (filter.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filter.fuelType);
    }
    
    if (filter.seats) {
      filtered = filtered.filter(car => car.seats >= filter.seats!);
    }
    
    if (filter.features && filter.features.length > 0) {
      filtered = filtered.filter(car => 
        filter.features!.every(feature => car.features.includes(feature))
      );
    }
    
    set({ filteredCars: filtered });
  },
  
  clearFilters: () => {
    set(state => ({ filter: {}, filteredCars: state.cars }));
  }
}));