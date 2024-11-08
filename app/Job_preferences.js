import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');

const JobPreferences = () => {
  const [jobTitles, setJobTitles] = useState(['Graphic Designer', 'Administrative Assistant', 'Online Tutor']);
  const [availability, setAvailability] = useState({
    fullTime: false,
    partTime: true,
    contract: false,
    internship: false,
    temporary: true,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');

  const toggleJobTitle = (title) => {
    setJobTitles(jobTitles.filter((jobTitle) => jobTitle !== title));
  };

  const toggleAvailability = (key) => {
    setAvailability({ ...availability, [key]: !availability[key] });
  };

  const addJobTitle = () => {
    if (newJobTitle.trim()) {
      setJobTitles([...jobTitles, newJobTitle.trim()]);
      setNewJobTitle('');
      setModalVisible(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(3);

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Link href="/Personal_Info" asChild>
          <TouchableOpacity>
            <Icon name="arrow-back" size={width * 0.06} color="#000" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Job Preferences</Text>
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

      <Text style={styles.holders}>Job Titles</Text>
      <View style={styles.jobTitlesContainer}>
        {jobTitles.map((title, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{title}</Text>
            <TouchableOpacity onPress={() => toggleJobTitle(title)}>
              <Text style={styles.removeIcon}>✖</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addText}>+ Add Title</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.holders}>Availability</Text>
      <View style={styles.availabilityContainer}>
        {['fullTime', 'partTime', 'contract', 'internship', 'temporary'].map((key, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.availabilityButton, availability[key] && styles.selected]}
            onPress={() => toggleAvailability(key)}
          >
            <Text style={[styles.availabilityText, availability[key] && styles.selectedText]}>
              {key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Link href="/Professional_Info" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Job Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter job title"
              value={newJobTitle}
              onChangeText={setNewJobTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={addJobTitle}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

     
    </ScrollView >
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
  holders: {
    fontSize: width * 0.05,
    marginBottom: height * 0.01,
    marginTop: height * 0.02,
    marginLeft: width * 0.05,
  },
  jobTitlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0056FF',
    padding: width * 0.03,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    marginBottom: height * 0.02,
  },
  tagText: {
    color: '#fff',
    marginRight: width * 0.02,
  },
  removeIcon: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#0056F0',
    padding: width * 0.03,
    borderRadius: width * 0.05,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#0056FF',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.02,
  },
  availabilityButton: {
    borderWidth: 1,
    borderColor: '#000',
    padding: width * 0.03,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
    marginBottom: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  availabilityText: {
    color: '#000',
  },
  selectedText: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#44A0D8',
    borderRadius: width * 0.04,
    alignItems: 'center',
    paddingVertical: width * 0.03, // Responsive padding
   
    width: width * 0.5, // Responsive width
    alignSelf: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    padding: width * 0.05,
    borderRadius: width * 0.05,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1, // Equal flex for both buttons
    paddingVertical: height * 0.015, // Consistent padding for both buttons
    backgroundColor: '#44A0D8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.02, // Add margin for spacing between buttons
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1, // Same flex as modalButton to ensure equal width
    paddingVertical: height * 0.015, // Consistent padding
    backgroundColor: '#6C7175',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.02, // Same margin as modalButton
  },
  cancelButtonText: {
    color: '#fff',
  },
});

export default JobPreferences;
