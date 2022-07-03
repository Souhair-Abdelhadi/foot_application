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
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator,Modal,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatRoom from './chatRoom'
import ImageZoomViewer from 'react-native-image-zoom-viewer'


export default class Card extends React.PureComponent {


    state = {
        loading: true,
    }


    render() {
        // console.log('from card : ', this.props.props);
        return (


            <View style={styles.Card}>
                

                {/*<ChatRoom props={this.props.props} userUid={this.props.userUid} this={this} />*/}

                <LinearGradient colors={['#060727', '#060727', '#060727']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >

                    <TouchableOpacity onPress={()=>{

                        console.log("card component pressed")
                        console.log(this.props.navigation)
                        this.props.navigation.navigate('ChatRoom',{
                            userUid : this.props.userUid,
                            fullName : this.props.fullName,
                            profileImage : this.props.profileImage,
                            props : this.props.props
                        });

                    }}>

                    <View style={styles.CardContent} >

                                <Image source={(typeof this.props.profileImage === "undefined") ? require('../../assets/VT_logo2.png') : {uri : this.props.profileImage} } style={styles.image} onLoadEnd={() => {
                                this.setState({ loading: false });
                                console.log("loading is set to false")
                            }} />

                            {this.state.loading && <ActivityIndicator animating size={'large'} color='blue' />}

                                {/* <Text style={styles.text} > {this.props.children}  </Text> */}
                            <View style={{
                                justifyContent :"center",
                                marginLeft : "8%"
                            }}>
                                {this.props.children}
                            </View>

                    </View>

                    </TouchableOpacity>

                </LinearGradient>

            </View>

        )

    }

}

const styles = StyleSheet.create({

    Card: {
        borderBottomWidth: 2,
        borderBottomColor: 'black'
    },
    CardContent: {
        flexDirection: 'row',
        flex: 1,
        // textAlign : 'center',


    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center'

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imageView: {
        height: 300,
        width: 300,
        borderRadius: 150,
        alignSelf: 'center',
    },
    Title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    card: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',
        flexDirection : 'row'
    },
    profileText: {
        fontSize: 18,
        lineHeight: 25,

    },
    container : {
        flex:1,
    },
    aboutMe_goal: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: '3%',

    }

})