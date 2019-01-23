import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { inject, observer } from 'mobx-react';

const PostDetails = ({
  store: {
    activePost: { id, description, gender, breed, image },
  },
}) => (
    <View style={styles.container}>
      <Text>Post Details</Text>
      <Text>id: {id}</Text>
      {description && <Text>{description}</Text>}
      {breed && <Text>{breed}</Text>}
      {gender && <Text>{gender}</Text>}
      {image && <Image
        style={{ width: 128, height: 128 }}
        source={{ uri: image }}
      />}
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

export default inject('store')(observer(PostDetails));
