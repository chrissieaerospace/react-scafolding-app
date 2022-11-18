import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export default function ImageHelper(imageType) {
  const options = {
    title: 'Select Avatar',
    maxWidth: 600,
    maxHeight: 600,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const currentOption =
    imageType === 'camera' ? launchCamera : launchImageLibrary;
  return new Promise(async (resolve, reject) => {
    currentOption(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        resolve(response);
      }
    });
  });
}
