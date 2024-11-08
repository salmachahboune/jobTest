import React from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/s2.png")} // Replace with actual image path
        style={styles.image}
      />

      <View style={styles.topContainer}>
        <View style={styles.size}>
          <Text style={styles.title}>
            {"Your future career is not just a Dream"}
          </Text>
        </View>
        <Text style={styles.desc}>
          {"At JobBridge, we believe in the power of every individual and the unique contributions each person brings to the workplace."}
        </Text>  
        
        <Link href="/sign_log" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{"Get Started"}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width,  // Full width of the screen
    height: height * 0.5,  // 50% of the screen height
    resizeMode: "cover",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.05,  // 5% of screen height for padding
    marginTop: -height * 0.05,  // Negative margin to overlay the image slightly
  },
  title: {
    fontSize: width * 0.06,  // Adjust font size based on screen width
    fontWeight: "700",
    textAlign: "center",
    lineHeight: height * 0.05,  // Adjust line height for readability
    marginBottom: height * 0.02,  // Space between title and description
  },
  desc: {
    fontSize: width * 0.045,  // Adjust font size based on screen width
    fontWeight: "500",
    textAlign: "center",
    lineHeight: height * 0.04,  // Adjust line height for readability
    marginBottom: height * 0.05,  // Space between description and button
    color: "#6C7175",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: height * 0.02,  // Vertical padding based on screen height
    paddingHorizontal: width * 0.2,  // Horizontal padding based on screen width
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.045,  // Adjust font size based on screen width
    fontWeight: "600",
  },
  size: {
    width: width * 0.9,  // Adjust width of the title container based on screen width
  },
});
