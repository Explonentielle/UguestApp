import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView } from 'react-native';
import ButtonComponent from '../../component/ButtonComponent';
import axios from 'axios';
import Loader from '../../component/Loader';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const NewAnnouncementStepTwo = ({ route, navigation }) => {
  const { userToken } = useContext(AuthContext);
  const { size, category } = route.params; // Destructure route.params

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountValue, setDiscountValue] = useState('');

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update price based on size
    if (size == 'nano') setPrice(20);
    if (size == 'micro') setPrice(40);
    if (size == 'midtier') setPrice(80);
  }, [size]);

  async function createAnnoucement() {
    // Check if input are filled
    title.length < 1
      ? setError(pState => ({ ...pState, title: 'Le titre doit être rempli' }))
      : setError(pState => ({ ...pState, title: '' }));
    description.length < 1
      ? setError(pState => ({ ...pState, description: 'La description doit être rempli' }))
      : setError(pState => ({ ...pState, description: '' }));
    discountValue.length < 1
      ? setError(pState => ({ ...pState, discountValue: 'La reduction doit être rempli' }))
      : setError(pState => ({ ...pState, discountValue: '' }));

    // Send request to create announcement
    if (title.length > 0 && description.length > 0 && discountValue.length > 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/annonces/create`,
          {
            size,
            category,
            title,
            description,
            discountValue,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );

        setLoading(false);

        if (response.status === 201) {
          navigation.navigate('Dashboard');
        } else {
          setError(response.data);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.response.data);
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
            <Text style={styles.title}>Personnaliser votre annonce</Text>
            <Text>*Champs obligatoires</Text>

            <View>{error.price && <Text style={styles.error}>{error.price}</Text>}</View>

            <View>
              <View>
                <Text>Titre de l'annonce*</Text>
                <TextInput inputMode="text" onChangeText={setTitle} style={styles.input} value={title} />
                <Text style={styles.error}>{error.title}</Text>
              </View>

              <View>
                <Text>Définissez le service que vous offrez*</Text>
                <TextInput
                  inputMode="text"
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={setDescription}
                  style={styles.textArea}
                  value={description}
                />
                <Text style={styles.error}>{error.description}</Text>
              </View>
              <View>
                <Text>% de reduction offert aux clients*</Text>
                <TextInput
                  inputMode="numeric"
                  onChangeText={setDiscountValue}
                  style={styles.input}
                  value={discountValue}
                />
                <Text style={styles.error}>{error.discountValue}</Text>
              </View>
            </View>
            <View style={styles.recap}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Type : </Text>
                <Text>
                  {size} ( {price} credits)
                </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.price}>Total :</Text>
                <Text style={styles.price}>{price} credits</Text>
              </View>
            </View>
            <ButtonComponent onPress={createAnnoucement}>Créer ma campagne</ButtonComponent>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

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
  textArea: {
    height: 160,
    textAlignVertical: 'top',
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recap: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
});
export default NewAnnouncementStepTwo;
