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


import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Routes from './component/routes';
import loading from './component/loading';
import HomeScreen from './screens/homescreen';
import CheckConn from './screens/connectivityLost'
import Conversation from './component/chatRoom'
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator } from 'react-navigation-stack';
// @refresh reset

import AsyncStorage from '@react-native-community/async-storage';
import {GiftedChat} from 'react-native-gifted-chat';
import Card from './card';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import About from './component/aboutApp';
import NetInfo from '@react-native-community/netinfo'



/*
 
const appStack = createStackNavigator({
  Home : {
    screen : HomeScreen,
  },
  Conversation : {
    screen : Conversation,
  },
  
 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);

const AuthStack = createStackNavigator({
  Login : {
    screen : Routes,
  },
},
{
 defaultNavigationOptions : {
   headerShown: false,
 },
} 

)



export default createAppContainer(
 createSwitchNavigator({
   Loading : loading,
   App : appStack,
   Auth : AuthStack,
   CheckConn : CheckConn,
 },

 {
   initialRouteName : "Loading"
 }

 )  
)

*/



//-------------------------------------------------------
/*
import RadarChart from './younness/test/radarChart'
export default class App extends React.Component{


  render(){

    return(

      <RadarChart />

    )
  }




} 

*/

/*
import RecProgChoix from './younness/test/recuperationProgrammationChoix'
import RecProgContent from './younness/test/recuperationProgrammeContent'
import RecProgList from './younness/test/recuperationProgrammeList'

const appStack = createStackNavigator({
  RecProgList : {
    screen : RecProgList,
  },
  RecProgChoix : {
    screen : RecProgChoix,
  },
  RecProgContent : {
    screen : RecProgContent,
  },
  
  
 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);





export default createAppContainer(
 createSwitchNavigator({
   App : appStack,
 },

 {
   initialRouteName : "App"
 }

 )  
)
*/



import OptionsMenu from 'react-native-option-menu';
import * as firebase from 'react-native-firebase'
import Swiper from 'react-native-swiper'
import Test from "./younness/components/chatList"
import Login from "./younness/login/authStack"
import Register from "./younness/login/registration"
import ChatRoom from "./younness/components/chatRoom"
import Loading from "./younness/loading/loading"

/*
const AuthStack = createStackNavigator({
  Login : {
    screen : Login,
  },
  Register : {
    screen : Register,
  },

 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);


const appStack = createStackNavigator({
  Test : {
    screen : Test,
  },
  ChatRoom : {
    screen : ChatRoom,
  },
  
 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);





export default createAppContainer(
 createSwitchNavigator({
   Loading : Loading,
   Auth : AuthStack,
   App : appStack,
 },

 {
   initialRouteName : "Loading"
 }

 ) 
  */


import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Modal,Animated,Platform,
   TouchableOpacity,SafeAreaView,ImageBackground,TextInput,Alert} from 'react-native'
   
import CircularProgress from 'react-native-circular-progress-indicator'
import RNSecureStorage,{ACCESSIBLE} from 'rn-secure-storage';
import Test2 from "./younness/loading/loading"
import { Picker } from '@react-native-picker/picker'
import Icon from "react-native-vector-icons/Ionicons"
//import {createSwitchNavigator,createAppContainer,} from 'react-navigation';
//import {createStackNavigator } from 'react-navigation-stack';
const ImagePicker = require("react-native-image-picker");

import ProfileStack from './younness/profile/profileStack'
import Home from "./younness/components/home"
import RadarChart from './younness/test/radarChart'
import Profile from './younness/profile/profileStack';
import Hydration from "./younness/hydration/hydration"
import Settings from "./younness/profile/setting"
import ModifyProfile from "./younness/profile/modifyProfile"
import HomeScreen2 from "./younness/screens/homescreen"
import chatRoom from './younness/components/chatRoom';
import { Easing } from 'react-native-reanimated';
import MindsetCollections from "./younness/mindset/mindsetCollections"
import VideoFrame from "./younness/mindset/videoFrame"



/*
const appStack = createStackNavigator({
  MindsetCollections : {
    screen : MindsetCollections,
  },
  VideoFrame : {
    screen : VideoFrame,
  },

 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);




export default createAppContainer(
 createSwitchNavigator({
   App : appStack,
 },

 {
   initialRouteName : "App",
 }

 )  
)

*/



