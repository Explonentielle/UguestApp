import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfilCard from '../component/ProfilCard';

const Profile = () => {
    const { logoutContext, userInfo, userToken, userData } = useContext(AuthContext);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                </View>
                <View>
                    <Ionicons onPress={logoutContext} name={'log-out-outline'} size={32} color={'rgb(255,108,222)'} />
                </View>
            </View>

            <ProfilCard label="Nom" content={userInfo.fullName || 'Nom de l\'utilisateur'} />
            <ProfilCard label="Adresse Email" content={userInfo.email || 'Email '} />

            {userInfo.roles === 'shop' && (
                <>
                    <ProfilCard label="Commerce" content={userData.name || 'Nom du commerce'} />
                    <ProfilCard label="Adresse" content={userData.address || 'Adresse du commerce'} />
                    <ProfilCard label="Localisation" content={userData.city || 'Localisation'} />
                    <ProfilCard label="Numero de siret" content={userData.siret || 'Mon numero de siret'} />
                    <ProfilCard label="Mes crédits" content={userData.credits || 'Mes crédits'}/>
                </>
            )}

            {userInfo.roles === 'influencer' && (
                <>
                    <ProfilCard label="Mes Réseaux" content={`${userData.follower} followers`}  />
                    <ProfilCard label="Localisation" content={userData.city || 'Localisation '} />
                    <ProfilCard label="Localisation de ma communauté" content={userData.topCity || 'Localisation de ma communauté '} />
                </>
            )}
        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});