import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const smallDevice = screenWidth === 375;
