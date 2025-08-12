import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Based on iPhone 14 width (390)
const scale = SCREEN_WIDTH / 390;

export const NormalizeFont = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
