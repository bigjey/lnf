import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';

import { TOKEN_STORAGE_KEY } from '../../constants';

const Login = () => (
  <View style={styles.container}>
    <Text>Login</Text>
    <Button
      title="set token"
      onPress={async () => {
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, 'test');
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

export default Login;
