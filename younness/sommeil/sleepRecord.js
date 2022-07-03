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
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,
  TouchableOpacity,SafeAreaView} from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import Icon from "react-native-vector-icons/Ionicons"
export default class App extends React.Component{

  state={
    hours : new Date().getUTCHours(),
    minutes : new Date().getMinutes()
  }

  
 
    render(){

      return(

          <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.head}>
                <Text style={styles.headText}>Today</Text>
                <Text style={styles.headSmallText}>{new Date().getUTCDate()}/{new Date().getUTCMonth()}/{new Date().getUTCFullYear()}</Text>
                </View>
                <View style={styles.firstSection}>
                <View style={styles.quality}>
                    <Text style={styles.qualityText}>Quality</Text>
                    <View
                    style={{
                        alignSelf : "center",
                        marginTop : "20%"
                    }}
                    >
                    <CircularProgress
                        value={60}
                        radius={60}
                        duration={2000}
                        textColor={'#101315'}
                        maxValue={100}
                        activeStrokeColor={'#101315'}
                        valueSuffix={"%"}
                        
                    />
                    </View>
                </View>
                <View style={styles.duration}>
                    <Text style={styles.durationText}>Duration</Text>
                    <View 
                    style={
                    {
                        marginTop : "15%",
                        marginLeft : "5%"
                    }
                    }>
                    <View style={styles.durationContentView}>
                        <Text style={styles.durationContentText}>7h 25m</Text>
                        <Text style={styles.durationContentSmallText}>Total Sleep</Text>
                    </View>

                    <View style={styles.durationContentView}>
                        <Text style={styles.durationContentText}>7h 50m</Text>
                        <Text style={styles.durationContentSmallText}>in bed</Text>
                    </View>

                    </View>
                </View>
                
                </View>

                <View style={styles.secondSection}>
                <Text style={styles.secondSectionText}>Sleep information</Text>
                    <View style={styles.secondSectionCard}>
                    <View style={styles.secondSectionCardContent}>
                        <Icon 
                        name="moon" size={32} color={"black"}
                        style={{
                            marginRight : "3%"
                        }}
                        />
                        <View style={styles.secondSectionCardView}>
                        <Text style={styles.secondSectionCardText}>2h 40m</Text>
                        <Text style={styles.secondSectionCardSmallText}>Deep sleep</Text>
                        </View>
                    </View>

                    <View style={[styles.secondSectionCardContent,{marginLeft : "15%"}]}>
                        <Icon 
                        name="bed" size={32} color={"black"}
                        style={{
                            marginRight : "3%"
                        }}
                        />
                        <View style={styles.secondSectionCardView}>
                        <Text style={styles.secondSectionCardText}>20m</Text>
                        <Text style={styles.secondSectionCardSmallText}>Fell asleep</Text>
                        </View>
                    </View>

                    </View>

                    <View style={styles.secondSectionCard}>
                    <View style={styles.secondSectionCardContent}>
                        <Icon 
                        name="bed" size={32} color={"black"}
                        style={{
                            marginRight : "3%"
                        }}
                        />
                        <View style={styles.secondSectionCardView}>
                        <Text style={styles.secondSectionCardText}>11:30 PM</Text>
                        <Text style={styles.secondSectionCardSmallText}>Went to bed</Text>
                        </View>
                    </View>

                    <View style={[styles.secondSectionCardContent,{marginLeft : "15%"}]}>
                        <Icon 
                        name="sunny" size={32} color={"black"}
                        style={{
                            marginRight : "3%"
                        }}
                        />
                        <View style={styles.secondSectionCardView}>
                        <Text style={styles.secondSectionCardText}>7:30 AM</Text>
                        <Text style={styles.secondSectionCardSmallText}>Woke up</Text>
                        </View>
                    </View>

                    </View>
                </View>
                <Image
                        source={require('../assets/beddesign.jpg')}
                        style={styles.bedImage}
                    />
            </ScrollView>
          </SafeAreaView>
        )


    }



}

const styles = StyleSheet.create({

  container : {
    flex : 1,
  },
  head : {
      height : 60,
      backgroundColor : "white",
      marginTop : "6%",
      marginLeft : "6%"
  },
  headText : {
    fontSize : 26,
    fontWeight : "bold",
    color : "black",
  },
  headSmallText : {
    fontSize : 20,
    color : "gray",
  },
  firstSection : {
    width : "90%",
    flexDirection : "row",
    justifyContent : "center",
    alignSelf : "center",
    marginTop : "8%",


  },
  quality : {
    backgroundColor : "#E8EAEB",
    width : "45%",
    borderRadius : 10,
    height : 250,
    marginRight : "5%"
  },
  qualityText : {
    fontSize : 22,
    fontWeight : "bold",
    color : "black",
    marginLeft : "4%",
    marginTop : "2%"
  },
  duration : {
    backgroundColor : "#E8EAEB",
    width : "45%",
    borderRadius : 10,
    height : 250,
    
  },
  durationText : {
    fontSize : 22,
    fontWeight : "bold",
    color : "black",
    marginLeft : "4%",
    marginTop : "2%"
  },
  durationContentText : {
    fontSize : 25,
    fontWeight : "bold",
    color : "black",
  },
  durationContentSmallText : {
    fontSize : 18,
    color : "gray",
  },
  durationContentView : {
    marginTop : "3%",
    marginBottom : "2%",
  },
  secondSection : {
    backgroundColor : "#E8EAEB",
    width : "90%",
    borderRadius : 10,
    height : 200,
    alignSelf : "center",
    marginTop : "10%"
  },
  secondSectionText : {
    fontSize : 18,
    fontWeight : "bold",
    color : "black",
    marginLeft : "4%",
    marginTop : "2%"
  },
  secondSectionCard : {
    flexDirection : "row",
    marginTop : "8%",
    marginLeft : "3%"
  },
  secondSectionCardContent : {
    flexDirection : "row",
    justifyContent : "center",

  },
  secondSectionCardView : {
    justifyContent : "center",
    alignItems : "center"
  },
  secondSectionCardText : {
    fontSize : 20,
    fontWeight : "bold",
    color : "black",
  },
  secondSectionCardSmallText : {
    fontSize : 15,
    color : "black",
  },
  bedImage : {
      width : "100%",
      marginTop : "6%",
      height : 100
  }
})