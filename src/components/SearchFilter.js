import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SearchFilter = ({ icon, placeholder, query, handleSearch }) => {
  return (
    <View style={styles.container}>
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={(text) => handleSearch(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  input: {
    paddingLeft: 8,
    fontSize: 16,
    color: "#808080",
    marginLeft: 8,
  },
});

export default SearchFilter;
