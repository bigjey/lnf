import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { COLORS } from '../../constants';
import {
  Title,
  Subtitle,
  Text,
  InlineGallery,
  ImageGalleryOverlay,
  Heading,
} from '@shoutem/ui';
import moment from 'moment';
import MapView from 'react-native-maps';

const PostDetails = ({
  store: {
    activePost: { id, description, gender, breed, image, createdAt, lat, lng },
  },
}) => (
  <ScrollView style={styles.container}>
    <Heading style={styles.postHeader}>Post Details</Heading>
    {image && (
      <InlineGallery
        style={styles.postImages}
        data={[{ source: { uri: image } }]}
        selectedIndex={0}
        renderImageOverlay={image => (
          <ImageGalleryOverlay
            styleName="full-screen"
            title={''}
            description={''}
          />
        )}
      />
    )}
    {description && <Title style={styles.postDescription}>{description}</Title>}
    {createdAt && (
      <Subtitle>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Subtitle>
    )}
    {breed && <Subtitle>{breed}</Subtitle>}
    {gender && <Subtitle>{gender}</Subtitle>}
    <MapView
      style={styles.map}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 400,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 10,
  },
  postHeader: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  postImages: {},
  postDescription: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default inject('store')(observer(PostDetails));
