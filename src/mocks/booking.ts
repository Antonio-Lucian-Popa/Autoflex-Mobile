import { Booking } from '../types/index';

export const mockBookings: Booking[] = [
  {
    id: 'booking1',
    carId: 'car1',
    clientId: 'user1',
    startDate: '2023-10-15',
    endDate: '2023-10-18',
    totalPrice: 150,
    status: 'completed',
    createdAt: '2023-10-10T10:30:00Z'
  },
  {
    id: 'booking2',
    carId: 'car3',
    clientId: 'user3',
    startDate: '2023-11-05',
    endDate: '2023-11-07',
    totalPrice: 180,
    status: 'completed',
    createdAt: '2023-10-28T14:15:00Z'
  },
  {
    id: 'booking3',
    carId: 'car2',
    clientId: 'user1',
    startDate: '2023-12-20',
    endDate: '2023-12-27',
    totalPrice: 315,
    status: 'confirmed',
    createdAt: '2023-12-01T09:45:00Z'
  },
  {
    id: 'booking4',
    carId: 'car5',
    clientId: 'user3',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    totalPrice: 150,
    status: 'pending',
    createdAt: '2024-01-02T16:20:00Z'
  }
];