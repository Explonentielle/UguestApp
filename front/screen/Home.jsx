import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import ButtonComponent from '../component/ButtonComponent';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require('../assets/uguest_logo.png')} />
      <ButtonComponent onPress={() => navigation.navigate('Register')}>Inscription</ButtonComponent>
      <ButtonComponent onPress={() => navigation.navigate('Login')}>Connexion</ButtonComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#FFC0CB',
  },
});
