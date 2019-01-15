import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Placeholder = ({ children }) => (
  <View style={styles.container}>
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Placeholder;
