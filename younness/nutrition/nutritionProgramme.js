/* eslint-disable no-shadow */
/* eslint-disable keyword-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Modal,
   TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"

export default class App extends React.Component{


  state ={
    choix : "AVANT MATCH",
    breakfast : ["manger/boire x","manger/boire x","manger/boire x","manger/boire x"],
    lunch : ["manger/boire x","manger/boire x","manger/boire x","manger/boire x"],
    sieste : ["manger/boire x","manger/boire x","manger/boire x","manger/boire x"],
    diner : ["manger/boire x","manger/boire x","manger/boire x","manger/boire x"],
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>

          <View style={styles.headerContentStyle}>

            <TouchableOpacity
              onPress={()=>{console.log("left arrow icon pressed")
              this.props.navigation.goBack()
              }}
            >
              <Icon 
                name="arrow-back-circle" size={32} color="white"
              />
            </TouchableOpacity>

            <Text style={styles.headText}>Nutrition liste</Text>

          </View>

        </View>
        <View style={styles.Image}>
          <Image 
            source={require('../assets/programmefoodimage1.jpg')}
            style={
              {
                width : "100%",
                height : "100%",
              }
            }
          />
        </View>
        <View style={styles.body}>

          <View>
            <View style={styles.partOfTheDay}>
              <Text style={styles.partOfTheDayText}>Petit déjauner</Text>
            </View>
            {this.state.breakfast.map((data,index)=>{
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
              <Text style={styles.partOfTheDayText}>Déjauner</Text>
            </View>
            {this.state.lunch.map((data,index)=>{
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
              <Text style={styles.partOfTheDayText}>La Sieste</Text>
            </View>
            {this.state.sieste.map((data,index)=>{
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
              <Text style={styles.partOfTheDayText}>Diner</Text>
            </View>
            {this.state.diner.map((data,index)=>{
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

  },
  header :{
    height : 80,
    backgroundColor : "#00a46c",
    borderBottomColor : "white",
    borderBottomWidth : 1

  },
  headerContentStyle : {
    marginLeft : "6%",
    marginVertical : "5%",
  },
  headText : {
    position : "absolute",
    marginLeft : "20%",
    fontSize : 26,
    fontWeight : 'bold',
    color : "white",
    textAlign : 'center'
  },
  Image : {
    height : 250,
    width : "100%",
    
  },
  body : {
    flex : 1,
    backgroundColor : "white",
  },
  partOfTheDay : {
    height : 60,
    backgroundColor : "#00a46c",
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
    backgroundColor : "#00a46c"
  },
  viewBottomLine : {
    borderBottomWidth : 9,
    borderBottomColor : "#C8CACF",
    marginTop : "3%",
  },
})