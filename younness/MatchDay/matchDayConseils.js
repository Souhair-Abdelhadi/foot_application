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

import React from 'react'
import {SafeAreaView,View,Text,StyleSheet,Image,ScrollView
  ,TouchableOpacity,ImageBackground,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export default class App extends React.Component{

    state ={
      choix : "AVANT MATCH",
      AvantMatch : ["Faire x","Faire x","Faire x","Faire x"],
      PendantMatch : ["Faire x","Faire x","Faire x","Faire x"],
      AprésMatch : ["Faire x","Faire x","Faire x","Faire x"],
      viewKey : 0,
    }


    messageIdGenerator = () => {
      // generates uuid.
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
          let r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
      });
  }
  componentWillUnmount() {


    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
}

  render(){

    return(

      <SafeAreaView style={styles.container}>

        <ScrollView>

        
        
        <View style={styles.body}>

          <View>
            <View style={styles.partOfTheDay}>
              <Text style={styles.partOfTheDayText}>AVANT MATCH</Text>
            </View>
            {this.state.AvantMatch.map((data,index)=>{
              console.log(data)
              return (
                <View style={styles.content} key={index} >
                  <View style={styles.inlineItems}>
                    <View style={styles.point} />
                    <View >
                      <Text style={styles.contentItem}>{data}</Text>
                    </View>
                  </View>
                  <View style={styles.viewBottomLine}/>
                </View>
              )
            })}
            
          </View>

          <View>
            <View style={styles.partOfTheDay}>
              <Text style={styles.partOfTheDayText}>PENDANT MATCH</Text>
            </View>
            {this.state.PendantMatch.map((data,index)=>{
              console.log(data)
              return (
                <View style={styles.content} key={index} >
                  <View style={styles.inlineItems}>
                    <View style={styles.point} />
                    <View >
                      <Text style={styles.contentItem}>{data}</Text>
                    </View>
                  </View>
                  <View style={styles.viewBottomLine}/>
                </View>
              )
            })}
            
          </View>

          <View>
            <View style={styles.partOfTheDay}>
              <Text style={styles.partOfTheDayText}>APRES MATCH</Text>
            </View>
            {this.state.AprésMatch.map((data,index)=>{
              console.log(data)
              return (
                <View style={styles.content} key={index} >
                  <View style={styles.inlineItems}>
                    <View style={styles.point} />
                    <View >
                      <Text style={styles.contentItem}>{data}</Text>
                    </View>
                  </View>
                  <View style={styles.viewBottomLine}/>
                </View>
              )
            })}
            
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
    backgroundColor : 'white',
  },
  header :{
    height : 80,
    backgroundColor : "#0f0617",

  },
  headerContentStyle : {
    marginLeft : "6%",
    marginVertical : "5%",
  },
  headText : {
    position : "absolute",
    marginLeft : "20%",
    fontSize : 20,
    fontWeight : 'bold',
    color : "white",
  },
  body : {
    flex : 1,
    backgroundColor : "white",
  },
  partOfTheDay : {
    height : 60,
    backgroundColor : "#408DCD",
    justifyContent : "center",

  },
  partOfTheDayText : {
    fontSize : 20,
    fontWeight : 'bold',
    color : "white",
    alignSelf :"baseline",
    marginLeft : "5%"
  },
  content : {
  },
  inlineItems : {
    flexDirection : "row",
    alignItems : "center",
  },
  contentItem : {
    fontSize : 22,
    fontWeight : 'bold',
    color : "black"
  },
  point : {
    height : 12,
    width : 12,
    borderRadius : 12/2,
    marginRight : "4%",
    marginLeft : "4%",
    backgroundColor : "#408DCD"
  },
  viewBottomLine : {
    borderBottomWidth : 9,
    borderBottomColor : "#C8CACF",
    marginTop : "3%",
  },
})