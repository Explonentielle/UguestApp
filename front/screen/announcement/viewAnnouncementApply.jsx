import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import AnnouncementCard from '../../component/AnnouncementCard';

const ViewAnnouncements = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const { userToken } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/api/annonces/getApplyAnnoucement/${userToken}`, {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          });
          setAnnouncements(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.insideContainer}>
          <Text>Annonce près de vous</Text>
          {announcements.map((announcement, index) => (
            <View style={styles.row} key={index}>
              <AnnouncementCard
                onPress={() => {
                  navigation.navigate('ViewAnnouncement', { announcement: announcement });
                }}
                style={styles.card}
                img={announcement.imgUrl}>
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
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    alignItems: 'center',
    marginTop: 5,
    gap: 30,
  },
  row: {
    flexDirection: 'row',
  },
});

export default ViewAnnouncements;
