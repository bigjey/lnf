import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';

const Register = ({ store: { logout } }) => (
  <View style={styles.container}>
    <Text>Settings Screen</Text>
    <Button title="Log Out" onPress={logout} />
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

export default inject('store')(observer(Register));
