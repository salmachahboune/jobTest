import React, { useState, useRef, useEffect } from 'react';
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

const { width } = Dimensions.get('window');

const AccountSetup = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentStep, setCurrentStep] = useState(3);

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Link href="/Contact_Details" asChild>
            <TouchableOpacity>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.headerTitle}>Account Setup</Text>
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
          <Text style={styles.holders}>Administrator Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Administrator Name"
            placeholderTextColor="#A9A9A9"
            value={adminName}
            onChangeText={setAdminName}
          />

          <Text style={styles.holders}>Administrator Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Administrator Email"
            placeholderTextColor="#A9A9A9"
            value={adminEmail}
            onChangeText={setAdminEmail}
            keyboardType="email-address"
          />

          <Text style={styles.holders}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create Password"
            placeholderTextColor="#A9A9A9"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.holders}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#A9A9A9"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </Animated.View>
        <Link href="/congrats_R" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Submit</Text>
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
});

export default AccountSetup;
