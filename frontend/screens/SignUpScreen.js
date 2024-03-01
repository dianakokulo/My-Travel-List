import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import { URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const SignupScreen = function ({ navigation }) {   
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        comfirmPasword: "",
    
    });

    const handleSignUp = () => {
        if (
            !data.firstName ||
            !data.lastName ||
            !data.email ||
            !data.password
        ) {
            Alert.alert('Missing fields', 'You have some missing fields to fill');
            return;
        };

        if (data.password !== data.comfirmPasword) {
            Alert.alert('Password Mismatch', 'Password and Confirm Password did not match');
            return;
        };

        axios.post(`${URL}/register`, {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            password: data.password,
        }, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {

            console.log('hey');
            console.log('Response!', response.data)

            // const jsonValue = JSON.stringify(response.data)
            // AsyncStorage.setItem('userData', jsonValue)

            Alert.alert(
                'Account Created Successfully', ' Login In',
                [{ text: 'Okay', onPress: () => navigation.navigate('SignIn') }]
            );

        }).catch((err) => {
            console.log('Error!', err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                Alert.alert('Registration Error', err.response.data.message);
            }
        });
        
};

    return (
        <KeyboardAvoidingView behavior='padding'
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 70}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 130, paddingHorizontal: 35, }}
                >
                    <Text style={styles.signInText}>Create your Account</Text>

                    <View style={{ marginBottom: 150 }}>
                       
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            placeholderTextColor= "#eee"
                            value={data.firstName}
                            onChangeText={(val) => setData({ ...data, firstName: val })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor= "#eee"
                            value={data.lastName}
                            onChangeText={(val) => setData({ ...data, lastName: val })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor= "#eee"
                            value={data.email}
                            onChangeText={(val) => setData({ ...data, email: val })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                           
                        />

                        
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor= "#eee"
                            value={data.password}
                            onChangeText={(val) => setData({ ...data, password: val })}
                            secureTextEntry={true}
                        />

                        <TextInput              
                                style={styles.input}
                                placeholder="Comfirm Password"
                                placeholderTextColor="#eee"
                                value={data.comfirmPasword}
                                // secureTextEntry={true}  // Set to true to hide text content
                                onChangeText={(val) => setData({ ...data, comfirmPasword: val })}
                                secureTextEntry={true}
                            />
                        <TouchableOpacity style={styles.addButton}
                            onPress={handleSignUp}
                        >
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#FFA756", // Background color
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"

    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white', // Input border color
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 10,
        color: '#eee'
    },

    option: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    optionText: {
        color: '#fff',
    },

    addButton: {
        backgroundColor: '#fff',
        padding: 13,  // All sides are 10
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        // marginBottom: 20,
    },
    buttonText: {
        color: "#FC6736",
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        borderRadius: 10, // Set the border radius
        borderWidth: 2, // Set the border width
        borderColor: '#3498db', // Set the border color to blue
        padding: 10, // Add some padding for better visual appearance
    },
});

export default SignupScreen;