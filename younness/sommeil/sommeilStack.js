/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
import Main from "./main"
import BottomTabBar from "./bottomBar"
import StartAlarm from "./startAlarm"

const Sommeil = createStackNavigator({
  Main : {
        screen : Main,
    },
  BottomTabBar : {
      screen : BottomTabBar,
    },
  StartAlarm : {
    screen : StartAlarm,
  }

   },
   
  
  {
    defaultNavigationOptions : {
      headerShown: false,
    },
    
  } 
  
  );



  export default Sommeil;