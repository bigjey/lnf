import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import { inject } from 'mobx-react';

import { setRootComponent } from '../../services/navigation';

const Login = ({ store: { login } }) => (
  <View style={styles.container}>
    <Text>Login</Text>
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data } = await axios.post('/auth/login', values);
          login(data.token);
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
    <Button
      title="Create Account"
      onPress={() => {
        setRootComponent('app.register');
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
  errorMessage: {
    color: 'red',
  },
});

export default inject('store')(Login);
