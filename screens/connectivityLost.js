import React from 'react';
import {View,Text,StyleSheet,ActivityIndicator,Image} from 'react-native';

import * as  firebase from 'react-native-firebase';


export default class ConnectivityLost extends React.Component{

    state = {
        isConnectionLost: false,
    };
    componentDidMount() {


        this.conCheckInterval = setInterval(() => {
            try {


                fetch(
                    'http://www.google.com'
                ).then(async (response) => {

                    if (response.status == 200) {

                        console.log("connection exists");
                        if (this.state.isConnectionLost) {
                            this.setState({ isConnectionLost: false });
                            firebase.database().ref("/users/" + firebase.auth().currentUser.uid)
                                .update({
                                    status: "online"
                                })
                                .catch(e => console.log(e));
                            this.props.navigation.navigate("App");

                        }

                    }

                    else {

                        console.log("you may lost the connection");
                    }

                })
                    .catch((error) => {
                        console.log(error);
                        console.log("you may lost the connection");
                        this.setState({isConnectionLost:true});
                    });


            }
            catch (error) {
                console.log(error);

            }
        }, 5000);

    }
    componentWillUnmount() {
        clearInterval(this.conCheckInterval);
    }



    render(){

        return (

            <View style={styles.container} >

            
            <View style={styles.image} >

            <Image  source={require('../assets/VT_logo2.png')}   />
                
            <Text style={styles.logo} >   Meet me  </Text>

            
            </View>
            <View style= {styles.textCentralization} >

            <Text style={styles.text}>You lost your connectivity to the internet</Text>

            <Text style={styles.text} >Please connect your device to the internet</Text>
           
            </View>

            <View style={{marginTop:'3%',}} >
            
            <ActivityIndicator size="large" color={'white'}  />
            
            </View>

            </View>



        )






    }



}



const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: '#1B4D76',
    },
    textCentralization : {
        textAlign : 'center',
        alignSelf : 'center',
        marginVertical : '10%',
        
    },
    text : {
      fontSize : 18,
        color  : 'white',
        marginBottom : '2%',
        fontWeight : 'bold',
    },
    image : {
        alignItems:'center',
        alignSelf: 'center',
    },
    logo : {
      marginTop:-18,
      fontWeight: 'bold',
      fontSize: 30,
      color: 'white',
      },

})

