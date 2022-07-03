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
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Modal,Animated,ActivityIndicator,
   TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import RNSecureStorage,{ACCESSIBLE} from "rn-secure-storage";
import * as firebase from "react-native-firebase"
import {connect} from "react-redux"
import {changeFullName,changeImageUrl} from "../redux/actions/count"
class App extends React.Component{
  constructor(props){
    super(props)
  }

  state = {
   
    imageLoaded : false,
  }

 

  componentDidMount(){
    
     this.firebaseRef =  RNSecureStorage.get("userUid").then((data)=>{
      if(data != null){
        var dataObject = JSON.parse(data)
        firebase.database().ref("/users/"+dataObject)
        .on('value',(snap)=>{
          if(snap.val().fullName !== null){
            this.setState({fullName : snap.val().fullName })
          }
          if(snap.val().profileImage !== null){
            this.setState({profileImageUrl : snap.val().profileImage })
          }
        })
      }
      else{
        this.setState({profileImageUrl : null,
          fullName : null
          })
      }
    })
    .catch(e=>{
      console.log(e)
      this.setState({profileImageUrl : null,fullName : null })    
    })
    

    console.log("image url :",this.state.fullName)

  }

  componentWillUnmount(){


  }

    render(){
      return(
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Setting</Text>
            <View style={styles.headerContent}>
              <Image 
                source={this.props.imageUrl !== null ? 
                          {uri : this.props.imageUrl }
                            : require('../assets/personIcon.png')
                        }
                style ={styles.profileImage}
                onLoadEnd={()=>{this.setState({imageLoaded : true})}}
              />
              {!this.state.imageLoaded && <ActivityIndicator animating size={'small'} color='white' />}
              <View style={styles.headerContentTextView}>
                <Text style={{fontSize : 18,color:"gray"}}>Hello</Text>
                <Text style={styles.headerContentText}>{this.props.fullName !== null ? this.props.fullName : "Undefined"}</Text>
              </View>
              <View style={styles.modifyIcon}>
                <TouchableOpacity
                  onPress={()=>{
                    console.log('modify icon pressed')
                    this.props.navigation.navigate('ModifyProfile')
                  }}
                >
                  <Icon 
                    name="pencil-outline" size={32} color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
  
          <ScrollView>
  
            <View style={styles.body}>
              
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
              
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
  
              <View style={styles.options}>
                <TouchableOpacity
                >
                  <View style={styles.option}>
                    <Text style={styles.optionsText}>Option</Text>
                    <Icon 
                      name="chevron-forward" size={32} color="black"
                      style={styles.optionIcon}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{
                  borderBottomWidth : 4,
                  borderBottomColor : "gray",
                  width : "90%",
                  alignSelf : "center",
                }} />
              </View>
            </View>
  
          </ScrollView>
  
        </SafeAreaView>
      )
    }
  
  
  }
  
  const styles = StyleSheet.create({
    container :{
      flex : 1,
  
    },
    header : {
      height : 200,
      backgroundColor : "#071C32"
    },
    headerContent : {
      flexDirection : "row",
      marginLeft : "3%",
      marginTop : "6%"
    },
    profileImage : {
      height : 90,
      width : 90,
      borderRadius : 90/2
    },
    headerText : {
      fontSize : 30,
      fontWeight : "bold",
      color : "white",
      marginLeft : "5%",
      marginTop : "6%"
    },
    headerContentTextView : {
      justifyContent : "center",
      marginLeft : "8%"
    },
    headerContentText : {
      fontSize : 20,
      fontWeight : "bold",
      color : "white",
    },
    modifyIcon : {
      position : "absolute",
      justifyContent : "center",
      left : "85%",
      top : "10%"
    },
    body : {
      flex : 1
    },
    options : {
      backgroundColor : "white",
      justifyContent :"center",
    },
    option : {
      justifyContent : "center",
      marginTop : "5%",
      marginBottom : "5%",
      marginLeft : "5%"
    },
    optionsText : {
      fontSize : 24,
      fontWeight : "bold",
  
    },
    optionIcon : {
      position : "absolute",
      left : "85%",
      justifyContent : "center"
    }
  })

  const mapStateToProps = (state) =>{
    return {
      imageUrl : state.imageUrl,
      fullName : state.fullName,
    }
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      changeImageUrl : (url) =>{
        dispatch(changeImageUrl(url))
      },
      changeFullName : (fullName) =>{
        dispatch(changeFullName(fullName))
      },
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(App)