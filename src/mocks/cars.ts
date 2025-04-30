import { Car } from '../types';

export const mockCars: Car[] = [
  {
    id: 'car1',
    ownerId: 'user2',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
    ],
    price: 50,
    location: 'Bucharest',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    description: 'Well-maintained Volkswagen Golf with excellent fuel efficiency. Perfect for city driving and short trips.',
    features: ['Air Conditioning', 'Bluetooth', 'Cruise Control', 'Parking Sensors'],
    rating: 4.7,
    reviewCount: 23,
    available: true
  },
  {
    id: 'car2',
    ownerId: 'user4',
    make: 'Dacia',
    model: 'Duster',
    year: 2021,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2'
    ],
    price: 45,
    location: 'Cluj-Napoca',
    transmission: 'Manual',
    fuelType: 'Diesel',
    seats: 5,
    description: 'Rugged and reliable Dacia Duster SUV. Great for both city driving and countryside adventures.',
    features: ['Air Conditioning', 'Bluetooth', '4x4', 'Roof Rack'],
    rating: 4.5,
    reviewCount: 18,
    available: true
  },
  {
    id: 'car3',
    ownerId: 'user2',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89',
      'https://images.unsplash.com/photo-1551300704-5c0abee6e574'
    ],
    price: 90,
    location: 'Bucharest',
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    description: 'Premium electric Tesla Model 3 with long range battery. Includes free supercharging.',
    features: ['Autopilot', 'Premium Sound', 'Heated Seats', 'Glass Roof'],
    rating: 4.9,
    reviewCount: 31,
    available: true
  },
  {
    id: 'car4',
    ownerId: 'user4',
    make: 'Renault',
    model: 'Clio',
    year: 2020,
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d'
    ],
    price: 35,
    location: 'Timisoara',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    seats: 5,
    description: 'Compact and economical Renault Clio. Ideal for city driving with excellent fuel efficiency.',
    features: ['Air Conditioning', 'Bluetooth', 'USB Port'],
    rating: 4.3,
    reviewCount: 15,
    available: true
  },
  {
    id: 'car5',
    ownerId: 'user2',
    make: 'BMW',
    model: '3 Series',
    year: 2021,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e',
      'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d'
    ],
    price: 75,
    location: 'Bucharest',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    description: 'Luxury BMW 3 Series with premium features and excellent performance. Hybrid engine for better fuel efficiency.',
    features: ['Leather Seats', 'Navigation', 'Parking Camera', 'Heated Seats', 'Sunroof'],
    rating: 4.8,
    reviewCount: 27,
    available: true
  },
  {
    id: 'car6',
    ownerId: 'user4',
    make: 'Audi',
    model: 'A4',
    year: 2022,
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a',
      'https://images.unsplash.com/photo-1542362567-b07e54358753'
    ],
    price: 80,
    location: 'Iasi',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    description: 'Premium Audi A4 with elegant design and advanced technology features. Comfortable for long journeys.',
    features: ['Leather Seats', 'Navigation', 'Parking Sensors', 'Bluetooth', 'Climate Control'],
    rating: 4.7,
    reviewCount: 22,
    available: true
  }
];