export default {
  expo: {
    owner: 'a-team',
    name: 'react-naitiv-practice',
    slug: 'stoop-test',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/trashPanda.png',
    splash: {
      image: './assets/trashPanda.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/trashPanda.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
