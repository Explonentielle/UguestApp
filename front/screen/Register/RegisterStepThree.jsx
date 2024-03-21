import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import Loader from '../../component/Loader';
import { BASE_URL } from '../../config';

export default function RegisterStepThree({ route, navigation }) {
  const [type, setType] = useState('shop');
  const { email, fullName, password, siret, category, cart } = route.params; // Destructure route.params
  const [address, setAddress] = useState(route.params.address);
  const [complement, setComplement] = useState(route.params.complement);
  const [city, setCity] = useState(route.params.city);
  const [zipCode, setZipCode] = useState(route.params.zipCode);
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  async function register() {
    // Check if address, city, and zipCode are filled
    address.length < 1
      ? setError(pState => ({ ...pState, address: "L'adresse doit être remplie" }))
      : setError(pState => ({ ...pState, address: '' }));
    city.length < 1
      ? setError(pState => ({ ...pState, city: 'La ville doit être remplie' }))
      : setError(pState => ({ ...pState, city: '' }));
    zipCode.length < 1
      ? setError(pState => ({ ...pState, zipCode: 'Le code postal doit être rempli' }))
      : setError(pState => ({ ...pState, zipCode: '' }));
    zipCode.length < 1
      ? setError(pState => ({ ...pState, name: 'Le nom du commerce doit être rempli' }))
      : setError(pState => ({ ...pState, name: '' }));

    // If there are no errors in the form, proceed with registration
    if (address.length > 0 && city.length > 0 && zipCode.length > 0) {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/user/inscription`, {
          email,
          fullName,
          password,
          type,
          siret,
          category,
          address,
          name,
          complement,
          city,
          zipCode,
          cart,
        });

        setLoading(false);
        if (response.status === 201) {
          navigation.navigate('Login', {
            success: "Inscription réussie ! N'oubliez pas de valider votre adresse email",
          });
        } else {
          setError(response.data.message || 'Une erreur s\'est produite.');
        }
      } catch (error) {
        if (error.response) {
          setError(pState => ({ ...pState, email: error.response.data.message }))
        }
        setLoading(false);
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
            <Text style={styles.title}>Où êtes vous ?</Text>
            <Text>Il est important pour nous de vous connaître un peu plus.</Text>
            <Text>*Champs obligatoires</Text>

            <View>
              {error.email && <Text style={styles.error}>{error.email}</Text>}
              {error.password && <Text style={styles.error}>{error.password}</Text>}
              {error.fullName && <Text style={styles.error}>{error.fullName}</Text>}
              {error.siret && <Text style={styles.error}>{error.siret}</Text>}
              {error.cart && <Text style={styles.error}>{error.cart}</Text>}
              {error.category && <Text style={styles.error}>{error.category}</Text>}
            </View>

            <View>
              <View>
                <Text>Adresse*</Text>
                <TextInput inputMode="text" onChangeText={setAddress} style={styles.input} value={address} />
              </View>
              <Text style={styles.error}>{error.address}</Text>
              <View>
                <Text>Nom du commerce</Text>
                <TextInput inputMode="text" onChangeText={setName} style={styles.input} value={name} />
                <Text style={styles.error}>{error.name}</Text>
              </View>
              <View>
                <Text>Complement d'addresse (facultatif)</Text>
                <TextInput inputMode="text" onChangeText={setComplement} style={styles.input} value={complement} />
                <Text style={styles.error}>{error.complement}</Text>
              </View>
              <View>
                <Text>Ville*</Text>
                <TextInput inputMode="text" onChangeText={setCity} style={styles.input} value={city} />
              </View>
              <Text style={styles.error}>{error.city}</Text>
              <View>
                <Text>Code postal*</Text>
                <TextInput inputMode="text" onChangeText={setZipCode} style={styles.input} value={zipCode} />
                <Text style={styles.error}>{error.zipCode}</Text>
              </View>

              <ButtonComponent onPress={register}>S'inscrire</ButtonComponent>
            </View>
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
