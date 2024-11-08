import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');

const disibility_information = () => {
  const [date, setDate] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState('Physical');
  const [currentStep, setCurrentStep] = useState(2);

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/Personal_Info" asChild>
          <TouchableOpacity>
            <Icon name="arrow-back" size={width * 0.06} color="#000" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Disability Information</Text>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step, index) => (
          <React.Fragment key={index}>
            <View style={getStepStyle(step)}>
              {step === 5 ? (
                <Icon name="flag" size={width * 0.06} color={currentStep >= 4 ? '#fff' : '#1E88E5'} />
              ) : (
                <Text style={getStepTextStyle(step)}>{step}</Text>
              )}
            </View>
            {step < 5 && <View style={styles.stepLine}></View>}
          </React.Fragment>
        ))}
      </View>

      <Text style={styles.holders}>Type of Disability</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGender}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Physical" value="Physical" />
          <Picker.Item label="Sensory" value="Sensory" />
          <Picker.Item label="Intellectual" value="Intellectual" />
          <Picker.Item label="Learning" value="Learning" />
          <Picker.Item label="Neurodiversity" value="Neurodiversity" />
          <Picker.Item label="Invisible" value="Invisible" />
        </Picker>
      </View>

      <Text style={styles.holders}>Description of Disability</Text>
      <View style={styles.containerzone}>
        <TextInput
          style={styles.textArea}
          placeholder="Write your description here..."
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <Link href="/Job_preferences" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
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
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#F0EFF5',
    borderRadius: 11,
    marginBottom: height * 0.02,
    height: height * 0.06,
    width: width * 0.9,
    alignSelf: 'center',
  },
  picker: {
    height: height * 0.06,
    width: '100%',
  },
  containerzone: {
    height: height * 0.15,
    width: width * 0.9,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: width * 0.02,
    backgroundColor: '#F0EFF5',
    alignSelf: 'center',
    marginBottom: height * 0.04,
  },
  continueButton: {
    backgroundColor: '#44A0D8',
    borderRadius: 11,
    alignItems: 'center',
    paddingVertical: width * 0.03, // Responsive padding
   
    width: width * 0.5, // Responsive width
    alignSelf: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  holders: {
    fontSize: width * 0.05,
    marginBottom: height * 0.01,
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },
});

export default disibility_information;
