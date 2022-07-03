/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import chatUI from "../component/chatRoom";
import Header from './chatUIHeader';




const screens = {
    chat : {
        screen : chatUI,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},
};
const chatui = createStackNavigator(screens,{defaultNavigationOptions:{
                headerStyle: {backgroundColor: '#60aec7', height:50,

            },
            headerTintColor: 'white',
}});

export default chatui;
