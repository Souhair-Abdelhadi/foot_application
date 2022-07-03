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
import {View,Text,StyleSheet,Image,ScrollView,TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

export default class App extends React.Component{



    render(){

        return(

            <LinearGradient colors={["#a8a6ab","#6a5480"]} start={{x : 0, y : 0}} end={{x :1, y :1}}
             style={styles.container}>

              <ScrollView>

                <View style={styles.header}>

                  <View style={styles.headerContentStyle}>

                    <Text style={styles.headText}>MATCH DAY CONESEILS</Text>

                  </View>

                </View>

                <View style={styles.card}>
                  <TouchableOpacity
                  onPress={()=>{
                    this.props.navigation.navigate('MatchDayConseils')
                  }}
                  >
                    <View style={styles.cardContentStyle} >

                        <Image 
                          source={{uri : "https://machinecurve.com/wp-content/uploads/2019/07/thispersondoesnotexist-1-1022x1024.jpg"}}
                          style={styles.cardImage}
                        />

                        <View style={styles.cardTextStyle} >
                              <Text style={styles.CardName}  >Jack Hodkiewicz</Text>
                              <Text style={styles.CardDescription}  >Petite description ici </Text>
                        </View>

                        <View style={styles.access}>

                        <Text style={[styles.accessText,{color : "orange"}]} >PAYANT</Text>

                      </View>

                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>

                  <View style={styles.cardContentStyle} >

                      <Image 
                        source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3qBVX4XIA8zq3LpBn64zAuOt9_IZ7_H5uA&usqp=CAU"}}
                        style={styles.cardImage}
                      />

                      <View style={styles.cardTextStyle} >
                            <Text style={styles.CardName}  >Brame Lendick</Text>
                            <Text style={styles.CardDescription}  >Petite description ici </Text>
                      </View>
                      
                      <View style={styles.access}>

                        <Text style={styles.accessText} >VIP</Text>

                      </View>

                  </View>

                </View>

                <View style={styles.card}>

                  <View style={styles.cardContentStyle} >

                      <Image 
                        source={{uri : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILg48X1W2TnwhKbimLBfOmmjlFNARCJwDKQ&usqp=CAU"}}
                        style={styles.cardImage}
                      />

                      <View style={styles.cardTextStyle} >
                            <Text style={styles.CardName}  >Jonathan Brown</Text>
                            <Text style={styles.CardDescription}  >Petite description ici </Text>
                      </View>

                      <View style={styles.access}>

                        <Text style={[styles.accessText,{color : 'green'}]} >FREE</Text>

                      </View>

                  </View>

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
      backgroundColor : "#0f0617",
  
    },
    headerContentStyle : {
      marginLeft : "6%",
      marginVertical : "5%",
    },
    headText : {
      position : "absolute",
      marginLeft : "25%",
      fontSize : 20,
      fontWeight : 'bold',
      color : "white",
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
      marginBottom : "5%",
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
    access : {
      position : "absolute",
      left : "80%",
      top : "85%",
    },
    accessText : {
      color : 'red',
      fontSize : 17,
      fontWeight : "bold",
    }
    
  })








