import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const HeaderWithSteps = () => {
  const [currentStep, setCurrentStep] = useState(4);
  
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
    <View style={styles.container}>
      <View style={styles.header}></View>

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

      <Link href="/Activity_feed" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    paddingHorizontal: width * 0.04,
    paddingBottom: 20,
    backgroundColor: '#fff', // Ensure the background color is white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#1E88E5',
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
  continueButton: {
    backgroundColor: '#2196F3', // A more vibrant blue
    borderRadius: width * 0.027,
    alignItems: 'center',
    paddingVertical: width * 0.03,
    height: width * 0.11,
    width: width * 0.48,
    alignSelf: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default HeaderWithSteps;
