import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Header from './UserProfileHeader';
import userProfile from '../component/userProfile';
import ChangeProfileData from './changeProfileDataScreen'
import {Text,StyleSheet} from 'react-native'

const screen = {

    Profile: {
        screen: userProfile,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,

            };
        },

    },
    ChangeProfileData : {
        screen :  ChangeProfileData,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Text style={styles.text} >Change Profile Data</Text>  ,

            };
        },
    }

};

const UserProfile = createStackNavigator(screen, {
    defaultNavigationOptions: {
        headerStyle: { backgroundColor: '#324052', height: 50 },
        headerTintColor: 'white',
    },

});


const styles = StyleSheet.create({
    text : {
        fontSize : 22,
        fontWeight:'bold',
        color : 'white',
        textAlign : 'center'
    }
})


export default UserProfile ;