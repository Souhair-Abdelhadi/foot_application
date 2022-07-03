/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet ,ActivityIndicator} from 'react-native';
import * as firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoadingScreen extends React.Component{

    constructor(props){
        super(props);
        
        const tryMe = async () => {
            try {

                const data = await AsyncStorage.getItem('user');
                if (data !== null) {
                    console.log(data);
                    var value = JSON.parse(data);
                    console.log(value._id);
                }

            } catch (error) {
                console.log(error)
            }
        }
        tryMe();


    }


    componentDidMount(){
            

        // firebase.database().ref("/users/" + firebase.auth().currentUser.uid+"/status")
        // .onDisconnect()
        // .set("offline");

         firebase.auth().onAuthStateChanged( async user => {
            var verified;

            if (user) {

                // var userLoggedIn = firebase.auth().currentUser;
                // verified = userLoggedIn.emailVerified;
                
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
                        }
                    

                        else {
                            this.props.navigation.navigate("Auth");
                            
                            
                        }
            }

            else {
                this.props.navigation.navigate("Auth");
            }

         });

    //    this.disconnect =  firebase.database().ref('/users/' + this.state.userUid)
    //         .onDisconnect()
    //         .set({
    //             status : "offline"
    //         })
            

        
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}> Loading ... </Text>
                <ActivityIndicator size="large" color="red"  />
            </View>
        );
    }

    // componentWillUnmount(){

    //     this.disconnect;
    // }


}

const styles = StyleSheet.create({

    container : {
        flex : 1,
        justifyContent: "center",
        alignItems: 'center',

    },
    text: {
        fontSize:26,
        fontWeight: "bold",
        padding : 80,
    }
})