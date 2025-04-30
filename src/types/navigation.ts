// src/types/navigation.ts
export type RootStackParamList = {
    Auth: undefined;
    Login: undefined;
    Register: undefined;
    HomeTabs: undefined;
    CarDetails: { id: string };
    BookingDetails: { id: string }; // ✅ parametrul lipsă
    AddCar: undefined;
    Search: undefined;
    Bookings: undefined;
    MyCars: undefined;
    NotFound: undefined;
  };
  