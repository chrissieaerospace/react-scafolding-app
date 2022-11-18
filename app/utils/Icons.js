/* eslint-disable */
/**
 * import GetIcon and call with required params
 * params: {
 *  nameType //value should be sapereted with "|"  // required
 *  type // required
 *  color
 *  size // defaulted to 24
 *  style
 * }
 */

import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { GetIcon } from './Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Zocial from 'react-native-vector-icons/Zocial';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export function GetIcon(nameType, color, size = 24, styles = {}) {
  nameType = nameType.split('|');
  if (typeof nameType === 'undefined') {
    console.error(
      'GetIcon function first argument is undefined must be pair of "name|type"',
    );
    return;
  }
  switch (nameType[1]) {
    case 'MaterialIcons':
      return (
        <MaterialIcons
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'EvilIcons':
      return (
        <EvilIcons
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'Foundation':
      return (
        <Foundation
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'Feather':
      return (
        <Feather name={nameType[0]} color={color} size={size} style={styles} />
      );
    case 'Ionicons':
      return (
        <Ionicons name={nameType[0]} color={color} size={size} style={styles} />
      );
    case 'Octicons':
      return (
        <Octicons name={nameType[0]} color={color} size={size} style={styles} />
      );
    case 'Zocial':
      return (
        <Zocial name={nameType[0]} color={color} size={size} style={styles} />
      );
    case 'SimpleLineIcons':
      return (
        <SimpleLineIcons
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'Entypo':
      return (
        <Entypo name={nameType[0]} color={color} size={size} style={styles} />
      );
    case 'AntDesign':
      return (
        <AntDesign
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'FontAwesome':
      return (
        <FontAwesome
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    case 'FontAwesome5':
      return (
        <FontAwesome5
          name={nameType[0]}
          color={color}
          size={size}
          style={styles}
        />
      );
    default:
      console.error(
        'GetIcon function : icon type not found please pass correct type eg: "name|type"',
      );
      return;
  }
}
