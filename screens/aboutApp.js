/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import AboutApp from "../component/aboutApp";
import Header from './aboutAppHeader';




const screens = {
    About : {
        screen : AboutApp,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},
};
const aboutApp = createStackNavigator(screens,{defaultNavigationOptions:{
    headerStyle: {
        backgroundColor: '#324052', height:50,

            },
            headerTintColor: 'white',
}});

export default aboutApp;
