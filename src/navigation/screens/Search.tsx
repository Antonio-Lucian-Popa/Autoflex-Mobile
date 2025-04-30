import React, { useEffect, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  Text
} from 'react-native';

import Colors from '../../constants/colors';
import CarCard from '../../components/CarCard';
import SearchBar from '../../components/SearchBar';
import FilterModal from '../../components/FilterModal';
import { Car } from '../../types/index';
import { useCarsStore } from '../../store/carsStore';

export function Search() {
  const { filteredCars, fetchCars, isLoading } = useCarsStore();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  useEffect(() => {
    fetchCars();
  }, []);
  
  const renderCarItem = ({ item }: { item: Car }) => (
    <CarCard car={item} />
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No cars found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filters to find what you're looking for.
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <SearchBar onFilterPress={() => setFilterModalVisible(true)} />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyList}
        />
      )}
      
      <FilterModal 
        visible={filterModalVisible} 
        onClose={() => setFilterModalVisible(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});