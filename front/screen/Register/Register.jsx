import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import Loader from '../../component/Loader';
import { BASE_URL } from '../../config';

export default function Register({ navigation }) {
  const [type, setType] = useState('influencer');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const checkError = () => {
    // Check if email, fullname, and password are filled
    email.length < 1
      ? setError(pState => ({ ...pState, email: "L'email doit être rempli" }))
      : setError(pState => ({ ...pState, email: '' }));
    fullName.length < 1
      ? setError(pState => ({ ...pState, fullName: 'Le nom doit être rempli' }))
      : setError(pState => ({ ...pState, fullName: '' }));
    password.length < 5
      ? setError(pState => ({ ...pState, password: 'Le mot de passe doit être supérieur à 6 caractères' }))
      : setError(pState => ({ ...pState, password: '' }));
    // Check if passwords match
    password !== repeatedPassword
      ? setError(pState => ({ ...pState, repeatedPassword: 'Le mot de passe est différent' }))
      : setError(pState => ({ ...pState, repeatedPassword: '' }));
  };

  function switchPage() {
    checkError();
    // If there are no errors, navigate to the next registration step
    if (email.length > 0 && password.length > 5 && fullName.length > 0 && password == repeatedPassword) {
      navigation.navigate('RegisterStepTwo', { email, type, password, fullName });
    }
  }



  async function registerInfluencer() {
    checkError();
    // If there are no errors, proceed with registration
    if (email.length > 0 && password.length > 5 && fullName.length > 0 && password === repeatedPassword) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/user/inscription`, {
          email,
          password,
          type,
          fullName,
        });

        setLoading(false);
        if (response.status === 201) {
          navigation.navigate('Login', {
            success: "Inscription réussie ! N'oubliez pas de valider votre adresse email",
          });
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          setError(pState => ({ ...pState, email: error.response.data.message }))
        } else {
          setError(pState => ({ ...pState, email: 'Une erreur s\'est produite.' }));
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.insideContainer}>
            <Text style={styles.title}>Inscription</Text>
            <Text>Inscrivez-vous pour pouvoir lancer une campagne d'influenceur ou y répondre.</Text>
            <Text>*Champs obligatoires</Text>
            <View>
              <Text style={{ fontWeight: 'bold' }}>Qui etes vous ?</Text>
              <View style={styles.radioBtnView}>
                <RadioButton
                  value="influencer"
                  color="rgb(255 108 222)"
                  status={type === 'influencer' ? 'checked' : 'unchecked'}
                  onPress={() => setType('influencer')}
                />
                <Text onPress={() => setType('influencer')}>Influenceur</Text>
              </View>
              <View style={styles.radioBtnView}>
                <RadioButton
                  value="shop"
                  color="rgb(255 108 222)"
                  status={type === 'shop' ? 'checked' : 'unchecked'}
                  onPress={() => setType('shop')}
                />
                <Text onPress={() => setType('shop')}>Prestataire de service</Text>
              </View>
            </View>
            <View>
              <Text>Prénom Nom*</Text>
              <TextInput inputMode="text" onChangeText={setFullName} style={styles.input} value={fullName} />
              <Text style={styles.error}>{error.fullName}</Text>
            </View>
            <View>
              <Text>E-mail*</Text>
              <TextInput inputMode="email" onChangeText={setEmail} style={styles.input} value={email} />
              <Text style={styles.error}>{error.email}</Text>
            </View>
            <View>
              <Text>Mot de passe*</Text>
              <TextInput secureTextEntry={true} onChangeText={setPassword} style={styles.input} value={password} />
              <Text style={styles.error}>{error.password}</Text>
            </View>
            <View>
              <Text>Retaper le mot de passe*</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={setRepeatedPassword}
                style={styles.input}
                value={repeatedPassword}
              />
              <Text style={styles.error}>{error.repeatedPassword}</Text>
            </View>
            {type == 'influencer' ? (
              <ButtonComponent onPress={registerInfluencer}>S'inscrire</ButtonComponent>
            ) : (
              <ButtonComponent onPress={switchPage}>Suivant</ButtonComponent>
            )}
          </View>
        </ScrollView>
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
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});
