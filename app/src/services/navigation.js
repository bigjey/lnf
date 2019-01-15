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

const createPost = {
  component: {
    name: 'app.createPost',
  },
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
        component: {
          ...createPost.component,
          options: {
            bottomTab: {
              text: 'Add Post',
            },
          },
        },
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
};

export const setRootLayout = (layout = null) => {
  console.log(layouts[layout]);

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
