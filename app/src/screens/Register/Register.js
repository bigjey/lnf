import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';

import { TOKEN_STORAGE_KEY } from '../../constants';

const Register = () => (
  <View style={styles.container}>
    <Text>Register</Text>
    <Button
      title="remove token"
      onPress={async () => {
        await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
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
