import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Index from "./Main/Index";
import Login from "./Login/Login";
import ConversationDetail from '../component/conversation/conversatDetail/ConversationDetail';

const Stack = createStackNavigator();


export default function RootLayout(){
    return(
            <Stack.Navigator initialRouteName="Index" screenOptions={{headerShown: true}}>
                <Stack.Screen name="Index" component={Index} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen
                    name="ConversationDetail"
                    component={ConversationDetail}
                    options={{ headerShown: false }} // Hide default header since we made our own
                />
            </Stack.Navigator>
    )
}