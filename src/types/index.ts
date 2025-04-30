export type UserType = 'CLIENT' | 'OWNER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: UserType;
  avatar?: string;
  rating?: number;
  joinedDate: string;
}

export interface Car {
  id: string;
  ownerId: string;
  owner: User;
  make: string;
  model: string;
  year: number;
  images: string[];
  price: number;
  location: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  description: string;
  features: string[];
  rating?: number;
  reviewCount?: number;
  available: boolean;
}

export interface Booking {
  id: string;
  carId: string;
  clientId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Filter {
  location?: string;
  startDate?: string;
  endDate?: string;
  priceRange?: [number, number];
  transmission?: 'Automatic' | 'Manual' | null;
  fuelType?: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | null;
  seats?: number | null;
  features?: string[];
}