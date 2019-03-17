import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';

import { setRootLayout } from '../services/navigation';

import store from '../store';

import CameraScreen from './CameraScreen/CameraScreen';
import CreatePost from './CreatePost/CreatePost';
import Login from './Login/Login';
import Register from './Register/Register';
import Placeholder from './Placeholder/Placeholder';
import PostsList from './PostsList/PostsList';
import PostDetails from './PostDetails/PostDetails';
import Settings from './Settings/Settings';

export default () => {
  Navigation.registerComponentWithRedux(
    'app.camera',
    () => CameraScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.main',
    () => CameraScreen,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.loader',
    () => () => <Placeholder>Loading</Placeholder>,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.postsList',
    () => PostsList,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.postDetails',
    () => PostDetails,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.settings',
    () => Settings,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.createPost',
    () => CreatePost,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'app.login',
    () => Login,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'app.register',
    () => Register,
    Provider,
    store
  );

  Navigation.events().registerAppLaunchedListener(async () => {
    await setRootLayout('loader');
    await store.checkAuth();

    // test nav
    // await setRootLayout('createPost');
  });
};
