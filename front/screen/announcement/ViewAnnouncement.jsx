import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, SafeAreaView, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import ButtonComponent from '../../component/ButtonComponent';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../../config';
import Loader from '../../component/Loader';

const ViewAnnouncement = ({ route }) => {
  const { announcement } = route.params; // Destructure route.params
  const [candidacy, setCandidacy] = useState();
  const { userInfo, userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [toApply, setToApply] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Fetch candidacy data and check if the user has applied (influencer)

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/annonces/getCandidacy/${announcement._id}`,
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        setLoading(false);
        setCandidacy(response.data);
        const hasCandidacy = response.data.some(candidat => candidat.user._id === userInfo._id);
        setToApply(hasCandidacy);
      } catch (error) {
        setLoading(false);
        console.log('[ViewAnnoucement:getCandidacy]: ' + error);
      }
    };
    fetchData();
  }, [refresh]);




  // Handle user's candidacy submission (influencer)
  const handleCandidacy = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/candidatures/create`,
        { announcementId: announcement._id },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      );
      setLoading(false);
      setToApply(true);
    } catch (error) {
      setLoading(false);
      console.log('[ViewAnnoucement:handleCandidacy]: ' + error.response.data);
    }
  };


  // confirm before Validate or decline a candidacy (shop)
  const confirmValidateCandidacy = (candidatId, status) => {
    Alert.alert('Êtes-vous sur ?', 'Il ne sera pas possible de revenir en arrière', [
      { text: 'Annuler', onPress: () => console.log('NO Pressed'), style: 'cancel' },
      { text: 'confirmer', onPress: () => validateCandidacy(candidatId, status) },
    ]);
  };


  // Validate or decline a candidacy (shop)
  const validateCandidacy = async (candidatId, status) => {
    setLoading(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/candidatures/update/${announcement._id}`,
        { candidatId, status },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        }
      );
      setLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      setLoading(false);
      console.error('[ViewAnnoucement:validateCandidacy]:', error.response.data);
      setRefresh(!refresh);
    }
  };

  // Render candidacy cards for shop owners (shop)
  const renderCandidacyCards = () => {
    return (
      <>
        <Text style={{ fontWeight: 'bold' }}>Une seule candidature peut être acceptée</Text>
        {candidacy?.map(candidat => (
          <View key={candidat.user._id + Math.floor(Math.random() * 101)} style={styles.candidacyCard}>
            <Text>{candidat.user.fullName}</Text>
            <Text>{candidat.userInfluencer.follower} followers</Text>
            {candidat.status === 'validate' && (
              <Text style={{ color: 'green', fontWeight: 'bold' }}>Validé</Text>
            )}
            {candidat.status === 'decline' && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Décliné</Text>
            )}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => confirmValidateCandidacy(candidat.user._id, 'validate')}
                style={[styles.validate, { opacity: candidat.status === 'validate' || candidat.status === 'decline' ? 0.2 : 1, }]}
                disabled={candidacy[0].status !== 'onGoing'}>
                <Text>
                  <Ionicons name="checkmark" size={18} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmValidateCandidacy(candidat.user._id, 'decline')}
                style={[styles.decline, { opacity: candidat.status === 'validate' || candidat.status === 'decline' ? 0.2 : 1, }]}
                disabled={candidacy[0].status !== 'onGoing'}>
                <Text>
                  <Ionicons name="close" size={18} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Image style={{ width: '100%', height: 200 }} source={{ uri: announcement.imgUrl }} />
        <View style={styles.insideContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{announcement.title}</Text>
          <Text style={styles.city}>{announcement.userShop.city}</Text>
          <Text>{announcement.description}</Text>
          <Text>
            {announcement.discountValue} % de réduction pour les followers
          </Text>
          {userInfo.roles.includes('influencer') &&
            !loading &&
            (toApply ? (
              <TouchableOpacity disabled style={[styles.button, styles.disabled]}>
                <Text style={styles.content}>Postuler</Text>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>
                  Votre candidature a été soumise.
                </Text>
              </TouchableOpacity>
            ) : (
              <ButtonComponent onPress={handleCandidacy}>Postuler</ButtonComponent>
            ))}
          {loading ? <Loader /> : userInfo.roles.includes('shop') && renderCandidacyCards()}
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: '5%',
    alignItems: 'center',
    gap: 10,
  },
  city: {
    backgroundColor: 'rgba(255, 108, 222, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  button: {
    backgroundColor: 'rgb(255 108 222)',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  content: {
    color: '#fff',
    fontSize: 26,
  },
  candidacyCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  validate: {
    backgroundColor: '#a3cfbb',
    borderRadius: 50,
    padding: 10,
    marginEnd: 10,
  },
  decline: {
    backgroundColor: '#ff6f6f',
    borderRadius: 50,
    padding: 10,
  },
  disabled: {
    opacity: 0.2,
  },
});

export default ViewAnnouncement;
