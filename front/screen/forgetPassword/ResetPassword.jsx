import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../config';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  async function sendCode() {
    setError({ mail: '' });

    if (email.length < 1) {
      setError({ mail: "L'email doit être rempli" });
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/api/user/passwordUpdate`,
          { email },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
          });
        navigation.navigate('Code', { email });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError({ mail: error.response.data.message });
        } else {
          console.error(error);
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mot de passe oublié</Text>
      <Text>Pas d'inquiétude ! ça arrive. Entrer l'email associé à votre compte.</Text>
      <Text>*champs obligatoires</Text>
      <SafeAreaView>
        <Text>E-mail*</Text>
        <TextInput onChangeText={setEmail} style={styles.input} />
        <Text style={styles.error}>{error.mail}</Text>
      </SafeAreaView>
      <SafeAreaView></SafeAreaView>
      <ButtonComponent onPress={sendCode}>Envoyé</ButtonComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 20,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});