import {Provider} from "react-redux"
import Store from "./younness/redux/store/configureStore"

const appStack = createStackNavigator({
  Home : {
    screen : HomeScreen2,
  },
  Settings : {
    screen : Settings,
  },
  ModifyProfile : {
    screen : ModifyProfile,
  },
  ChatRoom : {
    screen : ChatRoom
  },

 },
 

{
  defaultNavigationOptions : {
    headerShown: false,
  },
} 

);

const AuthStack = createStackNavigator({
  Login : {
    screen : Login,
  },
},
{
 defaultNavigationOptions : {
   headerShown: false,
 },
} 

)



export default createAppContainer(
 createSwitchNavigator({
   Loading : Loading,
   App : appStack,
   Auth : AuthStack,
 },

 {
   initialRouteName : "Loading",
 }

 )  
)



/*
import ReduxTest from './younness/test/reduxTest';
export default class App extends React.Component{


  render(){
    return(
      <Provider store={Store}>
      <SafeAreaView>
        <ReduxTest />
      </SafeAreaView>
      </Provider>
      )
  }




}

*/


/*
export default class App extends React.Component{

  

    constructor(props){
      super(props)
      
    }
    state = {
      motivation : [],
    }


    componentDidMount(){
      firebase.database().ref("/mindset/category/motivation")
      .once('value',(snap)=>{
        this.setState({motivation : snap.val()})
        console.log(this.state.motivation)
      })
      .catch((e)=>console.log(e))
    }

  render(){
    return(
        <SafeAreaView style={styles.container} >
            <View style={[styles.header,]} >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Free your mind </Text>
                </View>
            </View>
            
            <ScrollView >

            <View style={styles.body}>

                <View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")} >
                        <Text style={styles.categoryTitle} >Motivation videos {">>"} </Text>
                    </TouchableOpacity>
                    <View style={{height : "150%",backgroundColor:"blue"}}>
                      <Swiper
                      showsPagination={false}
                      height='100%'
                      loop
                      autoplay
                      autoplayTimeout={5}
                      >
                        {
                        this.state.motivation.map((item,index)=>{
                         
                         return (
                           <TouchableOpacity 
                            onPress={()=>console.log("item pressed")}
                            key={index}
                            style={{height : "100%"}}
                            >
                            <View style={styles.itemCard} >
                                <Image 
                                    source={{uri : item.image}}
                                    style={styles.itemImage}
                                />
                                <View style={styles.playIcon} >
                                  <Icon 
                                    name="play" size={100} color={"black"}
                                  />
                                </View>
                                <View style={styles.itemTitle}>
                                  <Text style={styles.itemTitleStyle}>{item.title}</Text>
                                  <View style={styles.itemBottomBorder}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                        })
                        
                        }
                      </Swiper>
                    </View>
                </View>
                
                

            </View>

            <View style={styles.body}>

                <View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")} >
                        <Text style={styles.categoryTitle} >Motivation videos {">>"} </Text>
                    </TouchableOpacity>
                    <View style={{height : "150%",backgroundColor:"blue"}}>
                      <Swiper
                      showsPagination={false}
                      loop
                      autoplay
                      autoplayTimeout={5}
                      height='100%'
                      >
                        {
                        this.state.motivation.map((item,index)=>{
                         
                         return (
                           <TouchableOpacity 
                            onPress={()=>console.log("item pressed")}
                            key={index}
                            style={{height : "100%"}}
                            >
                            <View style={styles.itemCard} >
                                <Image 
                                    source={{uri : item.image}}
                                    style={styles.itemImage}
                                />
                                <View style={styles.playIcon} >
                                  <Icon 
                                    name="play" size={100} color={"black"}
                                  />
                                </View>
                                <View style={styles.itemTitle}>
                                  <Text style={styles.itemTitleStyle}>{item.title}</Text>
                                  <View style={styles.itemBottomBorder}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                        })
                        
                        }
                      </Swiper>
                    </View>
                </View>
                
                

            </View>
            
            </ScrollView>


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
    height : 60,
    backgroundColor : "#01011A",
    marginBottom : "0%",
},
headerContent : {
    marginTop : "3%",
    marginBottom : "3%",
    flexDirection : "row",
    justifyContent : "center",
},
headerTitle : {
    fontSize : 26,
    fontWeight : "bold",
    color : "white",
},
body : {
    backgroundColor : "red",
    height : 400,
    marginBottom : "3%"
},
VideoView : {
    marginTop : "4%",
    marginBottom : "4%",
},
smallImage : {
    marginTop : "4%",
    marginBottom : "5%",
    width : "40%",
    height : 200,
    borderRadius : 20,
    borderWidth : 2,
    borderColor : "gray"
  },
wrapper: {
    backgroundColor : "green",
    height : "50%",
    flex : 1
},
category : {
    height : "60%",
    width : "100%",
},
categoryTitle : {
    fontSize : 22,
    fontWeight : "bold",
    color : "black",
    marginTop : "3%",
    marginLeft : "5%",
    marginBottom : "3%",
},
itemCard : {
    height : "90%",
    width : "90%",
    marginLeft : "3%",
    marginTop : "2%",
    marginRight : "3%",
},
itemImage : {
    width : "100%",
    flex : 1,
    alignItems : "center"
},
itemTitle : {
  position : "absolute",
  top : "80%",
  width : "100%",
  justifyContent : "center",
  alignSelf : "center",
  alignItems : "center"
},
itemTitleStyle : {
  fontSize : 26,
  fontWeight : "bold",
  color : "white",
  marginBottom : "2%"

},
itemBottomBorder : {
  width : "90%",
  borderBottomWidth : 2,
  borderBottomColor : "gray",
},
playIcon : {
  position : "absolute",
  top : "35%",
  width : "100%",
  justifyContent : "center",
  alignSelf : "center",
  alignItems : "center"
}
})
*/
//-----------------------------------------------------------

