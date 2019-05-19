import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { TextInput, Button, Text, Title } from '@shoutem/ui';
import Toaster, { ToastStyles } from 'react-native-toaster';


import { setRootLayout } from '../../services/navigation';
import { COLORS } from "../../constants";

const Login = ({ store: { authStore: { login }, uiStore: { error, clearError } } }) => (
  <View style={styles.container}>
    <Title style={styles.formTitle}>Sign In</Title>
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async ({ email, password }, { setErrors }) => {
        try {
          await login(email, password);
        } catch (err) {
          if (
            err.response &&
            err.response.data &&
            err.response.data.errors
          ) {
            setErrors(
              err.response.data.errors.reduce((errors, error) => {
                if (!errors[error.path]) {
                  errors[error.path] = error.message;
                }

                return errors;
              }, {})
            );

            return;
          }

          console.log({ ...err }, err);
        }
      }}
    >
      {({ handleChange, handleBlur, values, errors, handleSubmit }) => (
        <View style={styles.inputsWrap}>
          <TextInput
            style={styles.input}
            placeholder="Email"
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
            placeholder="Password"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry
            value={values.password}
          />

          <View style={styles.buttonsWrap}>
            <Button
              style={styles.submitButton}
              onPress={handleSubmit}
              styleName="secondary"
            >
              <Text>LOGIN</Text>
            </Button>
          </View>
        </View>
      )}
    </Formik>
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={() => {
        setRootLayout('register');
        clearError();
      }}
    >
      <Text>Create new Account</Text>
    </TouchableOpacity>
    {!!error && <Toaster message={{
      text: error,
      styles: ToastStyles.error,
    }} onHide={clearError} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  formTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
  },
  input: {
    minWidth: 200,
    width: '100%',
    marginBottom: 2,
  },
  secondaryButton: {
    fontSize: 11,
  },
  inputsWrap: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonsWrap: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  submitButton: {
    width: 100,
  }
});

export default inject('store')(observer(Login));
