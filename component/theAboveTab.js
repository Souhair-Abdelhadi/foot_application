/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable space-infix-ops */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import OldMessages from './Messages';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'react-native-firebase'
import Test from './test'
import Home from './home'
// const getTabBarIcon = (props) => {

//     const { route } = props

//     if (route.key === 'Search') {

//         return <Icon name='envelope-o' size={20} color={'white'} />

//     } else {

//         return <Icon name='user' size={20} color={'white'} />

//     }
// }


// const FirstRoute = () => (
//     <Test />
// );

// const SecondRoute = () => (
//     <OldMessages />
// );



export default class App extends React.PureComponent {



    state = {
        onlineUsersMounted: true,
        messagesMounted: false,
        showNavBar : true,
        globalMessagesCounted : 0,
    }

    componentDidMount(){


        AsyncStorage.getItem('user').then(value => {

            if (value !== null) {
                // We have data!!
                const data = JSON.parse(value);

                firebase.database().ref('/users/' + data._id)
                    .child('globalMessagesCounted')
                    .on('value', (snap) => {
                        if (snap.val() != null) {
                          
                            this.setState({ globalMessagesCounted : snap.val()});

                        }

                        console.log('--------------------------------------------------------------------')
                        console.log('globalMessagesCounted listener on is initiated');
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

    render() {


        return (


            <View style={[styles.container,{display : this.state.showNavBar ? 'flex' : 'none'}]} >

                <View style={styles.card} >

                    <TouchableOpacity style={{
                        flexDirection: 'row', marginLeft: "8%",
                        borderBottomWidth: 2,
                        borderBottomColor: this.state.onlineUsersMounted ? "orange" : "white"
                    }}
                        onPress={() => {
                            this.setState({
                                onlineUsersMounted: true,
                                messagesMounted: false
                            })
                        }}
                    >
                        <Icon name="person-circle" size={24}
                            color={this.state.onlineUsersMounted ? "orange" : "white"}
                        />
                        <Text style={[styles.text, { color: this.state.onlineUsersMounted ? "orange" : "white" }]} >Online users</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row', marginLeft: "18%",
                        borderBottomWidth: 2,
                        borderBottomColor: this.state.messagesMounted ? "orange" : "white"
                    }}
                        onPress={() => {
                            this.setState({
                                onlineUsersMounted: false,
                                messagesMounted: true
                            })
                        }}
                    >
                        <Icon name="chatbubbles" size={24}
                            color={this.state.messagesMounted ? "orange" : "white"}
                        />
                        <Text style={[styles.text, { color: this.state.messagesMounted ? "orange" : "white" }]}  >Messages</Text>

                        {
                             this.state.globalMessagesCounted <= 0 ? null : (<View style={styles.circle}  >
                                    <Text style={styles.circle_text} >{this.state.globalMessagesCounted }</Text>
            
                                </View>)

                        }

                    </TouchableOpacity>

                </View>


                <View style={{ flex: 1, display: this.state.onlineUsersMounted ? 'flex' : 'none' }} >
                    {/* <Test   /> */}
                    <Home this={this.props.this} />
                </View>

                <View style={{ flex: 1, display: this.state.messagesMounted ? 'flex' : 'none' }} >

                    <OldMessages this={this.props.this}  />

                </View>

            </View>




        )

    }



}



const styles = StyleSheet.create({


    container: {
        flex: 1
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#324052',
        height: "10%",
        alignItems: 'center'
    },
    circle: {
        minHeight: 15,
        minWidth: 15,
        borderRadius: 15,
        backgroundColor: 'red',
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginLeft: '2%',
        // marginVertical: '10%'
    },
    circle_text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        padding: "1%",

    },



})