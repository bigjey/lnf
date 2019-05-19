import React, { Component } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';
import { COLORS } from '../../constants';
import { Heading, View, Button, Text } from '@shoutem/ui';
import PostItem from '../../components/PostItem';

class Settings extends Component {
  state = {
    posts: [],
    refreshing: false,
  };

  async componentDidMount() {
    try {
      this.loadMyPosts();
    } catch (e) {
      console.log(e);
    }
  }

  loadMyPosts = async () => {
    const {
      store: { postStore: { getMyPosts } },
    } = this.props;
    const posts = await getMyPosts();
    this.setState({ posts });
  };

  remove = async postId => {
    const {
      store: { postStore: { removePost } },
    } = this.props;
    await removePost(postId);
    this.loadMyPosts();
  };

  render() {
    const {
      store: { authStore: { logout } },
    } = this.props;
    const { posts, refreshing } = this.state;

    return (
      <View style={styles.container}>
        <Heading style={styles.header}>Settings Screen</Heading>
        <Heading style={styles.postsHeader}>My posts</Heading>

        <FlatList
          style={styles.list}
          data={posts}
          renderItem={({ item }) => (
            <PostItem remove={() => this.remove(item.id)} post={item} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.loadMyPosts}
            />
          }
        />

        <Button onPress={logout}>
          <Text>Log Out</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flex: 1,
  },
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  postsHeader: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default inject('store')(observer(Settings));
