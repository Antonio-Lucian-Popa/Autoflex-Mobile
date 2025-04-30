import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Platform,
  Pressable
} from 'react-native';
import { useCarsStore } from '../store/carsStore';
import Colors from '../constants/colors';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FilterModal({ visible, onClose }: FilterModalProps) {
  const { filter, setFilter, applyFilters, clearFilters } = useCarsStore();
  
  const [localFilter, setLocalFilter] = useState({
    transmission: filter.transmission || null,
    fuelType: filter.fuelType || null,
    seats: filter.seats || null,
    priceRange: filter.priceRange || [0, 200],
    features: filter.features || [],
  });
  
  const transmissionOptions = ['Automatic', 'Manual'];
  const fuelTypeOptions = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const seatsOptions = [2, 4, 5, 7];
  const featuresOptions = [
    'Air Conditioning', 
    'Bluetooth', 
    'Cruise Control', 
    'Parking Sensors', 
    'Navigation', 
    'Leather Seats', 
    'Sunroof', 
    'Heated Seats'
  ];
  
  const handleApply = () => {
    setFilter(localFilter);
    applyFilters();
    onClose();
  };
  
  const handleClear = () => {
    setLocalFilter({
      transmission: null,
      fuelType: null,
      seats: null,
      priceRange: [0, 200],
      features: [],
    });
    clearFilters();
    onClose();
  };
  
  const toggleFeature = (feature: string) => {
    setLocalFilter(prev => {
      const features = prev.features || [];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter((f: string) => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Filters</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transmission</Text>
              <View style={styles.optionsRow}>
                {transmissionOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      localFilter.transmission === option && styles.selectedOption
                    ]}
                    onPress={() => setLocalFilter(prev => ({
                      ...prev,
                      transmission: prev.transmission === option ? null : option as any
                    }))}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        localFilter.transmission === option && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Fuel Type</Text>
              <View style={styles.optionsRow}>
                {fuelTypeOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      localFilter.fuelType === option && styles.selectedOption
                    ]}
                    onPress={() => setLocalFilter(prev => ({
                      ...prev,
                      fuelType: prev.fuelType === option ? null : option as any
                    }))}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        localFilter.fuelType === option && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Minimum Seats</Text>
              <View style={styles.optionsRow}>
                {seatsOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      localFilter.seats === option && styles.selectedOption
                    ]}
                    onPress={() => setLocalFilter(prev => ({
                      ...prev,
                      seats: prev.seats === option ? null : option
                    }))}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        localFilter.seats === option && styles.selectedOptionText
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Features</Text>
              <View style={styles.featuresGrid}>
                {featuresOptions.map(feature => (
                  <Pressable
                    key={feature}
                    style={styles.featureItem}
                    onPress={() => toggleFeature(feature)}
                  >
                    <View style={[
                      styles.checkbox,
                      localFilter.features?.includes(feature) && styles.checkboxSelected
                    ]}>
                      {localFilter.features?.includes(feature) && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: Colors.text,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    color: Colors.text,
    fontSize: 14,
  },
  selectedOptionText: {
    color: Colors.card,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: {
    color: Colors.card,
    fontSize: 14,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clearButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  applyButtonText: {
    color: Colors.card,
    fontSize: 14,
    fontWeight: '500',
  },
});