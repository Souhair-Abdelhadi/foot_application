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
import React from 'react';
import {connect} from "react-redux"
import {View, StyleSheet,LogBox } from 'react-native';
import * as firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {changeFullName,changeImageUrl} from "../redux/actions/count"
import LoadingView from "./loadingComponent"
import "../../global"

class LoadingScreen extends React.Component{

    constructor(props){
        super(props);


        LogBox.ignoreAllLogs(true)
    }


    componentDidMount(){
            


         this.timeout = setTimeout(() => {
            firebase.auth().onAuthStateChanged( async user => {
                var verified;
    
                if (user) {
                    
                    verified = user.emailVerified;
    
                            if (verified === true){
                                
                                
                                
                                await AsyncStorage.setItem('user', JSON.stringify({ _id: user.uid, name: user.displayName }))
                                .then(()=>{
                                    
                                    firebase.database().ref("/users/" +user.uid )
                                        .update({
                                            status: "online"
                                        })
                                        .catch(e => console.log(e));
                                    this.props.navigation.navigate("App");
    
                                })
                                .catch((e)=>{
                                    this.props.navigation.navigate("Auth");
                                })
                            }
                        
    
                            else {
                                this.props.navigation.navigate("Auth");
                                
                                
                            }
                }
    
                else {
                    this.props.navigation.navigate("Auth");
                }
    
             });
    
             console.log('Authentication executed')
         }, 3000);
  
    }

    render() {

        return (
            <View style={styles.container}>
                <LoadingView />
            </View>
        );
    }

}


const mapStateToProps = (state) => {
    return {
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

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },
   
})

export default connect(mapStateToProps,mapDispatchToProps)(LoadingScreen)