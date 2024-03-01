import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }]
        })
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                ScrollView showsVerticalScrollIndicator={false}
                // style={{paddingTop: 200}}
            >
                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <Image
                            source={require('../assets/user.png')} // Replace with the path to your image
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                        <Text style={styles.label}>User Name</Text>
                    </View>

                    <View style={styles.profileDetails}>
                        <Text style={{ color: '#B4B4B8', fontWeight: 'bold', textTransform: 'uppercase' }}>Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='First Name'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                        />

                        <TouchableOpacity
                            style={styles.signOutButton}
                        onPress={handleLogout}
                        >
                            <Text style={styles.signOutText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
           
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBox: {
        alignItems: "center",
        justifyContent: 'center',
        padding: 15,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 20,
    },
    profileDetails: {
        paddingHorizontal: 30,
        gap: 20
    },
    signOutText: {
        // color: "#B4B4B8"
        textAlign: 'center',
        fontWeight: '500'
    },

    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#eee',
        padding: 10,
        marginTop: 20,
        gap: 15
    },

    input: {
        height: 40,
        width: '100%',
        borderColor: '#B4B4B8',
        borderBottomWidth: 1,
        color: '#000'
    },
});

export default ProfileScreen;
