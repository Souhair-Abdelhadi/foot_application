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
      choix : "Début de journée",

    }


  render(){

    return(

      <SafeAreaView style={styles.container}>

        <ScrollView>
        <View style={styles.header}>

          <View style={styles.headerContentStyle}>

            <TouchableOpacity
              onPress={()=>{
                console.log("left arrow icon pressed")
                this.props.navigation.goBack()
              }}
            >
              <Icon 
                name="arrow-back-circle" size={32} color="white"
              />
            </TouchableOpacity>

            <Text style={styles.headText}>Contenue de programme</Text>

          </View>

        </View>

        

        <View style={styles.body}>
        
          <View style={styles.partOfTheDay}>
            <Text style={styles.partOfTheDayText}>{this.state.choix}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>Citron</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>

          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>Gingembre</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          

          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>Miel (pure)</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          
          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>eau à température ambiante</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          
          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>Gelée Royale</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          
          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>CALM TU</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          
          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>PASSIFLORE</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
          </View>
          
          <View style={styles.content}>
            <View style={styles.inlineItems}>
              <View style={styles.point} />
              <View >
                <Text style={styles.contentItem}>TISANE</Text>
              </View>
            </View>
            <View style={styles.viewBottomLine}/>
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
    backgroundColor : "#596A9F",
    justifyContent : "center",
    marginBottom : "3%",

  },
  partOfTheDayText : {
    fontSize : 26,
    fontWeight : 'bold',
    color : "white",
    alignSelf :"center"
  },
  content : {
    
  },
  inlineItems : {
    flexDirection : "row",
    alignItems : "center"
  },
  contentItem : {
    fontSize : 25,
    fontWeight : 'bold',
    color : "black"
  },
  point : {
    height : 12,
    width : 12,
    borderRadius : 12/2,
    marginRight : "4%",
    marginLeft : "4%",
    backgroundColor : "black"
  },
  viewBottomLine : {
    borderBottomWidth : 9,
    borderBottomColor : "#C8CACF",
    marginTop : "3%",
    marginBottom : "3%"
  },
})