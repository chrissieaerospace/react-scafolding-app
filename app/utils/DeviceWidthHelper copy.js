import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
console.log(screenWidth, 'screenWidth');
export const smallDevice = screenWidth <= 375;
export const mediumDevice = screenWidth === 375;
