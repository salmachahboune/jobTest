import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from 'expo-router';

export default function HomeScreen() 
{

const router = useRouter();

  useEffect(() => 
  {
    const timer = setTimeout(() => 
    {
      router.push('/welcome'); // Navigate to Details screen after 4 seconds
      //router.push('/test'); 
    }, 4000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")} // Replace with your logo file path
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: width * 0.8,  // Adjust logo width to 80% of screen width
    height: height * 0.4, // Adjust logo height to 40% of screen height
    resizeMode: "contain",
  },
});

