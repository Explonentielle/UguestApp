import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card as RNPaperCard} from 'react-native-paper';
import {BASE_URL} from '../config';
import axios from 'axios';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {useState, useContext} from 'react';
import {Text} from 'react-native';

const AnnouncementCard = props => {
  const {userToken} = useContext(AuthContext);
  const [candidacy, setCandidacy] = useState();

  if (props.announcement) {
    useFocusEffect(
      useCallback(() => {
        function fetchData() {
          axios({
            method: 'GET',
            url: `${BASE_URL}/api/annonces/getCandidacy/${props.announcement._id}`,
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          })
            .then((res) => {
              setCandidacy(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        fetchData();
      }, [])
    );
  }

  return (
    <RNPaperCard style={{width: '100%'}} onPress={props.onPress}>
      {props.status == 'Finis' ? (
        <>
          <Image style={{width: '100%', height: 150, tintColor: 'gray'}} source={{uri: props.img}} />
          <Image style={{width: '100%', height: 150, position: 'absolute', opacity: 0.3}} source={{uri: props.img}} />
        </>
      ) : (
        <Image style={{width: '100%', height: 150}} source={{uri: props.img}} />
      )}

      <RNPaperCard.Content style={{paddingBottom: 10}}>{props.children}</RNPaperCard.Content>
      {candidacy?.length > 0 && (
        <View style={styles.notif}>
          <Text style={{color: 'white'}}>{candidacy.length}</Text>
        </View>
      )}
    </RNPaperCard>
  );
};

export default AnnouncementCard;

const styles = StyleSheet.create({
  notif: {
    backgroundColor: 'red',
    position: 'absolute',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 15,
    right: 5,
    top: 5,
  },
});
