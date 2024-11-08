import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
const { width, height } = Dimensions.get('window');
import { Link } from 'expo-router';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [country, setCountry] = useState('Morocco');
  const [city, setCity] = useState('Casablanca');
  const [firstName, setFirstName] = useState('Amina');
  const [lastName, setLastName] = useState('El Mansouri');
  const [email, setEmail] = useState('amina.elmansouri@example.com');
  const [phone, setPhone] = useState('+212 6 12 34 56 78');
  const [gender, setGender] = useState('Female');
  const [dateOfBirth, setDateOfBirth] = useState(new Date(1999, 5, 21));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [disabilityType, setDisabilityType] = useState('intellectual');
  const [disabilityDescription, setDisabilityDescription] = useState('');
    // New state for job preferences
    const [jobTitles, setJobTitles] = useState(['Graphic Designer']);
    const [availability, setAvailability] = useState(['Full Time', 'Contract']);
    const [cvFile, setCvFile] = useState(null);
  
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
   
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');

  const addJobTitle = () => {
    if (newJobTitle.trim()) {
      setJobTitles([...jobTitles, newJobTitle]);
      setNewJobTitle('');
      setModalVisible(false);
    }
  };

  const removeJobTitle = (title) => {
    setJobTitles(jobTitles.filter((t) => t !== title));
  };


  const selectCV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*', // You can specify the file types you want to allow
        copyToCacheDirectory: true,
        multiple: false,
      });
  
      if (result.type === 'success') {
        setCvFile(result); // Save the selected CV file details to state
        console.log('Selected CV:', result);
      } else {
        console.log('Document selection was canceled.');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };
  const toggleAvailability = (option) => {
    if (availability.includes(option)) {
      setAvailability(availability.filter(item => item !== option));
    } else {
      setAvailability([...availability, option]);
    }
  };

  const renderInputField = (label, placeholder, value, onChangeText, keyboardType = 'default', multiline = false) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.textArea]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor="#888"
      />
    </View>
  );
   
  const renderPickerField = (label, selectedValue, onValueChange, items) => (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
        dropdownIconColor="#444"
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.value} />
        ))}
      </Picker>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../assets/images/bgProfile.png')}
        style={styles.headerBackground}
      />
      <View style={styles.curve}>
        <View style={styles.profileSection}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/images/profilepic.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity onPress={selectImage}>
            <Text style={styles.changePictureText}>Change Picture</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        {renderInputField(
          'Caption',
          'Add a caption',
          caption,
          setCaption,
          'default',
          true
        )}

        <View style={styles.inlineFieldslocation}>
          {renderPickerField(
            'Country',
            country,
            setCountry,
            [
              { label: 'Morocco', value: 'Morocco' },
              { label: 'France', value: 'France' },
              { label: 'United States', value: 'United States' },
              // Add more countries as needed
            ]
          )}
          {renderPickerField(
            'City',
            city,
            setCity,
            [
              { label: 'Casablanca', value: 'Casablanca' },
              { label: 'Rabat', value: 'Rabat' },
              { label: 'Marrakech', value: 'Marrakech' },
              // Add more cities as needed
            ]
          )}
        </View>

        {renderInputField(
          'First Name',
          'First Name',
          firstName,
          setFirstName
        )}
        {renderInputField(
          'Last Name',
          'Last Name',
          lastName,
          setLastName
        )}

        {renderInputField(
          'Email',
          'Email',
          email,
          setEmail,
          'email-address'
        )}

        {renderInputField(
          'Phone',
          'Phone',
          phone,
          setPhone,
          'phone-pad'
        )}

        {renderPickerField(
          'Gender',
          gender,
          setGender,
          [
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' },
         
          ]
        )}

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar" size={24} color="#444" />
              <Text style={styles.dateText}>
                {dateOfBirth.toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        {renderPickerField(
          'Type of Disability',
          disabilityType,
          setDisabilityType,
          [
            { label: 'Intellectual', value: 'intellectual' },
            { label: 'Physical', value: 'physical' },
            { label: 'Sensory', value: 'sensory' },
            { label: 'Mental Health', value: 'mental_health' },
          ]
        )}

        {renderInputField(
          'Description of Disability',
          'Description of Disability',
          disabilityDescription,
          setDisabilityDescription,
          'default',
          true
        )}
      </View>


      {/**job preferences */}
      <View style={styles.jobPreferencesSection}>
          <Text style={styles.sectionTitle}>Job Preferences</Text>

          {/* Job Titles */}
          <View style={styles.jobTitlesWrapper}>
            <Text style={styles.subSectionTitle}>Job Titles</Text>
            <View style={styles.jobTitlesContainer}>
              {jobTitles.map((title, index) => (
                <View style={styles.jobTitle} key={index}>
                  <Text style={styles.jobTitleText}>{title}</Text>
                  <TouchableOpacity onPress={() => {
                    setJobTitles(jobTitles.filter((_, i) => i !== index));
                  }}>
                    <Text style={styles.removeTitle}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
               <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
                <Text style={styles.addTitleText}>+ Add title</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Job Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter job title"
              value={newJobTitle}
              onChangeText={setNewJobTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonAdd}
                onPress={addJobTitle}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

          {/* Availability */}
          <View style={styles.availabilityWrapper}>
            <Text style={styles.subSectionTitle}>Availability</Text>
            <View style={styles.availabilityContainer}>
              {['Full Time', 'Part-time', 'Contract', 'Internship', 'Temporary'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.availabilityOption,
                    availability.includes(option) && styles.selectedOption,
                  ]}
                  onPress={() => toggleAvailability(option)}
                >
                  <Text
                    style={[
                      styles.availabilityText,
                      availability.includes(option) && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* CV Upload */}
          <View style={styles.cvUploadWrapper}>
            <Text style={styles.subSectionTitle}>CV Upload</Text>
            <TouchableOpacity
              style={styles.cvUploadContainer}
              onPress={selectCV}
            >
              <FontAwesome5 name="file-upload" size={24} color="#444" />
              <Text style={styles.cvUploadText}>
                {cvFile ? 'CV Uploaded' : 'Upload your CV'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Update Button */}
          <Link href="/profile" asChild>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
          </Link>
        </View>
   
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    height: height * 0.2, // Responsive height
    justifyContent: 'center',
    alignItems: 'center',
  },
  curve: {
    backgroundColor: '#fff',
    height: height * 0.08,
    width: '100%',
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    marginTop: -(height * 0.04),
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -(height * 0.1),
  },
  profileImage: {
    width: width * 0.3, // Responsive width and height
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2, // Make it circular
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: height * 0.01,
  },
  changePictureText: {
    color: '#44A0D8',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  form: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.08,
  },
  inputWrapper: {
    marginBottom: height * 0.04,
  },
  inputLabel: {
    fontSize: width * 0.04,
    color: '#444',
    marginBottom: height * 0.005,
    fontWeight: '600',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.025,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    color: '#444',
    backgroundColor: '#F5F5F5',
  },
  textArea: {
    height: height * 0.12,
    textAlignVertical: 'top',
  },
  picker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.025,
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    color: '#444',
    backgroundColor: '#F5F5F5',
  },
  inlineFieldslocation: {
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: width * 0.025,
    height: height * 0.06,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    marginLeft: width * 0.03,
    fontSize: width * 0.04,
    color: '#444',
  },
  jobPreferencesSection: {
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.025,
    backgroundColor: '#fff',
    borderRadius: width * 0.025,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: -(height * 0.1),
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: height * 0.02,
  },
  subSectionTitle: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#333',
    marginBottom: height * 0.015,
  },
  jobTitlesWrapper: {
    marginBottom: height * 0.04,
  },
  jobTitlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  jobTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0025ff',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    marginRight: width * 0.03,
    marginBottom: height * 0.015,
  },
  jobTitleText: {
    fontSize: width * 0.035,
    color: '#fff',
    marginRight: width * 0.02,
  },
  removeTitle: {
    fontSize: width * 0.035,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#0025ff',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
  },
  addTitleText: {
    fontSize: width * 0.035,
    color: '#0025ff',
  },
  availabilityWrapper: {
    marginBottom: height * 0.04,
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availabilityOption: {
    borderWidth: 1,
    borderColor: '#0025ff',
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
    marginRight: width * 0.03,
    marginBottom: height * 0.015,
  },
  availabilityText: {
    fontSize: width * 0.035,
    color: '#0025ff',
  },
  selectedOption: {
    backgroundColor: '#0025ff',
  },
  selectedOptionText: {
    color: '#fff',
  },
  cvUploadWrapper: {
    marginBottom: height * 0.04,
  },
  cvUploadContainer: {
    borderWidth: 1,
    borderColor: '#0025ff',
    borderRadius: width * 0.025,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.03,
    borderStyle: 'dashed',
  },
  cvUploadText: {
    marginTop: height * 0.01,
    fontSize: width * 0.04,
    color: '#0025ff',
  },
  updateButton: {
    backgroundColor: '#44A0D8',
    borderRadius: width * 0.03, // Reduced the border radius for a smaller curve
    paddingVertical: height * 0.015, // Decreased vertical padding to make the button smaller
    paddingHorizontal: width * 0.1, // Add horizontal padding to control the width of the button
    alignItems: 'center',
    marginBottom: height * 0.02, // Reduced bottom margin
    alignSelf: 'center', // Center the button horizontally
  },
  updateButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContainer: {
    width: width * 0.8, // Responsive width
    backgroundColor: '#fff',
    borderRadius: width * 0.025,
    padding: width * 0.05,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: height * 0.03,
    color: '#444',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.02,
    padding: width * 0.03,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
    backgroundColor: '#F0EFF5',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonCancel: {
    flex: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#6C7175',
    borderRadius: width * 0.02,
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  modalButtonAdd: {
    flex: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#44A0D8',
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});



export default ProfileScreen;
