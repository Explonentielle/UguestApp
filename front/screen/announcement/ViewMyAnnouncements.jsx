import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import AnnouncementCard from '../../component/AnnouncementCard';

const ViewMyAnnouncements = ({ route, navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const { userToken } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      const fetchMyAnnoucement = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/annonces/getMy`, {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          });
          setAnnouncements(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      fetchMyAnnoucement()
    }, [])
  );

  const filteredAnnouncements = announcements.filter(announcement => announcement.status === route.params.status);

  const navigateToAnnouncement = announcement => {
      navigation.navigate('ViewAnnouncement', { announcement });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.insideContainer}>
          <Text>Annonce {route.params.status}</Text>
          {filteredAnnouncements.map((announcement, index) => (
            <View style={styles.row} key={index}>
              <AnnouncementCard
                onPress={() => navigateToAnnouncement(announcement)}
                announcement={announcement}
                style={styles.card}
                img={announcement.imgUrl}
                status={announcement.status}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{announcement.title}</Text>
                <Text>{announcement.description}</Text>
              </AnnouncementCard>
            </View>
          ))}
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
    paddingHorizontal: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    marginTop: 5,
    gap: 30,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    marginHorizontal: 10,
    width: '100%',
  },
});

export default ViewMyAnnouncements;
