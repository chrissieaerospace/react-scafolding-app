import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { hp } from '../../utils/Dimensions';

const Test = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={styles.main}
    scrollEnabled={false}
  >
    {/* Top Bar Start */}
    {/* <View style={styles.top}> */}
    <View style={styles.topBar}>
      <Text style={styles.header}>Test Container</Text>
      <View />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    height: '100%',
    flex: 1,
  },
  topBar: {
    flex: 1,
    height: hp(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'teal',
  },
  header: {
    fontSize: 30,
    lineHeight: 30,
    color: '#354052',
    fontWeight: '700',
    marginBottom: 32,
  },
});

export default Test;
