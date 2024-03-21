import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfilCard = ({ label, content }) => {
    const updateButtonLabels = ["Adresse Email", "Adresse", "Localisation", "Numero de siret"];
    const reloadButtonLabel = "Mes crédits";
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState("");
    const navigation = useNavigation();
    let buttonContent = null;
    let action = null

    function reloadCredit() {
        navigation.navigate('Cart');
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }
    const handleSaveClick = () => {
        console.log(editedContent)
    }

    if (updateButtonLabels.includes(label)) {
        buttonContent = "Modifier";
        action = handleEditClick
    } else if (label === reloadButtonLabel) {
        buttonContent = "Recharger";
        action = reloadCredit
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{label} :</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.row}>
                    <View style={styles.textContainer}>
                        <Text style={styles.contentText}>{content}</Text>
                    </View>
                    {buttonContent && (
                        <TouchableOpacity style={styles.button} onPress={action}>
                            <Text style={styles.buttonText}>{buttonContent}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {isEditing && (
                    <View style={styles.input} >
                        <TextInput
                            style={styles.editInput}
                            onChangeText={(text) => setEditedContent(text)}
                            value={editedContent}
                            placeholder={`Sasisez votre ${label} içi`}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSaveClick}>
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 7,
    },
    header: {
        backgroundColor: 'black',
        padding: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    headerText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        backgroundColor: 'white',
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    contentText: {
        color: 'black',
    },
    button: {
        backgroundColor: 'rgb(255 108 222)',
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignSelf: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    editInput: {
        marginTop: 3,
        marginBottom: 3,
        height: 30,
    }, 
    row: {
        flexDirection: 'row'
    }
});


export default ProfilCard;
