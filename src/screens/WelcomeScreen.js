import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/welcome1.png")}
        style={styles.image}
      />

      <Text style={styles.title1}>Welcome Recipes</Text>

      <Text style={styles.title2}>Recipe product</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("HomeList")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    marginTop: 0,
    height: 500,
  },
  title1: {
    color: "#f96163",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
  },
  title2: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#3c444c",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#f96163",
    borderRadius: 18,
    paddingVertical: 18,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});

export default WelcomeScreen;
