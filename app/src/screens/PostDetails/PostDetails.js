import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import {COLORS} from "../../constants";
import { Title, Subtitle, Text, ImageGallery, ImageGalleryOverlay } from '@shoutem/ui';

const PostDetails = ({
  store: {
    activePost: { id, description, gender, breed, image },
  },
}) => (
    <View style={styles.container}>
      <Title>Post Details</Title>
      {description && <Subtitle>{description}</Subtitle>}
      {breed && <Text>{breed}</Text>}
      {gender && <Text>{gender}</Text>}
      {image &&
        <ImageGallery
          data={[{source: {uri: image}}]}
          selectedIndex={1}
          renderImageOverlay={image => (
            <ImageGalleryOverlay
              styleName="full-screen"
              title={''}
              description={''}
            />
          )}
        />
      }
    </View>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});

export default inject('store')(observer(PostDetails));
