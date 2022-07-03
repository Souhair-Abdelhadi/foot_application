/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './HomeHeader';
import chatRoom from '../component/chatRoom';


    const screen = {

        chatRoom : {
            screen : chatRoom ,
            navigationOptions : ({ navigation }) => { 
                return {
                    headerTitle : () => <Header navigation={navigation}  />,
                    
                };
            },

        },

    };

    const HomeStack = createStackNavigator(screen,{
        defaultNavigationOptions :{
            headerStyle : {backgroundColor:'#60aec7',height:50 },
            headerTintColor:'white',
        },
        
    });





export default HomeStack;
