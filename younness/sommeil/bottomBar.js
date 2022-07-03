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
import {View,Text,StyleSheet,ScrollView,Dimensions,
   TouchableOpacity,SafeAreaView} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
const ImagePicker = require("react-native-image-picker");
import SleepRecord from "./sleepRecord"
import Alarm from "./Alarm"

export default class App extends React.Component{

  state = {
    homeSelected : true,
    footballSelected : false,
  }
  
  render(){
    return (
      <SafeAreaView style={styles.container} >

          <View
            style={{display : this.state.homeSelected ? "flex" : "none",
              zIndex : 20,flex : 1,
            }}
          >
            <SleepRecord navigation={this.props.navigation}/>
          </View>
          <View
            style={{display : this.state.footballSelected ? "flex" : "none",
              height : Dimensions.get('screen').height,flex : 1,
            }}
          >
            <Alarm navigation={this.props.navigation}/>
          </View>
          


        <View style={styles.bottomTab}>
          <View style={styles.iconView}>
            <TouchableOpacity
              onPress={()=>{
                console.log("icon pressed")
                this.setState({
                  homeSelected : true,
                  footballSelected : false,
                })
              }}
            >
            <Icon 
              name="moon" size ={32} color={this.state.homeSelected ? "white" : "#343232"}
               style={{marginLeft : "6%"}}
            />
            <Text style={[styles.iconLabel,{color : this.state.homeSelected ? "white" : "#343232",}]} >Records</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconView}>
            <TouchableOpacity
                onPress={()=>{
                  console.log("icon pressed")
                  this.setState({
                    homeSelected : false,
                    footballSelected : true,
                  })
                }}
              >
              <Icon 
                name="alarm" size ={32} color={this.state.footballSelected ? "white" : "#343232"}
                style={{marginLeft : "6%"}}
              />
              <Text style={[styles.iconLabel,{color : this.state.footballSelected ? "white" : "#343232",}]} >Alarm</Text>
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