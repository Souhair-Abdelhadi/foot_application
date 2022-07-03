import React from 'react';
import Tab from './theAboveTab';
import LaUneHeader from './laUneHeader'
import { View,AppState } from 'react-native';
import * as firebase from 'react-native-firebase'



export default class LaUne extends React.Component{

    state = {
        appState: AppState.currentState,
        isConnectionLost : false,
        showNavBar : true,
    };
    componentDidMount(){
        AppState.addEventListener("change", this._handleAppStateChange);

        firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/status")
            .onDisconnect()
            .set("offline");

        this.conCheckInterval = setInterval(() => {
            try {


                fetch(
                    'http://www.google.com'
                ).then(async (response) => {

                    if (response.status == 200) {

                        console.log("connection exists");
                        if (this.state.isConnectionLost) {
                            this.setState({isConnectionLost : false});
                            
                        }

                    }

                    else {

                        console.log("you may lost the connection");
                    }

                })
                    .catch( (error) => {

                        console.log(error);
                        console.log("you may lost the connection");
                       if(!this.state.isConnectionLost){
                           this.setState({ isConnectionLost: true });
                           this.props.navigation.navigate("CheckConn");
                       }
                    });


            }
            catch (error) {
                console.log(error);

            }
        }, 10000);

    }
    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
        clearInterval(this.conCheckInterval);

            // fix Warning: Can't perform a React state update on an unmounted component
            this.setState = (state, callback) => {
                return;
            };

    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the foreground!");
            firebase.database().ref("/users/"+firebase.auth().currentUser.uid+"/status/")
            .onDisconnect()
            .set("offline")
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
            .update({
                status : "online"
            })
            .catch(e=>console.log(e));
        }
        else{
            console.log("App has come to the background!");
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid + "/status/")
                .onDisconnect()
                .set("offline")
            firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
                .update({
                    status: "online"
                })
                .catch(e => console.log(e));
        }
        this.setState({ appState: nextAppState });
    };

    render(){
        return(

            <View style={{flex:1 , display : this.state.showNavBar ? 'flex' : 'none' }} >
           
           <LaUneHeader />
           
           <Tab this={this} />
           
           </View>

        )
    }






}