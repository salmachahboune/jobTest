import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,   Animated, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');

export default function RegistrationComplete() {

  const [currentStep, setCurrentStep] = useState(5);

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

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const lottieAnimRef = useRef(null);

  useEffect(() => {
    // Start the Lottie animation
    lottieAnimRef.current?.play();

    // Start the text and step animations
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href="/Professional_Info" asChild>
          <TouchableOpacity>
            <Icon name="arrow-back" size={width * 0.06} color="#000" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Registration Complete</Text>
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

      <LottieView
        ref={lottieAnimRef}
        source={require('../assets/animations/congrate.json')} // Path to the downloaded Lottie file
        style={styles.lottie}
        loop={true}
        autoPlay={true}
      />

      <Text style={styles.motivationalText}>
        "Congratulations! You’re now ready to explore JobBridge
  
      </Text>

      {/* Continue Button */}
    <Link href="/home" asChild>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </Link >
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
        fontSize: width * 0.047, // Responsive font size
        fontWeight: 'bold',
        position: 'absolute', // Position the title absolutely
        left: '50%', // Center horizontally
         transform: [{ translateX: -width * 0.25 }, { translateY: height * 0.008 }],
      
        
      },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.03, // Responsive margin
    marginTop: height * 0.02, // Positioned higher on the screen
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
  
  lottie: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  motivationalText: {
    fontSize: width * 0.055,
    fontWeight: '600', // Increase the font weight for better emphasis
    textAlign: 'center',
    color: '#007ACC', // A slightly darker blue for better readability
    marginBottom: 70,
  },
  continueButton: {
    backgroundColor: '#44A0D8',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.025,
    alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
