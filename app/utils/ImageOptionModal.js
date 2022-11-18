import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {wp} from './Dimensions';
import {GetIcon} from './Icons';
import {colors, Custompadding, typography} from '../styles/stylesheet';
import CustomModal from '../components/common/CustomModal';

const ImageOptionModal = ({visible, closeCallback, callback}) => {
  return (
    <CustomModal visible={visible}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'flex-end'}}
        activeOpacity={1}
        onPress={closeCallback}>
        <View
          style={[
            Custompadding.paddingRegular,
            {
              backgroundColor: colors.white,
              borderTopLeftRadius: wp(8),
              borderTopRightRadius: wp(8),
              paddingTop: wp(8),
              paddingBottom: wp(8),
            },
          ]}>
          <View style={{alignItems: 'center', paddingBottom: wp(5)}}>
            <Text style={[typography.bold.h7]}>Select Image</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback('camera');
            }}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: wp(4),
                borderBottomWidth: wp(0.1),
                borderBottomColor: colors.borderColor,
              },
            ]}>
            <View
              style={{
                width: wp(12),
                height: wp(12),
                borderRadius: wp(12) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: wp(0.1),
                borderColor: colors.borderColor,
              }}>
              <View
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                  backgroundColor: colors.primaryColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {GetIcon('camera|Ionicons', colors.white)}
              </View>
            </View>
            <View style={{paddingLeft: wp(5)}}>
              <Text style={[typography.bold.h7]}>Take Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              callback('gallery');
            }}
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: wp(4),
                paddingTop: wp(4),
              },
            ]}>
            <View
              style={{
                width: wp(12),
                height: wp(12),
                borderRadius: wp(12) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: wp(0.1),
                borderColor: colors.borderColor,
              }}>
              <View
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: wp(10) / 2,
                  backgroundColor: colors.primaryColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {GetIcon('grid|Ionicons', colors.white)}
              </View>
            </View>
            <View style={{paddingLeft: wp(5)}}>
              <Text style={[typography.bold.h7]}>Choose from Library</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </CustomModal>
  );
};

export default ImageOptionModal;
