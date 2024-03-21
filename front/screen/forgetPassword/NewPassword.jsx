import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import Loader from '../../component/Loader';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../config';

export default function NewPassword({ route, navigation }) {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  async function newPassword() {
    password.length < 5
      ? setError((pState) => ({ ...pState, password: 'Le mot de passe doit être supérieur à 6 caractères' }))
      : setError((pState) => ({ ...pState, password: '' }));
    password !== repeatedPassword
      ? setError((pState) => ({ ...pState, repeatedPassword: 'Le mot de passe est différent' }))
      : setError((pState) => ({ ...pState, repeatedPassword: '' }));

    if (password.length > 5 && repeatedPassword === password) {
      try {
        setLoading(true);

        const response = await axios.put(`${BASE_URL}/api/user/newPassword`,
          { email, password },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        setLoading(false);
        navigation.navigate('Login', { success: 'Mot de passe modifié !' });
      } catch (error) {
        setLoading(false);
        setError(error.response);
        console.log(error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.title}>Nouveau mot de passe</Text>
            <Text>Créer vous un nouveau mot de passe que vous finirez de toute façon par l'oublier.</Text>
            <Text>*champs obligatoires</Text>

            <View>
              <Text>Mot de passe*</Text>
              <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
              <Text style={styles.error}>{error.password}</Text>
              <Text>Retaper votre mot de passe*</Text>
              <TextInput
                value={repeatedPassword}
                onChangeText={setRepeatedPassword}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text style={styles.error}>{error.repeatedPassword}</Text>
            </View>
            <ButtonComponent onPress={newPassword}>Envoyé</ButtonComponent>
          </>
        )}
      </View>
    </SafeAreaView>
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
