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
import {View, Text, StyleSheet, TextInput, TouchableOpacity,ImageBackground,
     Image, Keyboard,ScrollView ,Button ,Alert,Dimensions,Modal} from 'react-native';

import  * as firebase from 'react-native-firebase';
import Icon from "react-native-vector-icons/Ionicons"


    export default class LoginScreen extends React.Component {

        state = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            verifyPassword : "",
            errorMessage : "",
            modal : false ,
            resetPassword :"",
            resetPasswordError : "",
            passwordVisible : false,
            verifyPasswordVisible : false,
            errorInFirstName : false,
            errorInLastName : false,
            errorInEmail : false,
            errorInPassword : false,
            errorInVerifyPassword : false,

        }


         ValidateEmail(mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
            {
                return (true)
            }
                return (false)
            }

        sign_up = async () => {
            this.setState({
                errorInFirstName : false,
                errorInLastName : false,
                errorInEmail : false,
                errorInPassword : false,
                errorInVerifyPassword : false,
            })
            if( (this.state.firstName.length === 0 ) || (this.state.lastName.length === 0) ||
                (!this.ValidateEmail(this.state.email)) ||
                (this.state.password < 8) || (this.state.password !== this.state.verifyPassword)
            )
            {
                if((this.state.firstName.length === 0 )){
                    this.setState({errorMessage : "please enter your first name",
                                errorInFirstName : true
                })
                }
                else if((this.state.lastName.length === 0 )){
                    this.setState({errorMessage : "please enter your last name",
                    errorInLastName : true})
                }
                else if(!this.ValidateEmail(this.state.email)){
                    this.setState({errorMessage : "please enter a valid email",
                    errorInEmail : true})
                }
                else if((this.state.password.length < 8 )){
                    this.setState({errorMessage : "please enter a password >= 8 characters",
                    errorInPassword : true})
                }
                else if((this.state.password !== this.state.verifyPassword )){
                    this.setState({errorMessage : "verified password is incorrect",
                    errorInVerifyPassword : true})
                }
            }
            else {
                this.setState({errorMessage : ""})
                firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
                .then((user)=>{
                    console.log("new user :",user)
                    firebase.auth().currentUser.sendEmailVerification()
                    .then(()=>{
                        console.log("an email verification link was sent to the new user")
                    })
                    .catch(e=>{
                        this.setState({errorMessage : e.message})
                        console.log(e)
                    })

                })
                .catch(e=>{
                    this.setState({errorMessage : e.message})
                    console.log(e)
                })


            }
        }
    
          
        componentWillUnmount() {


            // fix Warning: Can't perform a React state update on an unmounted component
            this.setState = (state, callback) => {
                return;
            };
        }
        
        render()
        {


            return (


                

                    <ImageBackground
                        source={require('../assets/loginBackgroundImage.jpeg')}
                        style={styles.backgroundImage}
                    >

                        <ScrollView keyboardShouldPersistTaps="handled" >

                            
                             <View style={styles.imageView}>
                                <Image 
                                    source={require('../assets/logo_1.png')}
                                    style={styles.image}
                                />
                            </View>

                            <View style={styles.body}>
                                
                                <Text style={styles.error} > {this.state.errorMessage} </Text> 
                                
                                <View style={!this.state.errorInFirstName ? styles.InputView : styles.InputViewError}>
                                    <Icon 
                                        name="person" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Nom' placeholderTextColor='black'  keyboardType={'email-address'}
                                                style={styles.textInput} onChangeText={firstName => this.setState({ firstName })}
                                                value={this.state.firstName} autoCapitalize={'none'}
                                                /> 
                                </View>

                                <View style={!this.state.errorInLastName ? styles.InputView : styles.InputViewError}>
                                    <Icon 
                                        name="person" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Prénom' placeholderTextColor='black'  keyboardType={'email-address'}
                                                style={styles.textInput} onChangeText={lastName => this.setState({ lastName })}
                                                value={this.state.lastName} autoCapitalize={'none'}
                                                /> 
                                </View>

                                <View style={!this.state.errorInEmail ? styles.InputView : styles.InputViewError}>
                                    <Icon 
                                        name="at" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Email' placeholderTextColor='black'  keyboardType={'email-address'}
                                                style={styles.textInput} onChangeText={email => this.setState({ email })}
                                                value={this.state.email} autoCapitalize={'none'}
                                                /> 
                                </View>
                                
                    
                                <View style={!this.state.errorInPassword ? styles.InputView : styles.InputViewError}>
                                    <Icon 
                                        name="lock-closed" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Mot de passe' placeholderTextColor='black'  keyboardType={'default'}
                                                style={styles.textInput} onChangeText={password => this.setState({ password })}
                                                value={this.state.password} autoCapitalize={'none'}
                                                secureTextEntry={!this.state.passwordVisible}
                                                /> 
                                    {
                                        !this.state.passwordVisible ? (
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({passwordVisible : true})
                                                }}
                                                style={styles.passwordVisibilityIcon}
                                            >
                                                <Icon 
                                                    name="eye" size={32} color="black"
                                                />
                                            </TouchableOpacity>
                                            
                                        ) :
                                        (
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({passwordVisible : false})
                                                }}
                                                style={styles.passwordVisibilityIcon}
                                            >
                                                <Icon 
                                                    name="eye-off" size={32} color="black"
                                                    
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                                
                                <View style={!this.state.errorInVerifyPassword ? styles.InputView : styles.InputViewError}>
                                    <Icon 
                                        name="lock-closed" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Re-entrer mot de passe' placeholderTextColor='black'  keyboardType={'default'}
                                                style={styles.textInput} onChangeText={verifyPassword => this.setState({ verifyPassword })}
                                                value={this.state.verifyPassword} autoCapitalize={'none'}
                                                secureTextEntry={!this.state.verifyPasswordVisible}
                                                /> 
                                    {
                                        !this.state.verifyPasswordVisible ? (
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({verifyPasswordVisible : true})
                                                }}
                                                style={styles.passwordVisibilityIcon}
                                            >
                                                <Icon 
                                                    name="eye" size={32} color="black"
                                                />
                                            </TouchableOpacity>
                                            
                                        ) :
                                        (
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({verifyPasswordVisible : false})
                                                }}
                                                style={styles.passwordVisibilityIcon}
                                            >
                                                <Icon 
                                                    name="eye-off" size={32} color="black"
                                                    
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                                

                                <View style={styles.buttons}>
                                    <View style={styles.button}>
                                        <Button title='CREER COMPTE' 
                                        color='gray' 
                                        onPress={()=>{this.sign_up()}}
                                        
                                        />
                                    </View>
                                    <View style={styles.Ou}>
                                        <Text style={{
                                            fontSize : 25,fontWeight : "bold",color : "white"
                                        }}>Ou</Text>
                                    </View>
                                    <View style={styles.button}>
                                        <Button title='Login' 
                                        color='gray' 
                                        onPress={()=>{
                                            this.props.navigation.navigate('Login')
                                        }}
                                        
                                        />
                                    </View>
                                </View>


                                
                            </View>

                        </ScrollView>


                    </ImageBackground>

        )
    
    
    }


}
  

