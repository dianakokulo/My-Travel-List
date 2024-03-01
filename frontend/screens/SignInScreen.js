import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const SignInScreen = function ({ navigation }) {
    const [data, setData] = useState({
        email: "",
        password: "",
    
    });

    const handleSignIn = () => {
        if (!data.email || !data.password) {
            Alert.alert(
                'Missing field', 'Email and Password are required'
            ), [{ text: 'Okay' }];
            return;
        };
    
            axios.post(`${URL}/login`, {
                email: data.email,
                password: data.password,
            }, {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {

                const jsonValue = JSON.stringify(response.data)
                // console.log("j", jsonValue);
                AsyncStorage.setItem('userData', jsonValue)//

             
                // This prevent route back to the login screen when login
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainTabs' }],
                });
    
            }).catch((err) => {
                console.log('Error!', err.response.data)
                if (err.response && err.response.data && err.response.data.message) {
                    Alert.alert('Log in Error', err.response.data.message);
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
                    SafeAreaView showsVerticalScrollIndicator={false}
                    style={{ paddingTop: 130, paddingHorizontal: 35, }}
                >
                    <Text style={styles.signInText}>Sign In</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#eee"
                            value={data.email}
                            onChangeText={(val) => setData({ ...data, email: val })}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor= "#eee"
                            value={data.password}
                            onChangeText={(val) => setData({ ...data, password: val })}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity style={styles.addButton}
                            onPress={handleSignIn}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.option}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup')}
                        >
                            <Text style={styles.optionText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('UpdatePasword')}
                        > 
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
        // padding: 10,  // All sides are 10
        // paddingHorizontal: 50,  // Left and right are 20
    },
    signInText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        marginBottom: 20,
        alignSelf: "center"

    },
    form: {
        justifyContent: "space-between",
        alignContent: "center"
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
        marginBottom: 20,
        borderRadius: 5
    },
    buttonText: {
        color:"#FC6736",
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

export default SignInScreen;