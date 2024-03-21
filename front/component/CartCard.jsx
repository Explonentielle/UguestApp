import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const CardCart = ({titre, contenu}) => {
  function confirmation() {
    console.log('paiement');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{titre}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.contentText}>{contenu}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={confirmation}>
          <Text style={styles.buttonText}>Acheter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    backgroundColor: 'black',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
  },
  contentText: {
    color: 'black',
  },
  button: {
    backgroundColor: 'rgb(255 108 222)',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CardCart;
