import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Image, View, Subtitle, Caption, Button } from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

const PostItem = ({
  post: { id, description, image, breed, gender, createdAt },
  remove,
}) => (
  <Row style={{ marginBottom: 2 }}>
    {image ? (
      <Image styleName="small rounded-corners" source={{ uri: image }} />
    ) : null}
    <View styleName="vertical stretch space-between">
      <Subtitle>
        {breed} - {gender}
      </Subtitle>

      <View styleName="vertical">
        <Caption>{description}</Caption>
        <Caption>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Caption>
      </View>
    </View>
    {remove ? (
      <Button onPress={remove}>
        <Icon name="trash-2" size={30} color="#000" />
      </Button>
    ) : null}
  </Row>
);

export default inject('store')(observer(PostItem));
