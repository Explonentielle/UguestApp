import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import ButtonComponent from '../../component/ButtonComponent';

const NewAnnouncement = ({navigation}) => {
  const [size, setSize] = useState('nano');
  const [category, setCategory] = useState('food');

  // Function to switch to the next page
  
  function switchPage() {
      navigation.navigate('NewAnnouncementStepTwo', {size, category});
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.insideContainer}>
          <Text style={styles.title}>Quel influenceur ?</Text>
          <Text>*Champs obligatoires</Text>
          <View>
            <Text style={{fontWeight: 'bold'}}>Choisisez le type d'influenceur ?</Text>
            <View style={styles.radioBtnView}>
              <RadioButton
                value="nano"
                color="rgb(255 108 222)"
                status={size === 'nano' ? 'checked' : 'unchecked'}
                onPress={() => setSize('nano')}
              />
              <Text onPress={() => setSize('nano')}>Nano(1 000 à 10 000 personnes)</Text>
            </View>
            <View style={styles.radioBtnView}>
              <RadioButton
                value="micro"
                color="rgb(255 108 222)"
                status={size === 'micro' ? 'checked' : 'unchecked'}
                onPress={() => setSize('micro')}
              />
              <Text onPress={() => setSize('micro')}>Micro(10 000 à 50 000 personnes)</Text>
            </View>

            <View style={styles.radioBtnView}>
              <RadioButton
                value="midTier"
                color="rgb(255 108 222)"
                status={size === 'midtier' ? 'checked' : 'unchecked'}
                onPress={() => setSize('midtier')}
              />
              <Text onPress={() => setSize('midtier')}>Mid-Tier(50 000 à 200 000 personnes)</Text>
            </View>
          </View>

          <View>
            <Text style={{fontWeight: 'bold'}}>Quelle thématique voulez vous cibler ?</Text>
            <View style={styles.radioBtnView}>
              <RadioButton
                value="food"
                color="rgb(255 108 222)"
                status={category === 'food' ? 'checked' : 'unchecked'}
                onPress={() => setCategory('food')}
              />
              <Text onPress={() => setCategory('food')}>Alimentation et boissson</Text>
            </View>
            <View style={styles.radioBtnView}>
              <RadioButton
                value="beauty"
                color="rgb(255 108 222)"
                status={category === 'beauty' ? 'checked' : 'unchecked'}
                onPress={() => setCategory('beauty')}
              />
              <Text onPress={() => setCategory('beauty')}>Beauté et bien-être</Text>
            </View>
            <View style={styles.radioBtnView}>
              <RadioButton
                value="fashion"
                color="rgb(255 108 222)"
                status={category === 'fashion' ? 'checked' : 'unchecked'}
                onPress={() => setCategory('fashion')}
              />
              <Text onPress={() => setCategory('fashion')}>Mode</Text>
            </View>
          </View>

          <ButtonComponent onPress={switchPage}>Suivant</ButtonComponent>
        </View>
      </ScrollView>
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
  radioBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
  },
});
export default NewAnnouncement;
