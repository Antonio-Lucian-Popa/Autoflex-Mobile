// import { Button, Text } from '@react-navigation/elements';
// import { StyleSheet, View } from 'react-native';

// export function Home() {
//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <Text>Open up 'src/App.tsx' to start working on your app!</Text>
//       <Button screen="Profile" params={{ user: 'jane' }}>
//         Go to Profile
//       </Button>
//       <Button screen="Settings">Go to Settings</Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 10,
//   },
// });

import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';

type Role = 'OWNER' | 'CLIENT';

type Car = {
  id: number;
  model: string;
  status: 'available' | 'rented';
  image: string;
};

export function Home() {
  const [userName, setUserName] = useState('Antonio');
  const [userRole, setUserRole] = useState<Role>('OWNER'); // sau 'CLIENT'
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (userRole === 'OWNER') {
      setCars([
        {
          id: 1,
          model: 'BMW X5',
          status: 'rented',
          image:
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: 2,
          model: 'Tesla Model 3',
          status: 'available',
          image:
            'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ]);
    } else {
      setCars([
        {
          id: 3,
          model: 'Dacia Logan',
          status: 'rented',
          image:
            'https://images.unsplash.com/photo-1563720220083-dbd16f67d5b7?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 4,
          model: 'Opel Astra',
          status: 'rented',
          image:
            'https://images.unsplash.com/photo-1583267749390-1f96e0e30284?auto=format&fit=crop&w=800&q=80',
        },
      ]);
    }
  }, [userRole]);

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>🚘 No cars available yet!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Welcome, {userName}</Text>
      <Text style={styles.subtitle}>
        {userRole === 'OWNER' ? 'Your owned cars' : 'Your rented cars'}
      </Text>

      <FlatList
        data={cars}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.model}>{item.model}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: item.status === 'available' ? 'green' : 'tomato',
                  },
                ]}
              >
                {item.status === 'rented' ? 'Currently rented' : 'Available'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 16, marginBottom: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 80,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  model: { fontSize: 18, fontWeight: 'bold' },
  status: { fontSize: 14, marginTop: 4 },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});
