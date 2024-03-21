import React, { useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput } from 'react-native';
import Loader from '../component/Loader';
import ButtonComponent from '../component/ButtonComponent';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function Login({ navigation, route }) {
  const { loginContext } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  async function login() {
    // Check if the email and password fields are filled
    if (email.length < 1 || password.length < 1) {
      setError({ mail: "L'email et le mot de passe doivent être remplis" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/user/identification`, {
        username: email,
        password: password,
      });

      setLoading(false);

      if (response.status === 200) {
        if (response.data.token) {
          if (response.data.user.validateEmail) {
            setError({ log: response.data.message })
            loginContext(response.data);
            navigation.navigate('Dashboard');
          } else {
            setError({ verifyEmail: 'Votre adresse mail doit être vérifiée' });
          }
        } else {
          setError({ log: 'Identifiants invalides' });
        }
      }
    } catch (error) {
      setLoading(false);
      setError({ log: 'Identifiants invalides' });
      console.error(error);
    }
  }

  function handleForgotPassword() {
    navigation.navigate('ResetPassword');
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.insideContainer}>
          <Text style={styles.title}>Connexion</Text>
          <Text>Inscrivez-vous pour pouvoir lancer une campagne d'influenceur ou y répondre.</Text>
          <Text>*les champs sont obligatoires</Text>
          {error.verifyEmail && <Text style={styles.error}>{error.verifyEmail}</Text>}
          {error.log && <Text style={styles.error}>{error.log}</Text>}
          {route.params?.success && (
            <View style={styles.successView}>
              <Text style={styles.success}>{route.params.success}</Text>
            </View>
          )}
          <View>
            <Text>E-mail*</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} />
            <Text style={styles.error}>{error.mail}</Text>
          </View>
          <View>
            <Text>Mot de passe*</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.input} />
            <Text style={styles.error}>{error.password}</Text>
          </View>
          <ButtonComponent onPress={login}>Me connecter</ButtonComponent>
          <Text style={styles.forgetPassword} onPress={handleForgotPassword}>
            Mot de passe oublié ?
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  insideContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
    gap: 10,
    marginTop: 5,
    gap: 10,
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
  success: {
    color: '#0a3622',
    alignSelf: 'center',
  },
  successView: {
    backgroundColor: '#d1e7dd',
    borderColor: '#a3cfbb',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  forgetPassword: {
    textAlign: 'center',
    color: 'rgb(0,109,232)',
    textDecorationLine: 'underline',
  },
});
