import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';

import { setRootComponent } from '../../services/navigation';

const Register = () => (
  <View style={styles.container}>
    <Text>Register</Text>
    <Button
      title="Log In"
      onPress={() => {
        setRootComponent('app.login');
      }}
    />
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

export default Register;
