import { Dimensions, PixelRatio } from 'react-native';
const wp = (widthPercent) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  const pxRatio = (screenWidth * elemWidth) / 100;
  return PixelRatio.roundToNearestPixel(pxRatio);
};
const hp = (heightPercent) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  const pxRatioHeight = (screenHeight * elemHeight) / 100;
  return PixelRatio.roundToNearestPixel(pxRatioHeight);
};
export { wp, hp };
