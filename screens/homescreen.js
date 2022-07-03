import {createAppContainer} from 'react-navigation';
import  {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import {Image} from 'react-native';
import Account from './account';
import AboutApp from './aboutApp';
// import AboveTab from '../component/theAboveTab'
import LaUne from '../component/laUne';
import Profile from './profileScreen'
import Icon from 'react-native-vector-icons/Ionicons'
const Root = createDrawerNavigator({
    
    // usersList : {
    //     screen : usersList,
    //     navigationOptions : {
    //         drawerIcon :( 
    //             <Image style={{width : 24,height: 24}}
    //             source={require('../assets/home.png')} 
    //              />
    //         ),
    //     },

    // },
    usersList : {
        screen : LaUne,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/home.png')} 
                 />
            ),
        },

    },
    // ChatRoom : {
    //     screen : chatRoom,
    //     navigationOptions : {
    //         drawerIcon :( 
    //             <Image style={{width : 24,height: 24}}
    //             source={require('../assets/home.png')} 
    //              />
    //         ),
    //     },
    // },
    Settings : {
        screen : Account,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/settings.png')} 
                 />
            ),
        },
    },
    Profile : {
        screen: Profile,
        navigationOptions: {
            drawerIcon: (
                <Icon name="person-circle" size={24} color="black" />
            ),
        },
    }
    ,
    About : {
        screen : AboutApp,
        navigationOptions : {
            drawerIcon :( 
                <Image style={{width : 24,height: 24}}
                source={require('../assets/about.png')} 
                 />
            ),
        },
          
    },
       
    
});

export default createAppContainer(Root);
