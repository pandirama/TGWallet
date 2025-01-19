module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER
    ? {'react-native-flipper': {platforms: {ios: null}}}
    : {}),
    },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
};
