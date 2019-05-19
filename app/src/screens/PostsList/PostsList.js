import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { View } from '@shoutem/ui';
import { COLORS } from '../../constants';
import Toaster, { ToastStyles } from 'react-native-toaster';
import PostItem from '../../components/Post/PostItem';

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

class PostsList extends Component {
  state = {
    refreshing: false,
  };

  render() {
    const {
      componentId,
      store: {
        postStore: { posts, showPost, loadPosts },
        uiStore: { error, clearError }
      },
    } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showPost(item.id, componentId)}>
              <PostItem post={item} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                console.log('starting refresh');
                loadPosts();
              }}
            />
          }
        />
        {!!error && (
          <Toaster
            message={{
              text: error,
              styles: ToastStyles.error,
            }}
            onHide={clearError}
          />
        )}
      </View>
    );
  }
}

export default inject('store')(observer(PostsList));
