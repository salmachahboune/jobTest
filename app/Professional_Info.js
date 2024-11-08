import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Icon imports
import { Link } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function ProfessionalInfo() {
  const [photo, setPhoto] = useState(null);
  const [cv, setCv] = useState(null);
  const [currentStep, setCurrentStep] = useState(4);

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

  // Handle photo upload
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  // Handle CV upload
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true
    });

    if (result.type !== "cancel") {
      setCv(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/Job_preferences" asChild>
          <TouchableOpacity>
            <Icon name="arrow-back" size={width * 0.06} color="#000" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Professional Information</Text>
        <TouchableOpacity>
          <Text style={styles.saveButtonup}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step, index) => (
          <React.Fragment key={index}>
            <View style={getStepStyle(step)}>
              {step === 5 ? (
                <Icon name="flag" size={width * 0.06} color={currentStep >= 5 ? '#fff' : '#1E88E5'} />
              ) : (
                <Text style={getStepTextStyle(step)}>{step}</Text>
              )}
            </View>
            {step < 5 && <View style={styles.stepLine}></View>}
          </React.Fragment>
        ))}
      </View>

      <Text style={styles.Text}>Photo Upload</Text>
      {/* Photo Upload */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderContent}>
            <MaterialIcons name="photo-camera" size={width * 0.1} color="#1E90FF" />
            <Text style={styles.placeholderText}>Upload your photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.Text}>CV Upload</Text>
      {/* CV Upload */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
        {cv ? (
          <View style={styles.placeholderContent}>
            <MaterialIcons name="file-download" size={width * 0.1} color="#1E90FF" />
            <Text style={styles.placeholderText}>CV Uploaded</Text>
          </View>
        ) : (
          <View style={styles.placeholderContent}>
            <FontAwesome name="file-text-o" size={width * 0.1} color="#1E90FF" />
            <Text style={styles.placeholderText}>Browse files</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Save Button */}
    <Link href="/Congratulations" asChild>
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.02,
    marginBottom: height * 0.03,
  },
  headerTitle: {
    fontSize: width * 0.045, // Responsive font size
    fontWeight: 'bold',
  },
  saveButtonup: {
    color: '#1E88E5',
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  stepLine: {
    width: width * 0.08, // Responsive width
    height: 2,
    backgroundColor: '#1E88E5',
  },
  uploadBox: {
    height: height * 0.2,
    borderWidth: 1,
    borderColor: '#1E90FF',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
    borderStyle: 'dashed',
    marginTop: height * 0.03,
  },
  placeholderContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: height * 0.01,
    color: '#1E90FF',
    fontSize: width * 0.04,
  },
  imagePreview: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.025,
    resizeMode: 'cover',
  },
  saveButton: {
    backgroundColor: '#44A0D8',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.025,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.5,
    marginTop: height * 0.05,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  Text: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: height * -0.015,
    marginTop: height * 0.01,
  },
});
