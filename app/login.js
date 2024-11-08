import React from 'react';
import { Link } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={require('../assets/images/Slogo.png')} // Adjust the path to your logo
      />

      {/* Login Header */}
      <Text style={styles.headerText}>Login Account</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        placeholderTextColor="#C7C7CD"
      />
      
      {/* Password Input */}
      <TextInput
        style={[styles.input, styles.spacing]}
        placeholder="Password"
        secureTextEntry={true}
        placeholderTextColor="#C7C7CD"
      />

      {/* Forget Password */}
      <TouchableOpacity style={styles.forgetPasswordContainer}>
        <Text style={styles.forgetPasswordText}>Forget Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Sign Up Option */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an account?</Text>
        <Link href="/js_rec" asChild>
          <TouchableOpacity>
            <Text style={styles.signUpLink}> Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.08,  // 8% of screen width for padding
  },
  logo: {
    width: width * 0.4,  // 40% of screen width
    height: height * 0.1,  // 10% of screen height
    marginBottom: height * 0.1,  // 10% of screen height for margin
    resizeMode: 'contain',
    marginTop: -height * 0.15,  // 15% of screen height for margin
  },
  headerText: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: 'bold',
    marginBottom: height * 0.15,  // 15% of screen height for margin
    color: '#000000',
  },
  input: {
    width: width * 0.85,  // 85% of screen width
    height: height * 0.06,  // 6% of screen height
    backgroundColor: '#F0F5F5',
    borderRadius: 8,
    paddingHorizontal: width * 0.04,  // 4% of screen width for padding
    fontSize: width * 0.045,  // 4.5% of screen width for font size
    marginBottom: height * 0.02,  // 2% of screen height for margin
  },
  forgetPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: height * 0.04,  // 4% of screen height for margin
  },
  forgetPasswordText: {
    color: '#44A0D8',
    fontSize: width * 0.035,  // 3.5% of screen width for font size
  },
  loginButton: {
    width: width * 0.8,  // 80% of screen width
    height: height * 0.07,  // 7% of screen height
    backgroundColor: '#44A0D8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: height * 0.015,  // 1.5% of screen height for margin
    marginTop: height * 0.02,  // 2% of screen height for margin
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,  // 4.5% of screen width for font size
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: height * 0.02,  // 2% of screen height for margin
  },
  signUpText: {
    color: '#000000',
    fontSize: width * 0.035,  // 3.5% of screen width for font size
  },
  signUpLink: {
    color: '#44A0D8',
    fontSize: width * 0.035,  // 3.5% of screen width for font size
    fontWeight: 'bold',
    marginLeft: width * 0.01,  // 1% of screen width for margin
  },
  spacing: {
    marginTop: height * 0.02,  // 2% of screen height for margin
  },
});
