import { Navigation } from 'react-native-navigation';

export const setRootComponent = (name = 'app.loader') => {
  Navigation.setRoot({
    root: {
      component: {
        name,
      },
    },
  });
};
