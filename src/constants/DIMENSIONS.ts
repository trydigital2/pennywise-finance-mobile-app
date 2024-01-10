import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  cardWidth: width - 32,
  contentWidth: Math.min(width - 32, 600),
};