const styles = StyleSheet.create({
    
    container : {
        //flex:1,
        //backgroundColor: '#607aec',
        margin:0,
    },
    body : {
        marginTop : "10%",
    },
    imageView :{
        marginTop : "10%",
        justifyContent : "center",
        marginBottom:'1%',
        alignItems : "center"
    },
    image : {
        height : 250,
        width : 250,
        tintColor : "white"
    },
    inputboxs : {
        paddingTop: 10,
        paddingBottom:26,
    },
    input : {
        borderWidth:1,
        borderColor : '#05036D',
        fontSize:15,
        fontWeight: 'bold',
        color:'#05036D',
        textAlign:'center',
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft:15,
    },
    button: {
        width:'60%',
        alignContent: 'center',
        marginLeft:80,
        marginTop:10,
        marginBottom:10,
    },
    error:{
        color: 'red',
        fontSize: 22,
        fontWeight : 'bold',
        marginLeft: 30,

    },
    note : {
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        flexDirection : "row",
    },
    signUp: {
            fontSize : 16,
            fontWeight: "bold",
            color : '#05036D',
    },
    Redirect : {
      fontSize : 15,
      fontWeight: "bold",
      color : 'yellow',
      marginRight:10,
      marginLeft:10,


  },
    modalContainer : {
        flex :1,
        backgroundColor : '#607aec',
    },
    close : {
        marginLeft : '90%',
        marginTop: '2%',
  
    },
    logo : {
        marginTop:-18,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#05036D',
        },
    backgroundImage : {
        height : Dimensions.get('window').height,
        width : Dimensions.get('window').width,
    },
    InputView : {
        backgroundColor : "white",
        borderRadius : 10,
        marginTop : "5%",
        marginBottom : "5%",
        width : "90%",
        alignSelf : "center",
        flexDirection : "row",
        alignItems : "center"
    },
    InputViewError : {
        backgroundColor : "white",
        borderRadius : 10,
        marginTop : "5%",
        marginBottom : "5%",
        width : "90%",
        alignSelf : "center",
        flexDirection : "row",
        alignItems : "center",
        borderWidth : 3,
        borderColor : "red",
    },
    icon : {
        marginLeft : "2%",
        marginRight : "3%"
    },
    textInput : {
        fontSize:15,
        fontWeight: 'bold',
        width : "80%"
    },
    passwordVisibilityIcon : {
        position : 'absolute',
        left : "85%"
    },
    buttons : {
        marginTop : "10%",
        marginBottom : "10%"
    },
    Ou : {
        alignSelf : "center",
        marginTop : "4%",
        marginBottom : "4%"
    }
});