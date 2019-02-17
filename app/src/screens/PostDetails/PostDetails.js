import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import {COLORS} from "../../constants";
import { Title, Subtitle, Text, InlineGallery, ImageGalleryOverlay, Heading } from '@shoutem/ui';

const PostDetails = ({
  store: {
    activePost: { id, description, gender, breed, image },
  },
}) => (
    <View style={styles.container}>
      <Heading style={styles.postHeader}>Post Details</Heading>
      {image &&
        <InlineGallery
          style={styles.postImages}
          data={[{source: {uri: image}}]}
          selectedIndex={0}
          renderImageOverlay={image => (
            <ImageGalleryOverlay
              styleName="full-screen"
              title={''}
              description={''}
            />
          )}
        />
      }
      {description && <Title style={styles.postDescription}>{description}</Title>}
      {breed && <Subtitle>{breed}</Subtitle>}
      {gender && <Subtitle>{gender}</Subtitle>}
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    padding: 10
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
