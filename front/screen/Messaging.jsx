import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Messaging = () => {
  return (
    <View style={styles.container}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Prochainement ...</Text>
    </View>
  );
};

export default Messaging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
