/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react";
import {View,Text,StyleSheet,ScrollView,Dimensions,BackHandler,Alert,
   TouchableOpacity,SafeAreaView} from 'react-native'
import {NavigationEvents} from "react-navigation"
import Icon from "react-native-vector-icons/Ionicons"
import Home from "../components/home"
import RadarChart from '../test/radarChart'
import Settings from "../profile/setting"
import Frame from "./frameMessage"
export default class BottomBar extends React.Component{

  constructor(props){
    super(props)

   }

  state = {
    homeSelected : true,
    footballSelected : false,
    tableSelected : false,
    profileSelected : false,
    isFocused : true,
  }
  
  
  onBackButtonPressAndroid = () => {
    console.log("home back press listener executed")
    
    if ( global.dontGoBack === true){
      /*
      Alert.alert("Confirm exit","Do you want to exit App?",[
        {text : "CANCEL",},{text : "YES",onPress : ()=>{
          console.log("user exit App")
          //BackHandler.exitApp()
        }}
      ])
      return true
      */
     console.log("user exit the app")
    }
    else {
      return false
    }
      
    

  };
 
  
  componentDidMount(){
    /*
    BackHandler.addEventListener('hardwareBackPress',this.BackHandler)
    this.test1 = this.props.navigation.addListener('didFocus', () => {
      console.log("home screen is focused")
      global.dontGoBack = true
      
    });
    this.test2 = this.props.navigation.addListener('didBlur', () => {
      console.log("home screen is Blur")
      global.dontGoBack = false
      
    });
    console.log("bottom tab route name :",this.props.navigation.state.routeName)
    */
  }

  componentWillUnmount(){
    /*
    BackHandler.removeEventListener('hardwareBackPress',this.BackHandler)
    this.test1.remove()
    this.test2.remove()
    console.log("component unmounted")
    */
  }
  

  render(){

    return (
      <SafeAreaView style={styles.container} >

        
          <View
            style={{display : this.state.homeSelected ? "flex" : "none",
              zIndex : 20,flex:1
            }}
          >
            <Home navigation={this.props.navigation}/>
          </View>
          <View
            style={{display : this.state.footballSelected ? "flex" : "none",
              flex : 1
            }}
          >
            <RadarChart navigation={this.props.navigation}/>
          </View>
          <View
            style={{display : this.state.tableSelected ? "flex" : "none",flex : 1}}
          >
            <Frame navigation={this.props.navigation}/>
          </View>
          <View
            style={{display : this.state.profileSelected ? "flex" : "none",flex : 1}}
          >
            <Settings navigation={this.props.navigation} />
          </View>


        <View style={styles.bottomTab}>
          <View style={styles.iconView}>
            <TouchableOpacity
              onPress={()=>{
                console.log("icon pressed")
                this.setState({
                  homeSelected : true,
                  footballSelected : false,
                  tableSelected : false,
                  profileSelected : false,
                })
              }}
            >
            <Icon 
              name="home" size ={32} color={this.state.homeSelected ? "white" : "#343232"}
               style={{marginLeft : "6%"}}
            />
            <Text style={[styles.iconLabel,{color : this.state.homeSelected ? "white" : "#343232",}]} >Home</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity
                onPress={()=>{
                  console.log("icon pressed")
                  this.setState({
                    homeSelected : false,
                    footballSelected : true,
                    tableSelected : false,
                    profileSelected : false,
                  })
                }}
              >
              <Icon 
                name="football" size ={32} color={this.state.footballSelected ? "white" : "#343232"}
                style={{marginLeft : "6%"}}
              />
              <Text style={[styles.iconLabel,{color : this.state.footballSelected ? "white" : "#343232",}]} >Football</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity
                onPress={()=>{
                  console.log("icon pressed")
                  this.setState({
                    homeSelected : false,
                    footballSelected : false,
                    tableSelected : true,
                    profileSelected : false,
                  })
                }}
              >
              <Icon 
                name="clipboard" size ={32} color={this.state.tableSelected ? "white" : "#343232"}
                 style={{marginLeft : "6%"}}
              />
              <Text style={[styles.iconLabel,{color : this.state.tableSelected ? "white" : "#343232",}]} >Table</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity
                onPress={()=>{
                  console.log("icon pressed")
                  this.setState({
                    homeSelected : false,
                    footballSelected : false,
                    tableSelected : false,
                    profileSelected : true,
                  })
                }}
              >
              <Icon 
                name="person-circle" size ={32} color={this.state.profileSelected ? "white" : "#343232"}
                 style={{marginLeft : "6%"}}
              />
              <Text style={[styles.iconLabel,{color : this.state.profileSelected ? "white" : "#343232",}]} >Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    )
  }



}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "white"
  },
  bottomTab : {
    flexDirection : 'row',
    alignItems : "center",
    height : 80,
    backgroundColor : "#00a46c",
    justifyContent : "center",
  },
  iconView : {
    marginLeft : "5%",
    marginRight : "5%"
  },
  iconLabel : {
    fontSize : 17,
    color : "#343232",
    
  },

})