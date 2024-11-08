import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { Link } from 'expo-router';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handlePressIn = (button) => {
    setHoveredButton(button);
  };

  const handlePressOut = () => {
    setHoveredButton(null);
  };

  const getButtonStyle = (button) => ({
    ...styles.button,
    backgroundColor: hoveredButton === button ? '#0D47A1' : button === 'profile' ? '#3981AD' : '#F1F1F1',
  });

  const getTextStyle = (button) => ({
    ...styles.buttonText,
    color: button === 'profile' ? '#FFFFFF' : '#000000',
  });

  const buttonIcons = {
    profile: require('../assets/images/profile_icon.png'),
    jobs: require('../assets/images/job_icon.png'),
    activity: require('../assets/images/activity_icon.png'),
    settings: require('../assets/images/settings_icon.png'),
  };

  const getIconStyle = (button) => {
    switch (button) {
      case 'jobs':
        return styles.jobsIcon;
      case 'activity':
        return styles.smallIcon;
      case 'settings':
        return styles.smallIcon;
      default:
        return styles.defaultIcon;
    }
  };

  const buttonLinks = {
    profile: '/profile',
    jobs: '/jobs',
    activity: '/activity',
    settings: '/settings',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Hi Amina!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs and connections..."
        />
        <Image
          source={require('../assets/images/search_icon.png')}
          style={styles.searchIcon}
        />
      </View>

      <View style={styles.welcomeBanner}>
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subText}>Let's embark on your journey to inclusive career success</Text>
        </View>
        <Image
          source={require('../assets/images/home.png')}
          style={styles.welcomeImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonGrid}>
        {Object.keys(buttonIcons).map((button) => (
       <Link key={button} href={buttonLinks[button]} asChild>
        <TouchableOpacity
            key={button}
            style={getButtonStyle(button)}
            onPressIn={() => handlePressIn(button)}
            onPressOut={handlePressOut}
          >
            <Image source={buttonIcons[button]} style={getIconStyle(button)} resizeMode="contain" />
            <Text style={getTextStyle(button)}>
              {button.charAt(0).toUpperCase() + button.slice(1).replace('_', ' ')}
            </Text>
          </TouchableOpacity>
          </Link> 

        ))}
      </View>

      <View style={styles.bottomNavContainer}>
        <View style={styles.notificationSection}>
        <Link href="/notifications" asChild>  
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/notification_icon.png')} style={styles.navIcon} resizeMode="contain" />
            <Text style={styles.navText}>Notifications</Text>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </Link>
        </View>

        <View style={styles.messageSection}>
        <Link href="/messages" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/messages_icon.png')} style={styles.navIcon} resizeMode="contain" />
            <Text style={styles.navTextMessages}>Messages</Text>
            <View style={styles.messageBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </Link>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  greetingText: {
    paddingTop: 40,
    fontSize: width * 0.075,
    fontWeight: 'bold',
    color: '#28678E',
  },
  searchContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#EDEDED',
    borderRadius: width * 0.04,
    padding: width * 0.03,
    fontSize: width * 0.04,
    paddingRight: width * 0.12,
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    right: width * 0.06,
    top: height * 0.02,
    width: width * 0.05,
    height: height * 0.03,
  },
  welcomeBanner: {
    backgroundColor: '#fff',
    borderRadius: width * 0.07,
    padding: width * 0.04,
    marginBottom: height * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000000',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#28678E',
    marginBottom: 10,
    marginTop: 10,
  },
  subText: {
    fontSize: width * 0.04,
    color: '#6B6B6B',
    marginBottom: 7,
  },
  welcomeImage: {
    width: width * 0.29,
    height: height * 0.1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: width * 0.39,
    height: height * 0.18,
    borderRadius: width * 0.05,
    marginHorizontal: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  defaultIcon: {
    width: width * 0.2,
    height: height * 0.1,
    marginBottom: height * 0.01,
  },
  jobsIcon: {
    width: width * 0.27,
    height: height * 0.1,
    marginBottom: height * 0.01,
  },
  smallIcon: {
    width: width * 0.14,
    height: height * 0.09,
    marginBottom: height * 0.01,
  },
  buttonText: {
    fontSize: width * 0.045,
    color: '#000',
    textAlign: 'center',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.08,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
  },
  notificationSection: {
    flex: 1,
    backgroundColor: '#0D3666',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ skewX: '-20deg' }],
  },
  messageSection: {
    flex: 1,
    backgroundColor: '#F5F4F7',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ skewX: '20deg' }],
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transform: [{ skewX: '20deg' }],
  },
  navText: {
    fontSize: width * 0.04,
    color: '#fff',
  },
  navTextMessages: {
    fontSize: width * 0.04,
    color: '#000',
  },
  navIcon: {
    width: width * 0.06,
    height: height * 0.03,
    marginBottom: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: height * -0.006,   // Move the badge closer to the icon vertically
    right: width * 0.07, // Move the badge closer to the icon horizontally
    backgroundColor: 'red',
    borderRadius: width * 0.03,
    padding: 2,
    paddingHorizontal:4,
    paddingVertical:-1,
  },
  messageBadge: {
    position: 'absolute',
    top: height * -0.007,   // Move the badge closer to the icon vertically
    right: width * 0.03,  // Move the badge closer to the icon horizontally
    backgroundColor: 'red',
    borderRadius: width * 0.03,
    padding: 2,
    paddingHorizontal: 5,
    paddingVertical:-1,
  },
  badgeText: {
    color: '#fff',
    fontSize: width * 0.03,
  },
});
