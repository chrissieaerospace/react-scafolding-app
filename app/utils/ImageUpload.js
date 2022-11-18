import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import ImageHelper from './ImageHelper';
import ImageOptionModal from './ImageOptionModal';
import axios from 'axios';

const ImageUpload = ({
  visible,
  closeCallback,
  isUploaded,
  isImageModal,
  actions,
}) => {
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleOptionModal, setVisibleOptionModal] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    if (isImageModal) {
      setVisibleOptionModal(true);
      actions.clearCommonReduerAction();
    }
  }, [isImageModal]);

  const selectImage = async (imageType) => {
    const response = await ImageHelper(imageType);
    setVisibleUploadModal(true);
  };

  return (
    <View>
      <ImageOptionModal
        visible={visibleOptionModal}
        closeCallback={() => {
          setVisibleOptionModal(false);
          closeCallback();
        }}
        callback={(imageType) => {
          setVisibleOptionModal(false);
          setTimeout(() => {
            selectImage(imageType);
          }, 350);
        }}
      />
    </View>
  );
};

export default ImageUpload;
