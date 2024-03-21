import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import Dropdown from 'react-native-input-select';
import Loader from '../../component/Loader';

export default function RegisterStepTwo({ route, navigation }) {
  const [type, setType] = useState('shop');
  const { email, fullName, password } = route.params; // Destructure route.params
  const [siret, setSiret] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState('');

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  function switchPage() {
    // Check if siret, cart, and category are filled
    siret.length !== 14
      ? setError(pState => ({ ...pState, siret: 'Le siret doit faire 14 caracteres' }))
      : setError(pState => ({ ...pState, siret: '' }));
    cart.length < 1
      ? setError(pState => ({ ...pState, cart: 'Le panier moyen doit être rempli' }))
      : setError(pState => ({ ...pState, cart: '' }));
    category.length < 1
      ? setError(pState => ({ ...pState, category: 'La categorie doit être rempli' }))
      : setError(pState => ({ ...pState, category: '' }));

    if (siret.length == 14 && cart.length > 0 && category.length > 0) {
      setLoading(true);
      // Make API call to retrieve address information
      axios({
        method: 'GET',
        url: `https://api.insee.fr/entreprises/sirene/V3/siret/` + siret,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer f1bdcc0b-cafd-3625-bd78-006c69e55a91',
        },
      })
        .then(res => {
          let ad = res.data.etablissement.adresseEtablissement;
          setLoading(false);
          // Navigate to the next registration step and pass the necessary data
          navigation.navigate('RegisterStepThree', {
            email,
            fullName,
            type,
            password,
            siret,
            category,
            address: ad.numeroVoieEtablissement + ' ' + ad.typeVoieEtablissement + ' ' + ad.libelleVoieEtablissement,
            city: ad.libelleCommuneEtablissement,
            zipCode: ad.codePostalEtablissement,
            complement: ad.complementAdresseEtablissement,
            cart,
          });
        })
        .catch(err => {
          setLoading(false);
          navigation.navigate('RegisterStepThree', {
            email,
            fullName,
            type,
            password,
            siret,
            category,
            cart,
          });
          // console.log(err)
          // setError(pState => {
          //   return {...pState, siret: 'Le siret est invalide'};
          // });
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.insideContainer}>
            <Text style={styles.title}>Qui êtes vous ?</Text>
            <Text>Il est important pour nous de vous connaître un peu plus.</Text>
            <Text>
              *Le panier moyen est la somme moyenne que chaque client dépense par transaction dans votre commerce.
            </Text>
            <Text>*Champs obligatoires</Text>
            <View>
              <View>
                <Text>Siret (14 Chiffres)*</Text>
                <TextInput
                  inputMode="numeric"
                  onChangeText={setSiret}
                  style={styles.input}
                  value={siret}
                  maxLength={14}
                />
                <Text style={styles.error}>{error.siret}</Text>
              </View>
              <View>
                <Text>Panier moyen*</Text>
                <TextInput inputMode="numeric" onChangeText={setCart} style={styles.input} value={cart} />
                <Text style={styles.error}>{error.cart}</Text>
              </View>

              <View>
                <Dropdown
                  label="Categorie"
                  placeholder="Selectionnez..."
                  labelStyle={{ color: 'black', fontSize: 14 }}
                  options={[
                    { name: 'Beauté et bien-être', code: 'beauty' },
                    { name: 'Alimentation et boissons', code: 'food' },
                    { name: 'Mode', code: 'fashion' },
                  ]}
                  optionLabel={'name'}
                  optionValue={'code'}
                  selectedValue={category}
                  onValueChange={value => setCategory(value)}
                  primaryColor={'rgb(255 108 222)'}
                  dropdownStyle={{ backgroundColor: '#fff', borderColor: 'grey', height: 40 }}
                />
                <Text style={styles.error}>{error.category}</Text>
              </View>
              <ButtonComponent onPress={switchPage}>Suivant</ButtonComponent>
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
