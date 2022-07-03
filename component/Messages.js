


import  * as firebase from 'react-native-firebase';


// @refresh reset

import React ,{useState,useEffect} from 'react';
import {StyleSheet,View,FlatList,Text,TouchableOpacity} from 'react-native';
import Card from '../card';
import AsyncStorage from '@react-native-community/async-storage';
import SoundPlayer from 'react-native-sound-player'

//   const db = firebase.database();

      
    export default class Messages extends React.Component {

    constructor(props){
        super(props);
      
    }
        state = {
                messagesList : [],
                isRefreshing : false,
                newData : [],
                user: AsyncStorage.getItem('user') ,
                userUid : '',
                list : [],
                render : false,
                dataFetched  : false
        }




            // refresh the online users list 

  getDataFromFirebase() {
    firebase.database().ref('/users/' + this.state.userUid + '/contacts')
        .once('value', (snap) => {
            console.log('----------->', snap.numChildren());
            this.state.messagesList.length = 0;
            snap.forEach(snapshot => {

                this.state.messagesList.push(snapshot.val());
            })
            // update users messages list in the array list

        }).then(() => {
            this.setState({ messagesList: this.state.messagesList})
            // this.setState({list : this.state.messagesList});
            console.log('from update the');
            console.log(this.state.messagesList, this.state.messagesList.length);
            console.log('messages list updated');
            this.state.list.length = 0;
            this.state.messagesList.forEach(data => {
                firebase.database().ref('/users/' + data.id)
                    .once('value', snap => {
                        console.log('user contacts data :', snap.val());
                        this.setState({ list: [snap.val(), ...this.state.list] });
                    })

            })
        })
        .catch(error => error.message);
    this.setState({isRefreshing : false});

}




refreshData = () => {
    this.setState({ isRefreshing : true});
    this.getDataFromFirebase();

}

        sawMessage = (userUid, hisId) => {
            console.log("messages seen executed", userUid, hisId);
            firebase.database().ref("/users/" + hisId + "/conversations/")
                .child(userUid)
                .update({
                    seen: true
                }).then(() => console.log("messages seen updated"))
                .catch(e => console.log(e))

        }

        componentDidMount(){


        AsyncStorage.getItem('user').then(value=>{

            if (value !== null) {
                // We have data!!
                const data = JSON.parse(value);
                this.setState({ userUid: data._id });

                firebase.database().ref('/users/' + data._id)
                    .child('contacts')
                    .on('value', (snap) => {
                        var dataArray = [];
                        if (snap.val() != null) {
                            var length = Object.keys(snap.val()).length;
                            console.log(' messages new data object : ', snap.val())
                            snap.forEach( (snap,index) => {
                                firebase.database().ref("/users/" + snap.val().id)
                                    .once('value', async (snap) => {
                                        dataArray.push(snap.val());
                                            this.setState({newData : dataArray});
                                        if(dataArray.length === length){
                                            console.log("Messages Array Data : ", this.state.newData, this.state.newData.length)
                                            this.setState({list : this.state.newData});
                                            this.setState({ messagesList: [] })

                                        }
                                    })
                            })
                        }

                        console.log('--------------------------------------------------------------------')
                        console.log('Messages listener on is initiated');
                        console.log('--------------------------------------------------------------------')


                    })
                    
            }

        })
            


        }


        componentWillUnmount() {


            // fix Warning: Can't perform a React state update on an unmounted component
            this.setState = (state, callback) => {
                return;
            };
        }

        render(){
      return(

        <View style={styles.container} >


              <FlatList

                //   onRefresh={this.refreshData}
                //   refreshing={this.state.isRefreshing}
                  keyExtractor={(item) => item.id}
                  data={this.state.list}
                  extraData={this.state.messagesList}
                  scrollEnabled={true}
                  renderItem={({ item }) => (

                      <View>

                          <Card props={item} userUid={this.state.userUid} profileImage={item.profileImage}
                              phoneNumber={item.phoneNumber}
                              age={item.age}
                              gender={item.gender}
                              interest={item.interest}
                              goal={item.goal}
                              fullName={item.fullName}
                              socialStatus={item.socialStatus}
                              aboutMe={item.aboutMe}
                              navigation={this.props.navigation}
                              this={this.props.this}
                          >
                              <Text style={styles.text} > {item.fullName} </Text>
                              {
                                  ((typeof item.conversations === 'undefined') ||
                                      (typeof item.conversations[this.state.userUid] == 'undefined') ||
                                      item.conversations[this.state.userUid].numberOfMessages == 0) ? null : (<View style={styles.circle}  >
                                          <Text style={styles.circle_text} >{item.conversations[this.state.userUid].numberOfMessages}</Text>
                                          {item.conversations[this.state.userUid].seen === true ? null :
                                              this.sawMessage(this.state.userUid, item.id)
                                          }
                                      </View>)

                              }


                          </Card>


                      </View>


                  )}



              />

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

    
    
    
    })
    
    