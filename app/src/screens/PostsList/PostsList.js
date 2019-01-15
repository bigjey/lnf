import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { inject, observer } from 'mobx-react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  postTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

let PostItem = ({ id, description }) => (
  <Text style={styles.postTitle}>
    {id} {description && `- ${description}`}
  </Text>
);

PostItem = inject('store')(observer(PostItem));

const PostsList = ({ componentId, store: { posts, showPost } }) => (
  <View style={styles.container}>
    <FlatList
      data={posts}
      keyExtractor={({ id }) => String(id)}
      renderItem={({ item: post }) => (
        <TouchableOpacity
          key={post.id}
          style={styles.container}
          onPress={() => showPost(post.id, componentId)}
        >
          <PostItem {...post} />
        </TouchableOpacity>
      )}
    />
  </View>
);

export default inject('store')(observer(PostsList));
