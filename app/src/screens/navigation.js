import { Navigation } from 'react-native-navigation';
import { Provider } from 'mobx-react';

const store = '../store';

// screens
import TestScreen from './TestScreen/TestScreen';

export default () => {
  Navigation.registerComponentWithRedux(
    `test`,
    () => TestScreen,
    Provider,
    store
  );

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'test'
        }
      }
    });
  });
};
