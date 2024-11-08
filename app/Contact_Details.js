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
import { Link } from 'expo-router';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const ContactDetails = () => {
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [currentStep, setCurrentStep] = useState(2);
  
//location 
 
const [countries, setCountries] = useState([]);
const [states, setStates] = useState([]);
const [cities, setCities] = useState([]);
const [selectedCountry, setSelectedCountry] = useState(null);
const [selectedState, setSelectedState] = useState(null);
const [selectedCity, setSelectedCity] = useState(null);


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

//////////////////location functions////////////////////////
const username = 'smia';  // Replace with your GeoNames username

// Fetch countries when component loads
useEffect(() => {
  axios.get(`http://api.geonames.org/countryInfoJSON?username=${username}`)
    .then(response => {
      if (response.data.geonames) {
        setCountries(response.data.geonames);  // Ensure 'geonames' is present
      }
    })
    .catch(error => console.error(error));
}, []);

// Fetch states (regions) when a country is selected
useEffect(() => {
  if (selectedCountry) {
    axios.get(`http://api.geonames.org/childrenJSON?geonameId=${selectedCountry}&username=${username}`)
      .then(response => {
        if (response.data.geonames) {
          setStates(response.data.geonames);  // Ensure 'geonames' is present
        }
        setCities([]); // Reset cities when country changes
        setSelectedState(null); // Reset selected state when country changes
      })
      .catch(error => console.error(error));
  }
}, [selectedCountry]);

// Fetch cities when a state (region) is selected
useEffect(() => {
  if (selectedState) {
    axios.get(`http://api.geonames.org/childrenJSON?geonameId=${selectedState}&username=${username}`)
      .then(response => {
        if (response.data.geonames) {
          setCities(response.data.geonames);  // Ensure 'geonames' is present
        }
        setSelectedCity(null); // Reset selected city when state changes
      })
      .catch(error => console.error(error));
  }
}, [selectedState]);


///////////////////////////////////////////////////////////

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/company_information" asChild>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Contact Details</Text>
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
          <Text style={styles.holders}>Company Address</Text>
         
            {/**pickers location */}
   
           {/* Country Picker */}
{/* Country Picker */}
<Text style={styles.miniholders}>Select Country</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCountry}
          onValueChange={(itemValue) => setSelectedCountry(itemValue)}
        >
          <Picker.Item label="Select a country" value={null} />
          {countries && countries.length > 0 && countries.map(country => (
            <Picker.Item key={country.geonameId} label={country.countryName} value={country.geonameId} />
          ))}
        </Picker>
      </View>

      {/* State Picker */}
      <Text style={styles.miniholders}>Select State</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => setSelectedState(itemValue)}
          enabled={!!selectedCountry}
        >
          <Picker.Item label="Select a state" value={null} />
          {states && states.length > 0 && states.map(state => (
            <Picker.Item key={state.geonameId} label={state.name} value={state.geonameId} />
          ))}
        </Picker>
      </View>

      {/* City Picker */}
      <Text style={styles.miniholders}>Select City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          enabled={!!selectedState}
        >
          <Picker.Item label="Select a city" value={null} />
          {cities && cities.length > 0 && cities.map(city => (
            <Picker.Item key={city.geonameId} label={city.name} value={city.geonameId} />
          ))}
        </Picker>

</View>

    <Text style={styles.miniholders}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            placeholderTextColor="#A9A9A9"
            value={postalCode}
            onChangeText={setPostalCode}
          />

          <Text style={styles.holders}>Official Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#A9A9A9"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.holders}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#A9A9A9"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <Text style={styles.holders}>Website URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Website URL"
            placeholderTextColor="#A9A9A9"
            value={website}
            onChangeText={setWebsite}
            keyboardType="url"
          />
        </Animated.View>

        <Link href="/account_setup" asChild>
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
    fontSize: width * 0.047,
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
  pickerContainer: {
    height: width * 0.1,
    width: width * 0.9,
   justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: width * 0.027,
    overflow: 'hidden',
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
    fontSize: width * 0.049,
    marginBottom: 7,
  },
  miniholders:{
    fontSize: width * 0.045,
    marginBottom: 7,
    marginLeft:10,
  },
});

export default ContactDetails;
