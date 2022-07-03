/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import usersList from "../component/home";
import Header from './usersListHeader';




const screens = {
    Home : {
        screen : usersList,
        navigationOptions: ({ navigation }) => {
            
            return {
                headerTitle : () => <Header navigation={navigation}  />,
                
            };
        },
},

};
const Users = createStackNavigator(screens,{defaultNavigationOptions:{
                headerStyle: {backgroundColor: '#60aec7', height:50,

            },
            headerTintColor: 'white',
}});

export default Users;
