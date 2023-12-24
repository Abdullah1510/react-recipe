import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function Loading(props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
