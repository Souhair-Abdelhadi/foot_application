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
import {View,Text,StyleSheet,Animated,Alert,
   TouchableOpacity,SafeAreaView} from 'react-native'
import Sound from "react-native-sound"
import {Easing} from "react-native-reanimated"
export default class App extends React.Component{


  state = {
    colorsAnimation : new Animated.Value(0),
    sound : null,
    stopClicked : false,
  } 


  startAlarmSound =  () =>{
    if( (this.state.sound !== null ) && ( this.state.stopClicked === false ) ){
      
      this.state.sound.play()
      console.log("sound played again")
     
    }
    else if( (this.state.sound !== null ) && ( this.state.stopClicked === true ) ){
      this.state.sound.stop()
      return
    }
    else{
    const sound =  new Sound("alarmsound.mp3", Sound.MAIN_BUNDLE, async (error) => {
      this.setState({sound : sound});
      if (error) {
          console.log("failed to load the sound", error);
          this.setState({sound : null});
      }
      else{
        
        sound.play(success => {
            
            if (!success) {
                Alert.alert("There was an error playing this audio");
                this.setState({sound : null})
            }
            else{
              this.setState({sound : sound,stopClicked : false});
              console.log(success, "success play");
              this.startAlarmSound()
            }
        });
      }

  });
  }
}

  componentDidMount(){
    
    Animated.loop(
    Animated.timing(this.state.colorsAnimation,{
      toValue : 1,
      duration : 2000,
      useNativeDriver : false,
      easing : Easing.linear

    })).start()
    

    this.startAlarmSound()

  }


  render(){
    const colorsAnimation = this.state.colorsAnimation.interpolate({
      inputRange : [0,0.5,1],
      outputRange : ["#FF0000","#8A2F2F","#FF0000"]
    })
    return(
      <SafeAreaView style={styles.container} >
        <View style={styles.header} >
          <View style={styles.alarmView} >
            <Text style={styles.alarmTextStyle} >Alarm</Text>
          </View>
          <View style={styles.timeView} >
            <Text style={styles.timeTextStyle} >10 : 00</Text>
          </View>
        </View>
        <View style={styles.body} >
          <View style={styles.buttonView} >
            <TouchableOpacity style={styles.touchableCircle}
              onPress={()=>{
                this.setState({stopClicked : true})
                this.state.sound.stop()
                console.log("alarm stopped")
              }}
             >
              <Animated.View style={[styles.circle,{backgroundColor : colorsAnimation}]}>
                  <Text style={styles.circleText} >Stop</Text>
              </Animated.View>
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
    backgroundColor : "white",

  },
  header : {
    backgroundColor : "#00a46c",
    height : "40%",
    justifyContent : "center",
    borderBottomLeftRadius : 40,
    borderBottomRightRadius : 40
  },
  alarmView : {
    marginTop : "4%",
    alignItems : "center",

  },
  alarmTextStyle : {
    fontSize : 40,
    fontWeight : "bold",
    color : "white"
  },
  timeView : {
    marginTop : "4%",
    alignItems : "center",
  },
  timeTextStyle : {
    fontSize : 25,
    fontWeight : "bold",
    color : "white"
  },
  body : {
    flex : 1,
    justifyContent : "center",

  },
  buttonView : {
    marginTop : "5%",
    alignItems : "center",
  },
  circle : {
    height : 90,
    width : 90,
    borderRadius : 90/2,
    alignItems : "center",
    justifyContent : "center"
    },
  touchableCircle : {
    height : 90,
    width : 90,
    borderRadius : 90/2,

  },
  circleText : {
    fontSize : 22,
    fontWeight : "normal",
    color : "white"
  }
})



