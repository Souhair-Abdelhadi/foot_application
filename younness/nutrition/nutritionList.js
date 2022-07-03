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
import {View,Text,StyleSheet,Image,ScrollView,Alert,ActivityIndicator,
   TouchableOpacity} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons"
export default class App extends React.Component{


  state = {
    imageLoaded : false,
  }

 
  componentDidMount(){


  }
  componentWillUnmount(){

  }
  render(){

      return(

          <LinearGradient colors={["#00a46c","#75F3C8"]} start={{x : 0, y : 0}} end={{x :1, y :1}}
           style={styles.container}>

            <ScrollView>

              <View style={styles.header}>

                <View style={styles.headerContentStyle}>
                  {/*
                    <TouchableOpacity
                    onPress={()=>{
                    this.props.navigation.goBack()
                    console.log("left arrow icon pressed")
                    }}
                  >
                    <Icon 
                      name="arrow-back-circle" size={32} color="white"
                    />
                  </TouchableOpacity>
                  */ }
                  

                  <Text style={styles.headText}>Nutrition liste</Text>

                </View>

              </View>

              <View style={styles.card}>
                <TouchableOpacity
                  onPress={()=>{console.log('card pressed')
                  this.props.navigation.navigate('NutritionProgramme')
                  }}
                >
                  <View style={styles.cardContentStyle} >

                      <Image 
                        source={{uri : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iQK0bi0rHP10/v1/1000x-1.jpg"}}
                        style={styles.cardImage}
                        onLoadEnd={() => this.setState({imageLoaded : true})}
                      />
                      {!this.state.imageLoaded &&  <ActivityIndicator size={30} color= "green" /> }

                      <View style={styles.cardTextStyle} >
                            <Text style={styles.CardName}  >ADAMA DIAKHABY</Text>
                            <Text style={styles.CardDescription}  >Date début  : 28/10/2020</Text>
                      </View>
                      
                  </View>
                  <View style={styles.itemState}>
                    <Text style={[styles.itemStateText,{color : "blue"}]}>En cours</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.card}>
                <TouchableOpacity
                    onPress={()=>{console.log('card pressed')
                    this.props.navigation.navigate('NutritionProgramme')
                    }}
                  >
                  <View style={styles.cardContentStyle} >

                      <Image 
                        source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwxYpv4vCtVuOvGx2ivPt8D2giIGOfaxMJA&usqp=CAU"}}
                        style={styles.cardImage}
                      />

                      <View style={styles.cardTextStyle} >
                            <Text style={styles.CardName}  >THOMAS FONTAINE</Text>
                            <Text style={styles.CardDescription}  >Date début  : 01/02/2020 </Text>
                            <Text style={styles.CardDescription}  >Date fin  : 27/10/2020 </Text>
                      </View>
                  </View>
                  <View style={styles.itemState}>
                    <Text style={[styles.itemStateText,{color : "red"}]}>Expiré</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </LinearGradient>


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
    backgroundColor : "#00a46c",
    borderBottomColor : "white",
    borderBottomWidth : 8

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
  card : {
    marginTop : "3%",
    marginBottom : "1%",
    marginLeft : "4%",
    marginRight : "4%",
    borderWidth : 2,
    borderRadius : 8,
    borderColor : "white",
    backgroundColor :"white",

  },
  cardContentStyle : {
    marginLeft : "2%",
    marginRight : "2%",
    marginTop : "5%",
    marginBottom : "10%",
    flexDirection : "row",
    alignItems :"center",
  },
  cardImage : {
    width : 80,
    height : 80,
    borderRadius : 80 / 2,
  },
  cardTextStyle : {
      position : 'absolute',
      marginLeft : "30%",
      marginTop : '-20%',
  },
  CardDescription : {
    fontWeight :"normal",
    fontSize : 16,
    color : "black",
  },
  CardName : {
    fontWeight :"bold",
    fontSize : 20,
    color : "black",
  },
  itemState : {
    position : "absolute",
    marginBottom : "3%",
    marginTop : "3%",
    left : "75%",
    top : "70%"
  },
  itemStateText : {
    fontSize : 18,
    fontWeight : "bold",
    
  }
  
})




