/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import {createAppContainer} from 'react-navigation';
import  {createDrawerNavigator,DrawerItems,} from 'react-navigation-drawer';
import React from 'react';
import {connect} from "react-redux"
import {Image,View,SafeAreaView,Text,StyleSheet,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Home from "../components/bottomBar"
import Nutrition from "../nutrition/nutritionStack"
import Hydration from "../hydration/hydration"
import Mindset from "../mindset/mindsetStack"
import Messenger from "../components/chatList"
import Sommeil from "../sommeil/sommeilStack"
import ProfileStack from "../profile/profileStack"
import Profile from "../profile/setting"
import Recuperation from '../recuperation/recuperationStack';
import MatchDay from "../MatchDay/matchDayStack"
import RNSecureStorage,{ACCESSIBLE} from 'rn-secure-storage';
import CustopmizeProfileHeader from './custopmizeProfile';
    var imageLoaded = false

    function customizeProfile(props){

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                
                    <View style={styles.head}>
                        <CustopmizeProfileHeader />
                    </View>
                    <DrawerItems  {...props} />
                </ScrollView>
            </SafeAreaView>
        )
        
    }
const Root = createDrawerNavigator({
    
    HOME : {
        screen : Home,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="home" size={24} color="black"
                />
            ),
            
        },

    },

    NUTRITION : {
        screen : Nutrition,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="nutrition" size={24} color="black"
                />
            ),
        },
    },
    HYDRATION : {
        screen: Hydration,
        navigationOptions: {
            drawerIcon: (
                <Icon name="person-circle" size={24} color="black" />
            ),
        },
    }
    ,
    MINDSET : {
        screen : Mindset,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="bulb" size={24} color="black"
                />
            ),
        },
          
    },
    MESSENGER : {
        screen : Messenger,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="chatbubble" size={24} color="black"
                />
            ),
        },
          
    },
    SOMMEIL : {
        screen : Sommeil,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="moon" size={24} color="black"
                />
            ),
        },
          
    },
    RECUPERATION : {
        screen : Recuperation,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="body" size={24} color="black"
                />
            ),
        },
          
    },
    "MATCH DAY" : {
        screen : MatchDay,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="football" size={24} color="black"
                />
            ),
        },
          
    },
    Profile : {
        screen : Profile,
        navigationOptions : {
            drawerIcon :( 
                <Icon 
                    name="person" size={24} color="black"
                />
            ),
        },

          
    },
       
},
{
    contentComponent  : customizeProfile,
}
);

const styles = StyleSheet.create({
    container : {

    },
    head : {
        height : 200,
        justifyContent : "center",
        alignItems : "center",
    },
    image : {
        height : 120,
        width : 120,
        borderRadius : 120/2,
    },
    headText : {
        fontSize : 23,
        fontWeight : "bold",
        
    }

})


export default createAppContainer(Root);
