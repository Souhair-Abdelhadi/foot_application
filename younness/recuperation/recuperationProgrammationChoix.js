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
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
export default class App extends React.Component{

  render(){

    return(

      <SafeAreaView style={styles.container}>
        
          <View style={styles.header}>

            <View style={styles.headerContentStyle}>

            <TouchableOpacity
              onPress={()=>{
                console.log("left arrow icon pressed")
                this.props.navigation.goBack()
                }
              }
            >
              <Icon 
                name="arrow-back-circle" size={32} color="white"
              />
            </TouchableOpacity>

            <Text style={styles.headText}>Programme de recupération</Text>

            </View>

          </View>

          
          <View style={styles.body}>
            <ImageBackground source={require('../assets/programmefoodimage1.jpg')}
          style={styles.backgroundImage}
          >
              <View style={styles.card}>

                <TouchableOpacity
                  onPress={()=>{this.props.navigation.navigate('RecuperationProgrammeContent')}}
                >
                  <View style={styles.cardBox}>
                      <Text style={styles.cardBoxText}>Début de journée</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={[styles.cardBox,{marginLeft : "10%",marginRight : "3%"}]}>
                      <Text style={styles.cardBoxText}>Milieu de journée</Text>
                  </View>
                </TouchableOpacity>

              </View>

              <View style={styles.card}>
              
                <TouchableOpacity>
                  <View style={styles.cardBox}>
                      <Text style={styles.cardBoxText}>La Sieste</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={[styles.cardBox,{marginLeft : "10%",marginRight : "3%"}]}>
                      <Text style={styles.cardBoxText}>Fin de journée</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </ImageBackground>
          </View>
      </SafeAreaView>

    )


  }

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'white',
  },
  backgroundImage : {
    height : Dimensions.get('screen').height,
    width : Dimensions.get('screen').width,
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
  card : {
    marginTop : "15%",
    flexDirection : "row",
  },
  cardBox : {
    height : 150,
    width : 150,
    borderRadius : 10,
    marginLeft : "10%",
    marginTop : "5%",
    marginBottom : "2%",
    backgroundColor : "#05001c",
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  cardBoxText : {
    fontSize : 20,
    color : "white",
    fontWeight : "bold",
    textAlign : "center",
  },
  

})