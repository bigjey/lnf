import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import Camera, { RNCamera } from 'react-native-camera';
import { Button, Text } from '@shoutem/ui';

class CameraScreen extends Component {
  camera;

  componentDidMount() {}

  getLocation = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(data => resolve(data.coords), error => reject(error));
  })

  capture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const photo = await this.camera.takePictureAsync(options);
        const location = await this.getLocation();
        console.log(photo, location);
      } catch (e) {
        console.log('error: ', e);
      }
    }
  }

  render() {
    const { store: { value, inc, logout } } = this.props;
    return (
      <View style={styles.container}>
        <RNCamera 
          ref={ref => this.camera = ref}
          style={styles.camera}
          aspect={Camera.constants.Aspect.fill}
          type={Camera.constants.Type.back}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your phone\'s camera'}
        />
        <View style={styles.overlay}>
          <Button onPress={this.capture}><Text>Take a photo</Text></Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%', // neaded for some reason
  },
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
});

export default inject('store')(observer(CameraScreen));
