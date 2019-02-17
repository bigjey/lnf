import React, { Component } from 'react';
import { View, Text, Button, Image, TextInput } from '@shoutem/ui';
import { inject, observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { pushToCurrentStack } from '../../services/navigation';
import ImagePicker from 'react-native-image-picker';
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';

class CreatePost extends Component {
  options = {
    title: 'Add picture',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  state = {
    photo: '',
    loading: false,
  }

  addImage = (updateValue) => {
    this.setState({loading: true})
    ImagePicker.showImagePicker(this.options, response => {
      updateValue(response.uri);
      this.setState({picture: response.uri, loading: false});
    })
  }

  goToCamera = () => {
    const { componentId } = this.props;
    pushToCurrentStack(componentId, 'camera');
  }
    
  render() {
    const { picture, loading } = this.state;
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ breed: '', gender: '', description: '', picture: '' }}
          validate={values => {
            let errors = {};
            if (!values.breed) {
              errors.breed = 'Required';
            }
            if (!values.gender) {
              errors.gender = 'Required';
            }
            return errors;
          }}
          onSubmit={values => console.log('values: ', values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <View>
              { !loading ? 
                <Image
                  styleName="large-banner"
                  source={{ uri: values.picture}}
                  style={styles.image}
                /> : 
                <View style={styles.loader}><Icon name="loader" size={30} color="#ccc" /></View>
              }
              <Button onPress={() => this.addImage(handleChange('picture'))}><Text>Add picture</Text></Button>
              <TextInput
                style={styles.input}
                placeholder="breed"
                onChangeText={handleChange('breed')}
                onBlur={handleBlur('breed')}
                autoCapitalize="none"
                keyboardType="email-address"
                value={values.breed}
              />
              <RNPickerSelect
                placeholder={{label: 'Gender', value: null}}
                items={[{value: 'MALE', label: 'Male'}, {value: 'FEMALE', label: 'Female'}]}
                onValueChange={handleChange('gender')}
                style={pickerSelectStyles}
                value={values.gender}
              />
              <TextInput
                style={styles.input}
                placeholder="description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                autoCapitalize="none"
                keyboardType="email-address"
                value={values.description}
              />
              <Button type="submit" onPress={handleSubmit}>
                <Text>Submit</Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  image: {
    marginBottom: 2,
  },
  button: {
    width: '100%',
    marginBottom: 2,
    padding: 20,
  },
  buttonText: {
    fontSize: 20,
  },
  input: {
    marginBottom: 2,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
      color: '#000',
      paddingRight: 30,
      marginBottom: 2,
      backgroundColor: '#fff',
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 15,
      paddingVertical: 10,
      color: '#000',
      paddingRight: 30,
      marginBottom: 2,
      backgroundColor: '#fff',
  },
});

export default inject('store')(observer(CreatePost));