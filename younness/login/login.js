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
import {View, Text, StyleSheet, TextInput, TouchableOpacity,ImageBackground,
    TouchableWithoutFeedback ,Image, Keyboard,ScrollView ,Button ,Alert,Dimensions,Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNSecureStorage , {ACCESSIBLE} from "rn-secure-storage"
import  * as firebase from 'react-native-firebase';
import Icon from "react-native-vector-icons/Ionicons"
import Spinner from "react-native-spinkit"
import AsyncStorage from '@react-native-community/async-storage';


    export default class LoginScreen extends React.Component {

        state = {
            email : "",
            password : "",
            errorMessage : "",
            showModal : false ,
            resetPassword :"",
            resetPasswordError : "",
            passwordVisible : false,
            passwordError : false,
            emailError : false
        }



      

          forgotPassword = () =>{

            if (this.state.resetPassword.length === 0 ){
                this.setState({
                    resetPasswordError : 'please insert your data in the input ',
                });
            }

            else {

            firebase.auth().sendPasswordResetEmail(this.state.resetPassword)
            .then(user =>{


                this.setState({resetPasswordError : 'password reset successfully, check your e-mail'});

            } )
            .catch(error => this.setState({ resetPasswordError : error.message }) );

            }

          }

          handleModal = () =>{

            this.setState({ modal : false  });
            this.setState({ resetPasswordError: '' });
    
           }
    
           openModal = () => {

            this.setState({ modal : true });
            this.setState({ resetPasswordError: '' });

           }


        handleLogin = () => {
            this.setState({
                emailError : false,
                passwordError : false
            })
            if ((!this.ValidateEmail(this.state.email)) || (this.state.password.length < 8) ) {
                if(!this.ValidateEmail(this.state.email)){
                    this.setState({
                        emailError : true,
                        errorMessage : "please enter a valid email"
                    })
                }
                else if(this.state.password.length < 8){
                    this.setState({
                        passwordError : true,
                        errorMessage : "please enter a password greater than or equal 8 characters"
                    })
                }
            }

            else {
                this.setState({ showModal: true })
                const { email, password } = this.state;
                var user;
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(async snapshot => {
                        console.log('user has logging');
                        user = snapshot.user;
                        if (user && user.emailVerified) {
                            const _id = user.uid;
                            const name = user.displayName;
                            // this._storeData(user.uid,user.displayName);
                            await AsyncStorage.setItem('user', JSON.stringify({ _id: _id, name: name }))
                            firebase.database().ref('/users/' + user.uid)
                                .update({
                                    status: 'online'
                                })
                                .catch(e => console.log(e))

                            await RNSecureStorage.set("userUid", user.uid, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY })
                                .then(() => {
                                    this.setState({ showModal: false })
                                    this.props.navigation.navigate('App')

                                })
                                .catch((e) => console.log(e))

                        }
                        else if (user && user.emailVerified == false) {
                            this.setState({ errorMessage: '', showModal: false });
                            firebase.auth().signOut()
                                .catch(err => console.log(err.message));
                            Alert.alert('Attention',
                                'Your account is not yet verified , please go check your email and verify your account to use it  ',
                                [{ text: 'UNDERSTOOD', onPress: () => console.log('user pressed understood for verified account case') }]);
                            console.log('user signed out from login screen');
                            firebase.database().ref('/users/' + user.uid)
                                .update({
                                    status: 'offline'
                                })
                        }
                    })
                    .catch(error => {
                        console.log(error.message);

                        this.setState({ errorMessage: error.message, showModal: false });

                    });
            }
        }



        _storeData = async (_id,name) => {

            try {
                await AsyncStorage.setItem('user',JSON.stringify({_id,name}));

        
            }
              catch (err){
                console.log('couldn\'t save data');
              }
        
           }

           ValidateEmail(mail) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
                {
                    return (true)
                }
                    return (false)
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


                    <Modal visible={this.state.showModal}  transparent={true}    >


                        <View style={styles.modal} >


                        <View style={{
                            justifyContent : "center",
                            alignItems : "center",
                        }} >

                            <Text style={{
                                fontSize : 21,
                                fontWeight : "bold",
                                color : "white",
                                marginBottom : "5%",
                            }} >Login to your account...</Text>
                            <Spinner style={styles.spinner} isVisible={true} size={60} type={"Pulse"} color={"white"}/>

                        </View>

                        </View>


                    </Modal>



                        <ScrollView keyboardShouldPersistTaps="handled" >

                            <View style={styles.imageView}>
                                <Image 
                                    source={require('../assets/logo_1.png')}
                                    style={styles.image}
                                />
                            </View>
                
                            <View style={styles.body}>
                                <Text style={styles.error} > {this.state.errorMessage} </Text> 
                                
                                <View style={this.state.emailError ? styles.InputViewError : styles.InputView}>
                                    <Icon 
                                        name="person" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Email' placeholderTextColor='black'  keyboardType={'email-address'}
                                                style={styles.textInput} onChangeText={email => this.setState({ email })}
                                                value={this.state.email} autoCapitalize={'none'}
                                                /> 
                                </View>
                                
                    
                                <View style={this.state.passwordError ? styles.InputViewError : styles.InputView}>
                                    <Icon 
                                        name="lock-closed" size={32} color="black"
                                        style={styles.icon}
                                    />
                                    <TextInput placeholder='Password' placeholderTextColor='black'  keyboardType={'default'}
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
                    
                                

                                <View style={styles.buttons}>
                                    <View style={styles.button}>
                                        <Button title='SE CONNECTER' 
                                        color='gray' 
                                        onPress={this.handleLogin}
                                        
                                        />
                                    </View>
                                    <View style={styles.Ou}>
                                        <Text style={{
                                            fontSize : 25,fontWeight : "bold",color : "white"
                                        }}>Ou</Text>
                                    </View>
                                    <View style={styles.button}>
                                        <Button title='NOUVEAU COMPTE' 
                                        color='gray' 
                                        onPress={()=>{
                                            this.props.navigation.navigate('Register')
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
        marginTop : "2%",
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
    },
    spinner: {
        marginBottom: 10,
        alignSelf : "center",
        justifyContent : "center",
        alignItems : "center",
        marginTop : "5%"
      },
      modal : {
          height : "50%",
          width : "80%",
          backgroundColor : "rgba(8, 10, 10, 0.7)",
          justifyContent : "center",
          alignSelf : "center",
          marginVertical : "40%",
          borderRadius : 18,

      }
});