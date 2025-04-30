import { User } from "../types/index";



export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+40 712 345 678',
    userType: 'CLIENT',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    rating: 4.8,
    joinedDate: '2022-01-15'
  },
  {
    id: 'user2',
    name: 'Maria Popescu',
    email: 'maria@example.com',
    phone: '+40 723 456 789',
    userType: 'OWNER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.9,
    joinedDate: '2021-11-03'
  },
  {
    id: 'user3',
    name: 'Alex Ionescu',
    email: 'alex@example.com',
    phone: '+40 734 567 890',
    userType: 'CLIENT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4.6,
    joinedDate: '2022-03-22'
  },
  {
    id: 'user4',
    name: 'Elena Dumitrescu',
    email: 'elena@example.com',
    phone: '+40 745 678 901',
    userType: 'OWNER',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    rating: 4.7,
    joinedDate: '2021-09-10'
  }
];