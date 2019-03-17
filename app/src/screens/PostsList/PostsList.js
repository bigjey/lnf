import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  FlatList
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

class PostsList extends Component {
  state = {
    refreshing: false,
  }

  render() {
    const { componentId, store: { posts, showPost, loadPosts } } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({item}) => (
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
      </View>
    )
  }
}

export default inject('store')(observer(PostsList));
