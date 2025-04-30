import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  Image
} from 'react-native';
import { useCarsStore } from '../store/carsStore';
import Colors from '../constants/colors';
import searchIcon from '../../assets/search.png';
import filterIcon from '../../assets/filter.png';

interface SearchBarProps {
  onFilterPress: () => void;
}

export default function SearchBar({ onFilterPress }: SearchBarProps) {
  const { filter, setFilter, applyFilters } = useCarsStore();
  const [searchText, setSearchText] = useState(filter.location || '');
  
  const handleSearch = () => {
    setFilter({ location: searchText });
    applyFilters();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image 
          source={searchIcon} 
          style={styles.searchIcon} 
          tintColor={Colors.textSecondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by location..."
          placeholderTextColor={Colors.textSecondary}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Image 
          source={filterIcon} 
          style={styles.filterIcon} 
          tintColor={Colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    }),
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.text,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: Colors.card,
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: Colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    }),
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
});