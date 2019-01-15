import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { inject } from 'mobx-react';

import { setRootLayout } from '../../services/navigation';

const Register = ({ store: { login } }) => (
  <View style={styles.container}>
    <Text style={styles.formTitle}>Create new Account</Text>
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        try {
          await axios.post('/auth/register', values);

          setRootLayout('login');
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            setErrors(
              error.response.data.errors.reduce((errors, error) => {
                if (!errors[error.path]) {
                  errors[error.path] = error.message;
                }

                return errors;
              }, {})
            );

            return;
          }

          console.log({ ...error }, error);
        }
      }}
    >
      {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            value={values.email}
          />
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={values.password}
          />

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => {
        setRootLayout('login');
      }}
    >
      <Text>Sign In</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    minWidth: 200,
    padding: 8,
  },
  secondaryButton: {
    fontSize: 11,
  },
});

export default inject('store')(Register);
