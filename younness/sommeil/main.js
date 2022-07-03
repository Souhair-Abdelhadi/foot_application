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
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Alert,BackHandler,
  TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'

export default class App extends React.Component{

  state={
    hours : new Date().getHours(),
    minutes : new Date().getMinutes()
  }

 

  componentDidMount(){
    console.log("route name :",this.props.navigation.state.routeName)

    this.clockInterval = setInterval(() => {
      this.setState({
        hours : new Date().getUTCHours(),
        minutes : new Date().getMinutes()
      })
    }, 10000);


  }

  componentWillUnmount(){
    clearInterval(this.clockInterval)
  }

    render(){

      return(

          <SafeAreaView style={styles.container}>
            <ImageBackground 
              source={require('../assets/moonwithpoints.png')}
              style={styles.imageBackground}
              borderBottomLeftRadius ={50}
              borderBottomRightRadius={50}
            >

              <View style={styles.currentTime}>
                <Text style={styles.currentTimeText}>{this.state.hours < 10 ? "0" + this.state.hours  : this.state.hours} : {this.state.minutes < 10 ? "0" + this.state.minutes  : this.state.minutes}</Text>
              </View>

              <View style={styles.alarmView}>
                <Text style={styles.alarmViewText}>No alarm settled yet</Text>
              </View>

              <View style={styles.badTime}>
                <Text style={styles.badTimeText}>Bed Time alarm</Text>
              </View>
        
            </ImageBackground>

            <View style={styles.secondAlarm}>
              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate("BottomTabBar")
                }}
              >
                <Text style={styles.secondAlarmText}>{'>'} Set Alarm </Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        )


    }



}

const styles = StyleSheet.create({

  container : {
    flex : 1,
  },
  firstView : {
    height : Dimensions.get('window').height - 200,
    backgroundColor : "red",
    borderBottomLeftRadius : 50,
    borderBottomRightRadius : 50,

  },
  imageBackground : {
    height : Dimensions.get('window').height - 100,
    width : "100%",
  },
  currentTime : {
    backgroundColor : "white",
    height : 50,
    width : "80%",
    marginTop : "15%",
    marginLeft : "10%",
    borderRadius : 30,
    justifyContent : 'center',
    alignItems : "center"
  },
  currentTimeText : {
    fontSize : 30,
    fontWeight : "bold",
    color : "#031626"
  },
  badTime : {
    marginTop : "80%",
    justifyContent : "center",
    alignItems : "center",
  },
  badTimeText : {
    fontSize : 40,
    fontWeight : "bold",
    color : "white"
  },
  secondAlarm : {
    marginTop : "10%",
    justifyContent : "center",
    alignItems : "center"
  },
  secondAlarmText :  {
    fontSize : 30,
    fontWeight : "bold",
    color : "black"
  },
  alarmView : {
    marginTop : "4%",
    justifyContent : 'center',
    alignItems : "center"
  },
  alarmViewText : {
    fontSize : 20,
    color : "white"
  }

})