import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Link } from "expo-router";

const { width } = Dimensions.get('window');

const Personal_information = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState('male');
  const [currentStep, setCurrentStep] = useState(1);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const getStepStyle = (step) => {
    return {
      ...styles.step,
      backgroundColor: step <= currentStep ? '#1E88E5' : '#fff',
      borderColor: '#1E88E5',
      borderWidth: 1,
    };
  };

  const getStepTextStyle = (step) => {
    return {
      ...styles.stepText,
      color: step <= currentStep ? '#fff' : '#1E88E5',
    };
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/acc_setting" asChild>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <TouchableOpacity>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepIndicator}>
          <View style={getStepStyle(1)}><Text style={getStepTextStyle(1)}>1</Text></View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(2)}><Text style={getStepTextStyle(2)}>2</Text></View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(3)}><Text style={getStepTextStyle(3)}>3</Text></View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(4)}><Text style={getStepTextStyle(4)}>4</Text></View>
          <View style={styles.stepLine}></View>
          <View style={getStepStyle(4)}><Icon name="flag" size={24} color={currentStep >= 4 ? '#fff' : '#1E88E5'} /></View>
        </View>

        <Text style={styles.holders}>First Name</Text>
        <TextInput style={styles.input} placeholder="First Name" />
        <Text style={styles.holders}>Last Name</Text>
        <TextInput style={styles.input} placeholder="Last Name" />
        <Text style={styles.holders}>Email</Text>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <Text style={styles.holders}>Phone</Text>
        <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" />
        <Text style={styles.holders}>Gender</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <Text style={styles.holders}>Date of Birth</Text>
        <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
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

        <Link href="/Disability_Info" asChild>
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
    flexGrow: 1, // Ensure ScrollView content is scrollable
    paddingHorizontal: width * 0.04, // Responsive padding
    paddingBottom: 20, // Add padding at the bottom to prevent cut-off
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
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
  },
  saveButton: {
    color: '#1E88E5',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.04, // Responsive margin
  },
  step: {
    width: width * 0.1, // Responsive width
    height: width * 0.1, // Responsive height
    borderRadius: width * 0.025, // Responsive border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontWeight: 'bold',
  },
  stepLine: {
    width: width * 0.08, // Responsive width
    height: 2,
    backgroundColor: '#1E88E5',
  },
  input: {
    marginLeft: width * 0.02, // Responsive margin
    marginTop: 3,
    height: width * 0.1, // Responsive height
    width: width * 0.9, // Responsive width
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.027, // Responsive border radius
    paddingHorizontal: width * 0.02, // Responsive padding
    marginBottom: 16,
    backgroundColor: '#F0EFF5',
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#F0EFF5',
    borderRadius: width * 0.027, // Responsive border radius
    marginBottom: 16,
    height: width * 0.1, // Responsive height
    width: width * 0.9, // Responsive width
    marginLeft: width * 0.02, // Responsive margin
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
    borderRadius: width * 0.027, // Responsive border radius
    paddingHorizontal: width * 0.02, // Responsive padding
    backgroundColor: '#F0EFF5',
    marginBottom: 35,
    height: width * 0.1, // Responsive height
    width: width * 0.9, // Responsive width
    marginLeft: width * 0.02, // Responsive margin
    marginTop: 3,
  },
  dateText: {
    fontSize: width * 0.04, // Responsive font size
  },
  continueButton: {
    justifyContent: 'center',
    backgroundColor: '#44A0D8',
    borderRadius: width * 0.027, // Responsive border radius
    alignItems: 'center',
    paddingVertical: width * 0.03, // Responsive padding
   
    width: width * 0.5, // Responsive width
    alignSelf: 'center', // Center the button
    marginBottom: 20, // Additional margin for scrolling
   
  },
  continueButtonText: {
    
    color: '#fff',
    fontSize: width * 0.04, // Responsive font size
    fontWeight: 'bold',
  },
  holders: {
    fontSize: width * 0.045, // Responsive font size
    marginBottom: 0,
  },
});

export default Personal_information;
