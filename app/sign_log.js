import React from 'react';
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/Slogo.png")} style={styles.logo} />

      <Image source={require("../assets/images/welcome.png")} style={styles.welcomeImage} />

      <Text style={styles.welcomeText}>Welcome!</Text>
      
      <View style={styles.textContainer}>
        <Text style={styles.subtitleText}>
          Where your skills and abilities are matched with the best job opportunities. 
          Let’s make your career aspirations a reality.
        </Text>
      </View>
      
      <Link href="/js_rec" asChild>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.logInButton}>
          <Text style={styles.logInButtonText}>Log In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.05,  // 5% of screen width for horizontal padding
  },
  logo: {
    width: width * 0.4,  // 40% of screen width
    height: height * 0.1,  // 10% of screen height
    marginBottom: height * 0.05,  // 5% of screen height for margin
    resizeMode: 'contain',
    marginTop: -height * 0.1,  // 10% of screen height for margin
  },
  welcomeImage: {
    width: width * 0.8,  // 80% of screen width
    height: height * 0.25,  // 25% of screen height
    resizeMode: 'contain',
    marginBottom: height * 0.03,  // 3% of screen height for margin
  },
  welcomeText: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: height * 0.01,  // 1% of screen height for margin
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: width * 0.04,  // 4% of screen width
    color: '#666666',
    textAlign: 'center',
    marginBottom: height * 0.05,  // 5% of screen height for margin
    lineHeight: height * 0.035,  // 3.5% of screen height for line height
  },
  signUpButton: {
    backgroundColor: '#44A0D8',
    borderRadius: 8,
    paddingVertical: height * 0.015,  // 1.5% of screen height for vertical padding
    paddingHorizontal: width * 0.25,  // 25% of screen width for horizontal padding
    marginBottom: height * 0.02,  // 2% of screen height for margin
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,  // 4% of screen width for font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logInButton: {
    borderColor: '#44A0D8',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: height * 0.015,  // 1.5% of screen height for vertical padding
    paddingHorizontal: width * 0.25,  // 25% of screen width for horizontal padding
  },
  logInButtonText: {
    color: '#44A0D8',
    fontSize: width * 0.04,  // 4% of screen width for font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textContainer: {
    width: width * 0.9,  // 90% of screen width
  },
});
