import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './accountHeader';
import Settings from '../component/settings';


    const screen = {

        home : {
            screen : Settings ,
            navigationOptions : ({ navigation }) => { 
                return {
                    headerTitle : () => <Header navigation={navigation}  />,
                };
            },

        },

    };

    const Account = createStackNavigator(screen,{
        defaultNavigationOptions :{
            headerStyle: { backgroundColor:'#324052',height:50 },
            headerTintColor:'white',
        },
        
    });





export default Account;