import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const Loader = () => {
  spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.Image
        style={{transform: [{rotate: spin}], width: 80, height: 80, resizeMode: 'contain'}}
        source={require('../assets/loader.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
