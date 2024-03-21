import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import Loader from '../../component/Loader';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../../config';

export default function Code({ route, navigation }) {
  const { email } = route.params;
  const [token, setToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const verifyToken = async () => {
    setError({ token: '' });

    if (token.length !== 4) {
      setError({ token: 'le code comporte 4 chiffres' });
    } else {
      try {
        setLoading(true);

        const response = await axios.post(`${BASE_URL}/api/user/verifyToken`, { email, token }, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        setLoading(false);
        navigation.navigate('NewPassword', { email });
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Text style={styles.title}>Entrer votre code</Text>
            <Text>Nous venons de vous envoyer un code afin de vérifier votre e-mail</Text>
            <Text>*champs obligatoires</Text>
            {error.message && <Text style={styles.error}>{error.message}</Text>}
            <View>
              <Text>Entrer vôtre code*</Text>
              <TextInput inputMode="numeric" onChangeText={setToken} style={styles.input} value={token} />
              <Text style={styles.error}>{error.token}</Text>
            </View>
            {error.message?.includes("maximum d'essais") ? (
              <ButtonComponent disabled={true}>Envoyé</ButtonComponent>
            ) : (
              <ButtonComponent onPress={verifyToken}>Envoyé</ButtonComponent>
            )}
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
