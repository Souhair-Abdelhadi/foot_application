/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react";
import {Image,View,SafeAreaView,Text,StyleSheet, ActivityIndicator,} from 'react-native';
import {connect} from "react-redux"
import * as firebase from "react-native-firebase"
import {changeImageUrl,changeFullName} from "../redux/actions/count"
import RNSecureStorage,{ACCESSIBLE} from "rn-secure-storage";
 class CustomizeProfile extends React.Component{

    constructor(props){
        super(props)
        RNSecureStorage.get("userUid")
        .then((data)=>{
            console.log(data)
            if(data !== null){
                firebase.database().ref("/users/"+data)
                .once('value',(snap)=>{
                    if(snap.val().fullName !== null){
                        this.props.changeFullName(snap.val().fullName)
                    }
                    if(snap.val().profileImage !== null){
                        this.props.changeImageUrl(snap.val().profileImage)
                    }
                })
                .catch(e=>console.log(e))
            }
        })
        .catch(e=>console.log(e))
    }

    state ={
        imageloaded : true,
    }

    componentDidMount(){

        //loading user fullName and profile image 
       this.interval = setInterval(() => {
            RNSecureStorage.get("userUid")
            .then((data)=>{
                console.log(data)
                if(data !== null){
                    firebase.database().ref("/users/"+data)
                    .once('value',(snap)=>{
                        if(snap.val().fullName !== null){
                            this.props.changeFullName(snap.val().fullName)
                        }
                        if(snap.val().profileImage !== null){
                            this.props.changeImageUrl(snap.val().profileImage)
                        }
                        clearInterval(this.interval)
                    })
                    .catch(e=>console.log(e))
                }
            })
            .catch(e=>console.log(e))
        }, 5000);

    }


    render(){
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.head}>
                        <Image 
                            source={this.props.imageUrl === null ? require('../assets/personIcon.png') : 
                            {uri : this.props.imageUrl}
                            }  
                            style={styles.image}
                            onLoadEnd = {()=>{
                                this.setState({imageloaded : false})
                            }}
                        />
                        {this.state.imageloaded &&  <ActivityIndicator size={50} color= "blue" /> }
                        <Text style={styles.headText}>{this.props.fullName}</Text>
                    </View>
                    
            </SafeAreaView>
        )
    }


}

const styles = StyleSheet.create({
    container : {

    },
    head : {
        
        //height : 200,
        justifyContent : "center",
        alignItems : "center",
        
    },
    image : {
        height : 120,
        width : 120,
        borderRadius : 120/2,
    },
    headText : {
        fontSize : 23,
        fontWeight : "bold",
        
    }

})

const mapStateToProps = (state) => {
    return {
      count : state.count,
      imageUrl : state.imageUrl,
      fullName : state.fullName
    }
};

  const mapDispatchToProps = (dispatch) => {
    return {
      changeImageUrl : (url) =>{
        dispatch(changeImageUrl(url))
      },
      changeFullName : (fullName) =>{
        dispatch(changeFullName(fullName))
      },
    }};
  

export default connect(mapStateToProps,mapDispatchToProps)(CustomizeProfile)