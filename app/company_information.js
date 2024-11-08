import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';



const { width } = Dimensions.get('window');

const CompanyInformation = () => {
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [industry, setIndustry] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState('small');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStepStyle = (step) => ({
    ...styles.step,
    backgroundColor: step <= currentStep ? '#1E88E5' : '#fff',
    borderColor: '#1E88E5',
    borderWidth: 1,
  });

  const getStepTextStyle = (step) => ({
    ...styles.stepText,
    color: step <= currentStep ? '#fff' : '#1E88E5',
  });

  const handleSizeChange = (itemValue) => {
    setSelectedSize(itemValue);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/js_rec.js" asChild>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Company Information</Text>
          <TouchableOpacity>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            ...styles.stepIndicator,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View style={getStepStyle(1)}>
            <Text style={getStepTextStyle(1)}>1</Text>
          </View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(2)}>
            <Text style={getStepTextStyle(2)}>2</Text>
          </View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(3)}>
            <Text style={getStepTextStyle(3)}>3</Text>
          </View>
        
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(4)}>
            <Icon
              name="flag"
              size={24}
              color={currentStep >= 4 ? '#fff' : '#1E88E5'}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text style={styles.holders}>Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            placeholderTextColor="#A9A9A9"
            value={companyName}
            onChangeText={setCompanyName}
          />

          <Text style={styles.holders}>Business Registration Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Registration Number"
            placeholderTextColor="#A9A9A9"
            value={businessNumber}
            onChangeText={setBusinessNumber}
          />

          <Text style={styles.holders}>Company Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., LLC, Corporation"
            placeholderTextColor="#A9A9A9"
            value={companyType}
            onChangeText={setCompanyType}
          />

          <Text style={styles.holders}>Industry</Text>
          <TextInput
            style={styles.input}
            placeholder="Industry"
            placeholderTextColor="#A9A9A9"
            value={industry}
            onChangeText={setIndustry}
          />

          <Text style={styles.holders}>Company Size</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSize}
              onValueChange={handleSizeChange}
              style={styles.picker}
            >
              <Picker.Item label="Micro-sized (less than 10 employees)" value="Micro-sized" />
              <Picker.Item label="Small-sized (10-49 employees)" value="medium" />
              <Picker.Item label="Medium ( 50-249 employees)" value="large" />
              <Picker.Item label="Large-sized (more than 250 employees)" value="large" />
            </Picker>
          </View>

          <Text style={styles.holders}>Date of Establishment</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            <Icon name="calendar-today" size={24} color="#000" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </Animated.View>

        <Link href="/Contact_Details" asChild>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};





const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: width * 0.04,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  saveButton: {
    color: '#1E88E5',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.04,
  },
  step: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontWeight: 'bold',
  },
  stepLine: {
    width: width * 0.08,
    height: 2,
    backgroundColor: '#1E88E5',
  },
  input: {
    marginLeft: width * 0.02,
    marginTop: 3,
    height: width * 0.1,
    width: width * 0.9,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.027,
    paddingHorizontal: width * 0.02,
    marginBottom: 16,
    backgroundColor: '#F0EFF5',
  },
  continueButton: {
    backgroundColor: '#44A0D8',
    borderRadius: width * 0.027,
    alignItems: 'center',
    paddingVertical: width * 0.03,
    height: width * 0.11,
    width: width * 0.54,
    alignSelf: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  holders: {
    fontSize: width * 0.045,
    marginBottom: 0,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#F0EFF5',
    borderRadius: width * 0.027,
    marginBottom: 16,
    height: width * 0.1,
    width: width * 0.9,
    marginLeft: width * 0.02,
    marginTop: 3,
  },
  picker: {
    height: 4,
    marginTop: -5,
    width: '100%',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.027,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#F0EFF5',
    marginBottom: 35,
    height: width * 0.1,
    width: width * 0.9,
    marginLeft: width * 0.02,
    marginTop: 3,
  },
  dateText: {
    fontSize: width * 0.04,
  },
});

export default CompanyInformation;
