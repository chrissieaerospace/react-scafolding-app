import { useCallback } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import { useS3UploadHook } from './useUploadS3Hook';
const MAX_IMAGE_SIZE = 2;
export const useUploadMediaHook = ({
  onUploadFileSuccess: _onUploadFileSuccess,
  onUploadFileError: _onUploadFileError,
  size: Size = MAX_IMAGE_SIZE,
}) => {
  const size = Size * 1000000;
  const {
    s3Url,
    s3UrlLoader,
    uploadFile,
    uploadFileLoader,
    generateS3URL,
    uploadLoader,
  } = useS3UploadHook({
    onGenerateUploadUrlSuccess: onUploadFileSuccess,
    onGenerateUploadUrlError: onUploadFileError,
    onUploadFileSuccess,
    onUploadFileError,
  });
  function onUploadFileSuccess(successData) {
    if (successData) {
      // console.log(fileInfo);
      _onUploadFileSuccess(successData);
    } else {
      _onUploadFileError('Something went wrong. Try again');
    }
  }

  function onUploadFileError({ message = null } = {}) {
    _onUploadFileError(message || 'Something went wrong');
  }

  const handleUploadFile = useCallback(
    (mediaType = 'image', uploadType = 'gallery', multiple = false) => {
      console.log(mediaType);
      const options = {
        title: 'Crop Image',
        mediaType, // 'photo', 'video', or 'any'
        multiple,
        includeBase64: true,
        cropping: mediaType !== 'video',
        compressImageQuality: 0.8,
        freeStyleCropEnabled: true,
        smartAlbums: [
          'UserLibrary',
          'PhotoStream',
          'Panoramas',
          'Videos',
          'Bursts',
          'Screenshots',
        ],
      };
      (uploadType === 'gallery'
        ? ImagePicker.openPicker
        : ImagePicker.openCamera)(options)
        .then((fileInfo) => {
          console.log(fileInfo, 'fileInfo', mediaType);
          if (fileInfo.size <= size) {
            if (mediaType === 'video') {
              generateS3URL(fileInfo, 'video');
              // RNFetchBlob.fs
              //   .readFile(fileInfo.path, 'base64')
              //   .then((data) => {
              //     onUploadImage({ ...fileInfo, data });
              //   })
              //   .catch((err) => {
              //     console.log(err);
              //   });
            } else generateS3URL(fileInfo, mediaType);
            //   setMediaTypeModal(false);
          } else {
            //   setMediaTypeModal(false);
            onUploadFileError({
              message: `File size should be less than ${+size}MB`,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          onUploadFileError({ message: 'User Cancelled' });
        });
    },
    [],
  );
  return {
    handleUploadFile,
    uploadLoader,
    s3Url,
    s3UrlLoader,
    uploadFile,
    uploadFileLoader,
  };
};
