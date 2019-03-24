import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import { inject, observer } from 'mobx-react';
import { COLORS } from '../../constants';
import { Heading } from '@shoutem/ui';

const Register = ({ store: { logout } }) => (
  <View style={styles.container}>
    <Heading style={styles.postHeader}>Settings Screen</Heading>
    <Button title="Log Out" onPress={logout} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.BACKGROUND,
  },
});

export default inject('store')(observer(Register));
