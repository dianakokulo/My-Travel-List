import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignInScreen from "../screens/SignInScreen";
import SignupScreen from "../screens/SignUpScreen";


const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
                <AuthStack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{
                        headerShown: false
                    }}
                />
                <AuthStack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{
                        headerShown: false
                    }}
                />

                {/* <AuthStack.Screen
                    name="UpdatePasword"
                    component={PasswordUpdateScreen}
                    options={{
                        headerShown: false
                    }}
                /> */}
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#FFA756',
                    borderTopRightRadius: 25,
                    borderTopLeftRadius: 25,
                    height: 90,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'user';
                    }

                    return <AntDesign name={iconName} size={35} color="#FFFFFF" />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: '',
                    headerTitleAlign: 'center',
                    animation: 'none',
                    headerStyle: {
                        backgroundColor: '#eee',
                    },
                    headerTitleStyle: {
                        // color: '#fff',
                    },
                    // headerShown: false,
                    // headerShadowVisible: false,
                }}

            />
        </Tab.Navigator> 
    );
};

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{
                title: 'Home Screen',
                animation: 'none',
                headerBackTitleVisible: true,
                headerShown: false,
            }}
        />

    </HomeStack.Navigator>
);

export default AppNavigator;