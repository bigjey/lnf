import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { ListView, Row, Image, View, Subtitle, Caption } from '@shoutem/ui';
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  postTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

let PostItem = ({ post: {id, description, image, breed, gender} }) => (
  <Row style={{marginBottom: 2}}>
    {
      image ? 
      <Image
        styleName="small rounded-corners"
        source={{ uri: image }}
      /> : null
    }
    <View styleName="vertical stretch space-between">
    <Subtitle>{breed} - {gender}</Subtitle>
      <Caption>{description}</Caption>
    </View>
  </Row>
);

PostItem = inject('store')(observer(PostItem));

const PostsList = ({ componentId, store: { posts, showPost } }) => (
  <View style={styles.container}>
    <ListView
      data={posts}
      renderRow={post => (
        <TouchableOpacity onPress={() => showPost(post.id, componentId)}>
          <PostItem post={post} />
        </TouchableOpacity>
      )}
    />
  </View>
);

export default inject('store')(observer(PostsList));
