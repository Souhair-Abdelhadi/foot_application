/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react"
import RNSecureStorage,{ACCESSIBLE} from "rn-secure-storage"
import PushNotification from "react-native-push-notification"
import {View,Text,StyleSheet,Alert,Platform,
    TouchableOpacity,SafeAreaView,ImageBackground,TextInput} from 'react-native'
 import BackgroundTimer from "react-native-background-timer"
 import Icon from "react-native-vector-icons/Ionicons"
import Sound from "react-native-sound"
export default class App extends React.Component{

  constructor(props){
    super(props)

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        
        // process the notification
        //PushNotification.invokeApp(notification)
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

        PushNotification.createChannel(
          {
            channelId: this.state.channelId, // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "alarmsound.mp3", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }


  state = {
    channelId : this.messageIdGenerator(),
    bedMinutes : 0,
    bedHours : 0,
    wakeUpMinutes : 0,
    wakeUpHours : 0,
    currentHour : "00",
    currentMinute : "00",
    alarmThread : null,
  }


   messageIdGenerator() {
    // generates uuid.
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
          let r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
      });
  }

  incrementHours = (hour) => {
    
    if(hour >= 24){
      this.setState({hours : 0})
    }
    else{
      this.setState({hours : hour+1})
    }
  }

  decrementHours = (hour) => {

     if(hour <=0){
      this.setState({hours : 23})

    }
    else{
      this.setState({hours : hour-1})
    }
  }

  incrementMinutes = (minute) => {
    
    if(minute >= 59){
      this.setState({minutes : 0})
    }
    else{
      this.setState({minutes : minute+1})
    }
  }

  decrementMinutes = (minute) => {

     if(minute <= 0){
      this.setState({minutes : 59})

    }
    else{
      this.setState({minutes : minute-1})
    }
  }

  pushNot(){
    
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: this.state.channelId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      bigText: "alarm Notification", // (optional) default: "message" prop
      bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
      bigLargeIcon: "ic_launcher", // (optional) default: undefined
      bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      //priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      
      when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
      messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 
    
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true    
      /* iOS and Android properties */
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "My Notification Title", // (optional)
      message: "My Notification Message", // (required)
      picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: false, // (optional) default: true
      soundName: "alarmsound.mp3", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }

  setAlarm = ()=>{
    RNSecureStorage.set("alarmTime",
      JSON.stringify({hour : this.state.hours,minute : this.state.minutes}),
      {accessible : ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY}).then(()=>{
        console.log("alarm time is set")
      })
      .catch((e)=>console.log("error while setting alarm time"))
    // Start a timer that runs continuous after X milliseconds
    const intervalId = BackgroundTimer.setInterval(() => {
      // this will be executed every 5000 ms
      // even when app is the the background
      if((new Date().getHours() == this.state.hours) && (new Date().getMinutes() == this.state.minutes)){
        console.log("alarm start")
        this.props.navigation.navigate("StartAlarm")
        Alert.alert('alarm start')
        this.pushNot()
        this.props.navigation.navigate("StartAlarm")
      //BackgroundTimer.clearInterval(intervalId)
      }
    }, 60 * 1000);



  }
 
  componentDidMount(){
    

    console.log("first date",new Date().getHours(),"minutes :",new Date().getMinutes())
    console.log("second date",new Date(Date.now() + 10000))

    RNSecureStorage.get("alarmTime").then((data)=>{
      if(data != null){
        var timeObject = JSON.parse(data)
        this.setState({hours : timeObject.hour,minutes : timeObject.minute})
        this.setAlarm()
      }
    })
    .catch((e)=>console.log(e))
    
  

  }
  render(){

    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.headText}>Set time for the alarm </Text>
        </View>


        <View style={styles.body}>

          <View style={styles.timer}>
            <View style={styles.timerBox}>
              <TouchableOpacity
                onPress={()=>{
                  this.decrementHours(this.state.bedHours)
                }}
              >
                <Icon 
                  name="chevron-up" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <View style={styles.time}>
                <Text style={styles.timeText}>{this.state.bedHours <10 ? "0"+this.state.bedHours:this.state.bedHours}</Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.incrementHours(this.state.bedHours)
                }}
              >
                <Icon 
                  name="chevron-down" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.timerBox}>
            <TouchableOpacity
                onPress={()=>{
                  this.decrementMinutes(this.state.bedMinutes)
                }}
              >
                <Icon 
                  name="chevron-up" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <View style={styles.time}>
                <Text style={styles.timeText}>{this.state.bedMinutes <10 ? "0"+this.state.bedMinutes:this.state.bedMinutes}</Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.incrementMinutes(this.state.bedMinutes)
                }}
              >
                <Icon 
                  name="chevron-down" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>


        </View>


        <View style={styles.body}>

          <View style={styles.timer}>
            <View style={styles.timerBox}>
              <TouchableOpacity
                onPress={()=>{
                  this.decrementHours(this.state.wakeUpHours)
                }}
              >
                <Icon 
                  name="chevron-up" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <View style={styles.time}>
                <Text style={styles.timeText}>{this.state.wakeUpHours <10 ? "0"+this.state.wakeUpHours:this.state.wakeUpHours}</Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.incrementHours(this.state.wakeUpHours)
                }}
              >
                <Icon 
                  name="chevron-down" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.timerBox}>
            <TouchableOpacity
                onPress={()=>{
                  this.decrementMinutes(this.state.wakeUpMinutes)
                }}
              >
                <Icon 
                  name="chevron-up" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
              <View style={styles.time}>
                <Text style={styles.timeText}>{this.state.wakeUpMinutes < 10 ? "0" + this.state.wakeUpMinutes : this.state.wakeUpMinutes}</Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.incrementMinutes(this.state.wakeUpMinutes)
                }}
              >
                <Icon 
                  name="chevron-down" color="black" size={32}
                  style={styles.iconStyle}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={()=>{
                console.log("hour : ",this.state.wakeUpHours,"minute : ",this.state.wakeUpMinutes)
                this.setAlarm()
                Alert.alert("please don't set another alarm because this is just for demo ")
              }}
            >
              <Text style={styles.buttonText} >Set alarm</Text>
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
  head : {
    height : 150,
    backgroundColor : "#00a46c",
    alignItems : "center",
    justifyContent : "center"
  },
  headText : {
    fontSize : 28,
    fontWeight : "bold",
    color : "white",
  },
  body : {
    flex : 1,
    backgroundColor : "white",

  },
  timer : {
    flexDirection : "row",
    alignSelf : "center",
    marginTop : "30%",
  },
  timerBox : {
    width : "15%", 
    borderColor : "black",
    borderWidth : 3,
    marginRight : "5%",
  },
  time : {
    justifyContent : "center",
    alignItems : "center"
  },
  timeText : {
    fontSize : 20,
    fontWeight :"bold",
    color : "black",

  },
  iconStyle : {
    alignSelf : "center"
  },
  button : {
    alignSelf : "center",
    marginTop : "10%",
    backgroundColor : "#00a46c",
    justifyContent : "center",
    alignItems : "center",
    borderRadius : 15,
    marginLeft : "-5%"
  },
  buttonText : {
    fontSize : 24,
    fontWeight : "bold",
    color :"white",
    margin : "1%"
  }
})