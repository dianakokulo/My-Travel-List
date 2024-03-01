import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Pressable, Platform, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import { URL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [checkedItems, setCheckedItems] = useState([]);
    const [newItem, setNewItem] = useState({
        item: "",
        itemNum: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            const { id, firstname } = JSON.parse(userData);

            const response = await axios.get(`${URL}/item/${id}`);
            setData(response.data);

            setFirstName(firstname);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleCheckbox = (index) => {
        let newCheckedItems = [...checkedItems];
        if (newCheckedItems.includes(index)) {
            newCheckedItems = newCheckedItems.filter((item) => item !== index);
        } else {
            newCheckedItems.push(index);
        }
        setCheckedItems(newCheckedItems);
    };

    const renderCheckBox = (index) => {
        return (
            <CheckBox
                checked={checkedItems.includes(index)}
                onPress={() => toggleCheckbox(index)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                checkedColor="#FFA756"
            />
        );
    };

    const handleAddItem = async () => {
        try {
            if (newItem.item.trim() === '') {
                Alert.alert('Please enter an item.');
                return;
            }

            const userData = await AsyncStorage.getItem("userData");
            const { id } = JSON.parse(userData);

            const response = await axios.post(`${URL}/item`, {
                item_name: newItem.item,
                item_number: newItem.itemNum,
                user_id: id
            });
            setData([...data, response.data]);
            setNewItem({ item: "", itemNum: "" });
            Keyboard.dismiss()

        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${URL}/delete/${itemId}`);
            setData(data.filter(item => item.id !== itemId));
            
        } catch (error) {
            console.error("Error deleting item");
        }
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <SafeAreaView style={{flex: 1}}>
                    <View style={styles.header}>
                        <Text style={styles.smallText}>Hi {firstName}</Text>
                        <Text style={styles.headerText}>What do you need for your trip?</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <View style={styles.dropDown}>
                            <RNPickerSelect
                                onValueChange={(val) => setNewItem({ ...newItem, itemNum: val })}
                                placeholder={{}}
                                items={[
                                    { label: '1', value: '1' },
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                    { label: '4', value: '4' },
                                    { label: '5', value: '5' },
                                    { label: '6', value: '6' },
                                    { label: '7', value: '7' },
                                    { label: '8', value: '8' },
                                    { label: '9', value: '9' },
                                    { label: '10', value: '10' },
                                ]}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Item"
                            value={newItem.item}
                            onChangeText={(val) => setNewItem({ ...newItem, item: val })}
                        />
                    </View>
                    <Pressable style={styles.addButton} 
                        onPress={handleAddItem}
                    >
                        <Text style={styles.buttonText}>Add</Text>
                    </Pressable>

                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
                    >
                    {data.map((item, index) => (
                        <View style={styles.itemContainer} key={index}>
                            {renderCheckBox(index)}
                            <Text style={{
                                ...styles.itemTitle,
                                textDecorationLine: `${checkedItems.includes(index) ? 'line-through' : 'none'}`,
                                textDecorationStyle: 'double',
                                textDecorationColor: '#FFA756'
                            }}>
                                {`${item.item_number} ${item.item_name}`}
                            </Text>
                            <Pressable onPress={() => handleDeleteItem(item.id)}>
                                <Fontisto name="close-a" size={20} color="#FFA756" />
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                </SafeAreaView>
                </View>
        // </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 0,
    },
    // scrollContainer: {
    //     // flexGrow: 1,
    //     paddingBottom: 30
    // },
    header: {
        gap: 5,
        marginBottom: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        width: '80%',
        // marginTop: 20,
        // paddingHorizontal: 20
    },
    smallText: {
        color: "#000",
        marginTop: 50, 
        // paddingHorizontal: 20
    },
    itemContainer: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: '#F5F7F8',
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    itemTitle: {
        fontWeight: "bold",
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center'
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F7F8',
        padding: 13,
        marginVertical: 20,
        borderRadius: 5
    },
    dropDown: {
        backgroundColor: '#F5F7F8',
        paddingLeft: 25,
        height: 45,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    addButton: {
        backgroundColor: '#FFA756',
        padding: 13,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignSelf: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default HomeScreen;
