import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

const Test = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
    <View style={styles.main}>
      {/* Top Bar Start */}
      {/* <View style={styles.top}> */}
      <View style={styles.topBar}>
        <Text style={styles.header}>Test Container</Text>
        <View />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 16,
    lineHeight: 24,
    color: '#354052',
    fontWeight: '700',
    marginBottom: 32,
  },
});

export default Test;
