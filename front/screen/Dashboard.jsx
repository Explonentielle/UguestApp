import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import DashboardCard from '../component/DashboardCard';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../config';

export default function Dashboard({ navigation }) {
  const { logoutContext, userInfo, userToken, userData } = useContext(AuthContext);
  const [dataBdd, setDataBdd] = useState(null);

  // Make API call to retrieve User information
  useFocusEffect(
    useCallback(() => {
      const fetchDataFromAPI = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/User/getUser/${userInfo._id}`, {
            headers: { Authorization: 'Bearer ' + userToken },
          });

          if (response.status === 200) {
            console.log(response.data)
            setDataBdd(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      if (userInfo) {
        fetchDataFromAPI();
      }
    }, [userInfo, userToken])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.Title}>
            <Text style={styles.name}>
              Bonjour {userInfo.fullName.split(' ')[0][0].toUpperCase() + userInfo.fullName.split(' ')[0].slice(1)}
            </Text>
          </View>
          <View>
            <Ionicons onPress={logoutContext} name={'log-out-outline'} size={32} color={'rgb(255,108,222)'} />
          </View>
        </View>

        {userInfo.roles.includes('influencer') && (
          <View>
            <View style={styles.row}>
              <DashboardCard style={styles.card} content="Campagne effectué" />
              <DashboardCard style={styles.card} content="nombre de vue de votre publication" />
            </View>
            <View style={styles.row}>
              <DashboardCard
                onPress={() => {
                  navigation.navigate('Messaging');
                }}
                style={styles.card}
                content="Messagerie"
              >
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>
                  {/* {dataBdd?} */}
                </Text>
              </DashboardCard>
              <DashboardCard style={styles.card}
                content="Demande de partenariat"
                onPress={() => {
                  navigation.navigate('ViewApplyAnnouncement');
                }} />
            </View>
            <View>
              <DashboardCard
                style={styles.card}
                content="Mon Profil"
                onPress={() => {
                  navigation.navigate('Profil');
                }} />
            </View>
          </View>
        )}

        {userInfo.roles.includes('shop') && (
          <View>
            <View style={styles.row}>

              <DashboardCard
                onPress={() => {
                  navigation.navigate('ViewMyAnnouncements', { status: 'En cours' });
                }}
                style={styles.card}
                content="Campagne en cours">
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 24 }}>
                  {/* {dataBdd?.announcementsOnGoing.length} */}
                </Text>
              </DashboardCard>

              <DashboardCard
                onPress={() => {
                  navigation.navigate('ViewMyAnnouncements', { status: 'cloturé' });
                }}
                style={styles.card}
                content="Campagne terminée">
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 24 }}>
                  {/* {dataBdd?.announcementsClose.length} */}
                </Text>
              </DashboardCard>

            </View>
            <View style={styles.row}>

              <DashboardCard
                onPress={() => {
                  navigation.navigate('Messaging');
                }}
                style={styles.card}
                content="Messagerie"
              >
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 55 }}>
                  {/* {dataBdd?} */}
                </Text>
              </DashboardCard>

              <DashboardCard
                onPress={() => {
                  navigation.navigate('Cart');
                }}
                style={styles.card}
                content="Recharger des credits">
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 24 }}>
                  {userData.credit}
                  <Text style={{ fontWeight: 400, fontSize: 14 }}> credits</Text>
                </Text>
              </DashboardCard>

            </View>

            <View style={styles.row}>
              <DashboardCard
                onPress={() => {
                  navigation.navigate('Statistics');
                }}
                style={styles.card}
                content="Statistiques"
              />
              <DashboardCard
                style={styles.card}
                content="Mon Profil"
                onPress={() => {
                  navigation.navigate('Profil');
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('NewAnnouncement');
              }}>
              <Text style={styles.buttonText}>Créer une nouvelle campagne +</Text>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 10,
  },
  Title: {
    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgb(255 108 222)',
    borderRadius: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  card: {
    width: '48%',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
