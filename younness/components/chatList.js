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

import  * as firebase from 'react-native-firebase';

// @refresh reset

import React  from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity,ImageBackground,Dimensions} from 'react-native';
import Card from './card';
import AsyncStorage from '@react-native-community/async-storage';
//   const db = firebase.database();
import SoundPlayer from 'react-native-sound-player'
    

    export default class home extends React.Component{

        state = {
            messagesList: [],
            isRefreshing: false,
            newData: [],
            user: AsyncStorage.getItem('user'),
            userUid: '',
            list: [],
        }

        // refresh the online users list 

        getDataFromFirebase = async()=> {
            firebase.database().ref('/coach/')
                .once('value', (snap) => {
                    this.state.list.length = 0;
                    this.state.newData.length = 0;

                    snap.forEach(snapshot => {
 
                        if (snapshot.val().status == "online" && (snapshot.val().id !== this.state.userUid)) {

                            this.state.list.push(snapshot.val());

                        }

                    })





                }).then(() => {
                    console.log('from update the');
                    this.setState({ list: this.state.list});
                    this.setState({ newData: this.state.list});
                    console.log(this.state.list, this.state.list.length);
                    console.log('setList');
                })
                .catch(error => error.message);
            this.setState({isRefreshing : false});
        }



        refreshData = async () =>  {
            this.setState({ isRefreshing: true });
            this.getDataFromFirebase();

        }

        sawMessage = (userUid,hisId)=>{
            console.log("messages seen executed",userUid,hisId);
            firebase.database().ref("/coach/"+hisId+"/conversations/")
            .child(userUid)
            .update({
                seen : true
            }).then(()=>console.log("messages seen updated"))
            .catch(e=>console.log(e))
            
        }

componentDidMount(){



  AsyncStorage.getItem('user').then(value=>{

        if (value !== null) {
                // We have data!!
            const data = JSON.parse(value);
            this.setState({ userUid: data._id });

            firebase.database().ref('/coach/')
                .on('value', (snap) => {

                    if(snap.val() != null){
                    this.state.messagesList.length = 0;
                    snap.forEach(snapshot => {

                        if (snapshot.val().status == "online" && (snapshot.val().id !== data._id)) {
                            this.state.messagesList.push(snapshot.val());
                            // if(snapshot.val().conversations[snapshot.val().id]){
                            //     console.log("number of messages is :",
                            //      snapshot.val().conversations[snapshot.val().id].numberOfMessages)
                            // }
                            
                        }

                    })

                    this.setState({ messagesList: this.state.messagesList });
                    this.setState({ list: this.state.messagesList })
                    console.log("---------------------------------------");
                    console.log("from Home ----->", this.state.messagesList, this.state.messagesList.length);
                    console.log("---------------------------------------");
                }
                console.log("-----------------------------------------");
                console.log("online users listener initiated")
                console.log("-----------------------------------------");

                })
            

        }


    })

    
}

componentWillUnmount(){


    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
}

        render(){

      return(

        <View style={styles.container} >
            <ImageBackground 
                source={require('../assets/loginBackgroundImage.jpeg')}
                style={styles.ImageBackground}
            >

                <View style={styles.head}>
                    <View style={styles.coachView}>
                        <Text style={styles.coachText}>Coach's</Text>
                    </View>
                </View>

                {
                        this.state.list.length == 0 ?

                    <Text style={{  textAlign : 'center',alignSelf : 'center',marginVertical : '50%',fontSize:20,fontWeight:'bold', }} 
                    >  No one is online right now. </Text> : null
                }


                <FlatList 
                
                onRefresh={this.refreshData }
                refreshing={this.state.isRefreshing}
                keyExtractor={(item) => item.id}
                data={this.state.list}
                extraData={this.state.messagesList}
                scrollEnabled={true}
                renderItem={({ item }) => (

                    <View>
                    
                    
                            <Card props={item} userUid={this.state.userUid} profileImage={item.profileImage}
                                fullName={item.fullName}
                                messages={item.conversations}
                                navigation = {this.props.navigation}
                                this={this.props.this}
                            >
                                <Text style={styles.text} > {item.fullName} </Text>
                                {
                                    ((typeof item.conversations === 'undefined') ||
                                        (typeof item.conversations[this.state.userUid] == 'undefined') ||
                                        item.conversations[this.state.userUid].numberOfMessages == 0) ? null : (<View style={styles.circle}  >
                                            <Text style={styles.circle_text} >{item.conversations[this.state.userUid].numberOfMessages}</Text>
                                            {item.conversations[this.state.userUid].seen === true ? null :
                                                SoundPlayer.playSoundFile("msg_tone", "mp3"),
                                                this.sawMessage(this.state.userUid, item.id)
                                            }
                                        </View>)

                                }

                            </Card>
                            

                    </View>
                    

                ) }
                
                

                />
            </ImageBackground>
        </View>
)


    }




}








    const styles = StyleSheet.create({


        container : {
    
            flex : 1,
            backgroundColor: '#fff',
            // alignItems: 'center',
            // justifyContent:'center',
            //  padding:1,
    
        },
        input : {
    
            height: 50,
            width:'100%',
            borderWidth:1,
            padding:15,
            marginBottom:20,
            borderColor:'gray',
    
    
        },
        circle: {
            minHeight: 20,
            minWidth: 20,
            borderRadius: 20,
            backgroundColor: 'red',
            alignSelf: 'flex-start',
            alignItems: 'center',
            marginLeft: '8%',
            marginVertical: '10%'
        },
        circle_text: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            padding: "1%",

        },
        text: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center'

        },
        ImageBackground : {
            height : Dimensions.get('window').height,
            width : Dimensions.get('window').width,
        },
        head : {
            height : 80,
            backgroundColor : "gray",
            justifyContent : "center",
        },
        coachView : {
            alignItems : "center",
            
        },
        coachText : {
            fontSize : 25,
            fontWeight : "bold",
            color : "white",
        }
    
    
    })
    
    