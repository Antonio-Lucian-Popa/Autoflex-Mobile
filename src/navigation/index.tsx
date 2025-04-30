import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import car from '../assets/car.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { BookingDetails } from './screens/BookingDetails';
import { AddCar } from './screens/AddCar';
import { CarDetails } from './screens/CarDetails';
import { Welcome } from './screens/Welcome';

import homeIcon from '../assets/home.png';
import searchIcon from '../assets/search.png';
import bookingIcon from '../assets/calendar.png';
import carIcon from '../assets/car.png';
import profileIcon from '../assets/user.png';
import { Dashboard } from './screens/Dashboard';
import { Search } from './screens/Search';
import { Bookings } from './screens/Bookings';
import { MyCars } from './screens/MyCars';
import { useAuthStore } from '../store/authStore';
import { useEffect } from 'react';

// Auth check component
function AuthCheck() {
  const { isAuthenticated } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  }, [isAuthenticated, navigation]);

  return null;
}


// Auth Navigator
const AuthStack = createNativeStackNavigator({
  screens: {
    Welcome: {
      screen: Welcome,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      options: {
        title: 'Log In',
      },
    },
    Register: {
      screen: Register,
      options: {
        title: 'Create Account',
      },
    },
  },
});

const HomeTabs = createBottomTabNavigator({
  screens: {
    Dashboard: {
      screen: Dashboard,
      options: {
        title: 'Dashboard',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={homeIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Search: {
      screen: Search,
      options: {
        title: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={searchIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Bookings: {
      screen: Bookings,
      options: {
        title: 'Bookings',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bookingIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    MyCars: {
      screen: MyCars,
      options: {
        title: 'My Cars',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={carIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={profileIcon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Auth: {
      screen: AuthStack,
      options: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      options: {
        title: 'Log In',
      },
    },
    Register: {
      screen: Register,
      options: {
        title: 'Create Account',
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    CarDetails: {
      screen: CarDetails,
      options: {
        title: 'Car Details',
      },
    },
    BookingDetails: {
      screen: BookingDetails,
      options: {
        title: 'Booking Details',
      },
    },
    AddCar: {
      screen: AddCar,
      options: ({ navigation }) => ({
        title: 'Add New Car',
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Search: {
      screen: Search,
      options: {
        title: 'Search',
        headerRight: () => (
          <HeaderButton onPress={() => alert('Filter')}>
            <Text>Filter</Text>
          </HeaderButton>
        ),
      },
    },
    Bookings: {
      screen: Bookings,
      options: {
        title: 'My Bookings',
        headerRight: () => (
          <HeaderButton onPress={() => alert('Filter')}>
            <Text>Filter</Text>
          </HeaderButton>
        ),
      },
    },
    MyCars: {
      screen: MyCars,
      options: {
        title: 'My Cars',
        headerRight: () => (
          <HeaderButton onPress={() => alert('Add Car')}>
            <Text>Add Car</Text>
          </HeaderButton>
        ),
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
