import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../../constants/colors';
import Button from '../../components/Button';
import carIcon from '../../assets/car.png';
import mapPinIcon from '../../assets/map-pin.png';
import dollarIcon from '../../assets/dollar.png';
import imageIcon from '../../assets/image.png';
import plusIcon from '../../assets/plus.png';
import checkIcon from '../../assets/check.png';
import { useAuthStore } from '../../store/authStore';

export function AddCar() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    location: '',
    transmission: '',
    fuelType: '',
    seats: '',
    description: '',
    features: [] as string[],
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const transmissionOptions = ['Automatic', 'Manual'];
  const fuelTypeOptions = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const seatsOptions = ['2', '4', '5', '7'];
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
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const toggleFeature = (feature: string) => {
    setFormData(prev => {
      const features = [...prev.features];
      if (features.includes(feature)) {
        return { ...prev, features: features.filter(f => f !== feature) };
      } else {
        return { ...prev, features: [...features, feature] };
      }
    });
  };
  
  const handleSubmit = () => {
    // Validate form
    if (!formData.make || !formData.model || !formData.year || !formData.price || 
        !formData.location || !formData.transmission || !formData.fuelType || !formData.seats) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      Alert.alert(
        'Car Added',
        'Your car has been successfully added.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyCars'),
          },
        ]
      );
      setIsLoading(false);
    }, 1000);
  };
  
  if (user?.userType !== 'OWNER') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Access Denied</Text>
        <Text style={styles.errorMessage}>
          Only car owners can add new cars. Please switch to an owner account.
        </Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          style={styles.errorButton}
        />
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Information</Text>
          
          <View style={styles.inputContainer}>
            <Image source={carIcon} style={styles.inputIcon} tintColor={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Make (e.g. Toyota, BMW)"
              placeholderTextColor={Colors.textSecondary}
              value={formData.make}
              onChangeText={(value) => handleInputChange('make', value)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image source={carIcon} style={styles.inputIcon} tintColor={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Model (e.g. Corolla, 3 Series)"
              placeholderTextColor={Colors.textSecondary}
              value={formData.model}
              onChangeText={(value) => handleInputChange('model', value)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image source={carIcon} style={styles.inputIcon} tintColor={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Year (e.g. 2022)"
              placeholderTextColor={Colors.textSecondary}
              value={formData.year}
              onChangeText={(value) => handleInputChange('year', value)}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image source={mapPinIcon} style={styles.inputIcon} tintColor={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Location (e.g. Bucharest)"
              placeholderTextColor={Colors.textSecondary}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Image source={dollarIcon} style={styles.inputIcon} tintColor={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Daily Price (e.g. 50)"
              placeholderTextColor={Colors.textSecondary}
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Specifications</Text>
          
          <Text style={styles.label}>Transmission</Text>
          <View style={styles.optionsRow}>
            {transmissionOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData.transmission === option && styles.selectedOption
                ]}
                onPress={() => handleInputChange('transmission', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    formData.transmission === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>Fuel Type</Text>
          <View style={styles.optionsRow}>
            {fuelTypeOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData.fuelType === option && styles.selectedOption
                ]}
                onPress={() => handleInputChange('fuelType', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    formData.fuelType === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.label}>Number of Seats</Text>
          <View style={styles.optionsRow}>
            {seatsOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData.seats === option && styles.selectedOption
                ]}
                onPress={() => handleInputChange('seats', option)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    formData.seats === option && styles.selectedOptionText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Features</Text>
          <Text style={styles.subtitle}>Select all that apply</Text>
          
          <View style={styles.featuresGrid}>
            {featuresOptions.map(feature => (
              <TouchableOpacity
                key={feature}
                style={styles.featureItem}
                onPress={() => toggleFeature(feature)}
              >
                <View style={[
                  styles.checkbox,
                  formData.features.includes(feature) && styles.checkboxSelected
                ]}>
                  {formData.features.includes(feature) && (
                    <Image source={checkIcon} style={styles.checkIcon} tintColor={Colors.card} />
                  )}
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your car, its condition, and any special features..."
              placeholderTextColor={Colors.textSecondary}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Photos</Text>
          <Text style={styles.subtitle}>Add at least one photo of your car</Text>
          
          <TouchableOpacity style={styles.photoUploadButton}>
            <Image source={imageIcon} style={styles.uploadIcon} tintColor={Colors.primary} />
            <Text style={styles.photoUploadText}>Upload Photos</Text>
          </TouchableOpacity>
        </View>
        
        <Button
          title="Add Car"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.submitButton}
          fullWidth
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    height: 56,
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
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 8,
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
    marginBottom: 16,
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
  checkIcon: {
    width: 14,
    height: 14,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text,
  },
  textAreaContainer: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
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
  textArea: {
    minHeight: 100,
    color: Colors.text,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  photoUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    padding: 24,
  },
  uploadIcon: {
    width: 24,
    height: 24,
  },
  photoUploadText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    width: 200,
  },
});