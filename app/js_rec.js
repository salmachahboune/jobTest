import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.container}>
      <Link href="/sign_log" asChild>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={width * 0.09} color="#000" />
        </TouchableOpacity>
      </Link>
      <Image source={require('../assets/images/Slogo.png')} style={styles.logo} />
      <Text style={styles.title}>Continue as</Text>
      <Link href="/acc_setting" asChild>
        <TouchableOpacity style={styles.jobSeekerButton}>
          <View style={styles.optionContent}>
            <Text style={styles.jobSeekerTitle}>Job Seeker</Text>
            <Text style={styles.optionDescription}>
              Start your journey to an inclusive career with your unique talents
            </Text>
          </View>
          <Icon name="chevron-right" size={width * 0.1} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </Link>
    <Link href="/company_information" asChild>
      <TouchableOpacity style={styles.optionButton}>
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>Recruiter</Text>
          <Text style={styles.optionDescription}>
            Connect with diverse talents and build an inclusive workforce that drives success
          </Text>
        </View>
        <Icon name="chevron-right" size={width * 0.1} color="#000000" style={styles.icon} />
      </TouchableOpacity>
    </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04, // 4% of screen width for padding
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: height * 0.03, // 3% of screen height for margin
  },
  logo: {
    width: width * 0.7,  // 70% of screen width
    height: height * 0.18,  // 18% of screen height
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: height * 0.04,  // 4% of screen height for margin
  },
  title: {
    fontSize: width * 0.06,  // 6% of screen width
    fontWeight: "bold",
    marginBottom: height * 0.04,  // 4% of screen height for margin
  },
  optionButton: {
    backgroundColor: '#F5F5F5', // Change color as per your design
    padding: width * 0.04,  // 4% of screen width for padding
    borderRadius: 8,
    marginBottom: height * 0.02,  // 2% of screen height for margin
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginRight: width * 0.04, // 4% of screen width for margin
  },
  optionTitle: {
    fontSize: width * 0.05,  // 5% of screen width for font size
    color: '#000000',
    marginBottom: height * 0.01,  // 1% of screen height for margin
  },
  optionDescription: {
    fontSize: width * 0.035,  // 3.5% of screen width for font size
    color: '#A2A8AD',
    marginBottom: height * 0.03,  // 3% of screen height for margin
  },
  icon: {
    marginLeft: width * 0.1,  // 10% of screen width for margin
  },
  jobSeekerButton: {
    backgroundColor: '#07507D', // Blue color for Job Seeker
    padding: width * 0.04,  // 4% of screen width for padding
    borderRadius: 8,
    marginBottom: height * 0.02,  // 2% of screen height for margin
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobSeekerTitle: {
    fontSize: width * 0.05,  // 5% of screen width for font size
    color: '#FFF',
    marginBottom: height * 0.01,  // 1% of screen height for margin
  }
});

export default App;
