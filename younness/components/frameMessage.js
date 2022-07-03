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
import React from "react";
import {View,Text,SafeAreaView,BackHandler,Alert} from 'react-native'



export default class App extends React.Component{
  constructor(props){
    super(props)
    global.routeName = this.props.navigation.state.routeName
  }
  handleBackButton() {
    if (this.props.navigation.state.routeName === "HOME"){
      Alert.alert("Confirm exit","Do you want to exit App?",[
        {text : "CANCEL",},{text : "OK",onPress : ()=>{
          console.log("this is the home screen")
          return true
        }}
      ])
    }
    else {
      console.log("this screen isn't home")
      return false
    }
  }
  
  ComponentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    
  }

  componentWillUnmount() {

    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButton)

    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
  }

    render(){
      return(
        <SafeAreaView style={{flex :1,backgroundColor : "white"}}>
  
        <View
          style={{justifyContent : "center",alignItems:"center",marginTop : "50%"}}
        >
          <Text style={{fontSize : 26,color : "black",fontWeight : "bold",textAlign : "center"}} >This frame is not yet developed</Text>
        </View>
  
        </SafeAreaView>
      )
    }
  }
  
  