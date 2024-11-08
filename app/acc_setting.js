import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { Switch as CustomSwitch } from 'react-native-switch';
const { width, height } = Dimensions.get('window');

export default function AccessibilitySettings() {
  const [isScreenReaderEnabled, setScreenReaderEnabled] = useState(true);
  const [isVoiceControlEnabled, setVoiceControlEnabled] = useState(false);

  const toggleScreenReader = () => setScreenReaderEnabled(previousState => !previousState);
  const toggleVoiceControl = () => setVoiceControlEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View>
        <Link href="/js_rec" asChild>
          <TouchableOpacity style={styles.headerContainer}>
            <Ionicons name="arrow-back" size={width * 0.08} color="black" />
            <Text style={styles.header}>Accessibility Settings</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.settingContainer}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingTitle}>Screen Reader</Text>
          <CustomSwitch
          value={isScreenReaderEnabled}
          onValueChange={setScreenReaderEnabled}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={23}  // Customize the switch size
          barHeight={25}
         
          circleBorderWidth={2}
          backgroundActive={'#007bff'}
          backgroundInactive={'#767577'}
          circleActiveColor={'#fff'}
          circleInActiveColor={'#fff'}
          changeValueImmediately={true}
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // Style for the switch circle
          switchLeftPx={2} // Padding for left position of the switch
          switchRightPx={2} // Padding for right position of the switch
          switchWidthMultiplier={2.8} // Increase this to make the switch bigger
          switchBorderRadius={30} // Border radius for rounded switches
        />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Enable this option to have text read aloud to you. This feature is useful for users
            with visual impairments or reading difficulties.
          </Text>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingTitle}>Voice Control</Text>
           <CustomSwitch
         onValueChange={toggleVoiceControl}
         value={isVoiceControlEnabled}
          disabled={false}
          activeText={'On'}
          inActiveText={'Off'}
          circleSize={23}  // Customize the switch size
          barHeight={25}
         
          circleBorderWidth={2}
          backgroundActive={'#007bff'}
          backgroundInactive={'#767577'}
          circleActiveColor={'#fff'}
          circleInActiveColor={'#fff'}
          changeValueImmediately={true}
          innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // Style for the switch circle
          switchLeftPx={2} // Padding for left position of the switch
          switchRightPx={2} // Padding for right position of the switch
          switchWidthMultiplier={2.8} // Increase this to make the switch bigger
          switchBorderRadius={30} // Border radius for rounded switches
        />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Enable this option to navigate and interact with the app using voice commands. This
            feature is helpful for users with mobility impairments or those who prefer hands-free
            interaction.
          </Text>
        </View>
      </View>

      <Link href="/Personal_Info" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06, // 6% of screen width for padding
    paddingTop: height * 0.06, // 6% of screen height for padding top
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.04, // 4% of screen height for margin bottom
  },
  header: {
    fontSize: width * 0.06, // 6% of screen width for font size
    fontWeight: 'bold',
    marginLeft: width * 0.025, // 2.5% of screen width for margin left
  },
  settingContainer: {
    marginBottom: height * 0.04, // 4% of screen height for margin bottom
    marginLeft: width * 0.05, // 5% of screen width for margin left
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.01, // 1% of screen height for margin bottom
  },
  settingTitle: {
    fontSize: width * 0.05, // 5% of screen width for font size
    fontWeight: '600',
  },
  description: {
    fontSize: width * 0.04, // 4% of screen width for font size
    color: '#6c757d',
    lineHeight: height * 0.03, // 3% of screen height for line height
    textAlign: 'justify',
  },
  switch: {
    transform: [{ scaleX: width * 0.002 }, { scaleY: width * 0.002 }], // Scale the switch based on screen width
  },
  continueButton: {
    backgroundColor: '#44A0D8',
    paddingVertical: height * 0.015, // 1.5% of screen height for padding vertical
    width: width * 0.4, // 40% of screen width for button width
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    alignSelf: 'flex-end',
    marginBottom: height * 0.1, // 10% of screen height for margin bottom
  },
  continueButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width for font size
    fontWeight: '600',
  },
  descriptionContainer: {
    width: width * 0.8, // 80% of screen width for description container width
  },
});