/*
import Sound from "react-native-sound"

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



*/

//---------------------------------------------

/*


export default class App extends React.Component{

constructor(props){
  super(props)
  this.animated = new Animated.Value(0);
  var inputRange = [0, 1];
  var outputRange = ['0deg', '360deg'];
  this.rotate = this.animated.interpolate({inputRange, outputRange});
  outputRange = ['0deg', '-360deg'];
  this.rotateOpposit = this.animated.interpolate({inputRange, outputRange});

}


  state={
    test : new Animated.Value(0),
    test2 : new Animated.Value(0),
    margin : 0
  }

 

  componentDidMount(){
    this.animate()
  
  }
  componentWillUnmount(){
  }

  animate() {
    Animated.loop(
      Animated.timing(this.animated, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
          easing: Easing.linear,
      }),
    ).start();
  }

  render(){
    const transform = [{rotate: this.rotate}];
    const transform1 = [{rotate: this.rotateOpposit}];
    return(
      <View style={styles.container}>

        <Animated.View style={[styles.toCenter,transform]} >
          <Animated.View style={[styles.content,{transform : transform1}]} >
              <View style={styles.dot} />
              <View style={[styles.dot,{marginLeft : "10%",marginTop : "10%"}]} />
              <View style={[styles.dot,{marginLeft : "15%",marginTop : "11%"}]} />
              <View style={[styles.dot,{marginLeft : "20%",marginTop : "13%"}]} />
              <View style={[styles.dot,{marginLeft : "25%",marginTop : "15%"}]} />
              <View style={[styles.dot,{marginLeft : "30%",marginTop : "17%"}]} />
              <View style={[styles.dot,{marginLeft : "35%",marginTop : "19%"}]} />
              <View style={[styles.dot,{marginLeft : "40%",marginTop : "21%"}]} />
              <View style={[styles.dot,{marginLeft : "50%",marginTop : "24%"}]} />

          </Animated.View>
        </Animated.View>


      </View>
    )
  }

}


const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "white",
    width : "80%"
  },
  dot : {
    height : 20,
    width : 20,
    borderRadius : 20/2,
    backgroundColor : "black"
  },
  toCenter : {
    alignSelf : "center",
    marginTop : "50%",
    flex : 1,
    alignContent : "center",
    alignItems : "center",
    justifyContent : "center"
  },
  text: {
    color: '#fff',
  },
  content : {
    width : 200,
    height : 200,
    backgroundColor : "yellow",
  }
})


*/