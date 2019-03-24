import { Navigation } from 'react-native-navigation';

const postsList = {
  component: {
    name: 'app.postsList',
    options: {
      topBar: {
        title: {
          text: 'Posts',
        },
      },
    },
  },
};

const loader = {
  component: {
    name: 'app.loader',
  },
};

const main = {
  component: {
    name: 'app.main',
  },
};

const login = {
  component: {
    name: 'app.login',
  },
};

const register = {
  component: {
    name: 'app.register',
  },
};

const postDetails = {
  component: {
    name: 'app.postDetails',
  },
};

const settings = {
  component: {
    name: 'app.settings',
  },
};

const camera = {
  component: {
    name: 'app.camera',
  },
};

const createPost = { //app.camera'
  stack: {
    children: [
      {
        component: {
          name: 'app.createPost',
        },
      }
    ],
    options: {
      bottomTab: {
        text: 'Add Post',
      },
    },
  }
};

const home = {
  bottomTabs: {
    children: [
      {
        stack: {
          children: [postsList],
          options: {
            bottomTab: {
              text: 'Posts',
            },
          },
        },
      },
      {
        ...createPost,
      },
      {
        ...settings,
        component: {
          ...settings.component,
          options: {
            bottomTab: {
              text: 'Settings',
            },
          },
        },
      },
    ],
  },
};

export const layouts = {
  loader,
  login,
  register,
  main,
  home,
  postsList,
  postDetails,
  createPost,
  camera,
};

export const setRootLayout = (layout = null) => {
  if (!layouts[layout]) {
    throw new Error(`no data for '${layout}' layout`);
  }

  Navigation.setRoot({
    root: layouts[layout],
  });
};

export const pushToCurrentStack = (componentId, layout) => {
  if (!layouts[layout]) {
    throw new Error(`no data for '${layout}' layout`);
  }

  if (!componentId) {
    throw new Error(`no componentId provided`);
  }

  Navigation.push(componentId, layouts[layout]);
};
