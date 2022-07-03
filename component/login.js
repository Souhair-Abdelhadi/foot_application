/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,
    TouchableWithoutFeedback ,Image, Keyboard,ScrollView ,Button ,Alert,Dimensions,Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import  * as firebase from 'react-native-firebase';

import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


    export default class LoginScreen extends React.Component {

        state = {
            email : "",
            password : "",
            errorMessage : "",
            modal : false ,
            resetPassword :"",
            resetPasswordError : "",
        }
        Redirect(){
            Actions.home();
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

            

            if (this.state.password.length === 0 || this.state.email.length === 0 ){
                this.setState({
                    errorMessage : 'please insert your data in the input ',
                });
            }
            
            else {
            const {email,password} = this.state;
            var user;
            firebase.auth().signInWithEmailAndPassword(email,password)
           .then( async snapshot => {
            console.log('user has logging');
            user = snapshot.user;
            if (user && user.emailVerified)
           { 
               const _id = user.uid;
               const name = user.displayName;
            // this._storeData(user.uid,user.displayName);
           await AsyncStorage.setItem('user', JSON.stringify({ _id:_id, name : name }))
            firebase.database().ref('/users/'+user.uid)
            .update({
                status : 'online'
            })
            }
            else if (user && user.emailVerified == false) {
                   this.setState({ errorMessage: '' });
                   firebase.auth().signOut()
                   .catch(err=>console.log(err.message));
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
        .catch(error => { console.log(error.message);
                            
            this.setState({ errorMessage : error.message });

        });
                            
                                                            
                           }
                
                }

      
    
 
        signup(){
            Actions.registartion();
        }  


        _storeData = async (_id,name) => {

            try {
                await AsyncStorage.setItem('user',JSON.stringify({_id,name}));

        
            }
              catch (err){
                console.log('couldn\'t save data');
              }
        
           }

        //    _retrieveData= async () => {

        //     try{
        //     const value = await AsyncStorage.getItem('user');
        //     const data = JSON.parse(value);
        //     console.log(data.uid,data.fullName);

        //     }
        //     catch(err){
        //         console.log('error has occurred');
        //     }

        // }
       

        render()
        {


            return (


                <TouchableWithoutFeedback  onPress={() => {
                    console.log('you just get out from the input');
                    Keyboard.dismiss();
                }
                
                }   >
    

<ScrollView keyboardShouldPersistTaps='handled' >

                        <LinearGradient colors={['#05036D', 'pink', '#36AFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, height:Dimensions.get('window').height}}  >

           


            <View >


            <Modal visible={this.state.modal} >
            <LinearGradient colors={['#05036D','pink','#36AFF2']} start={{x:0,y:0}} end={{x:1,y:1}} style={{flex:1,height:Dimensions.get('screen').height}} >
                <View >

                <TouchableOpacity onPress={this.handleModal} >

                    <Image  source={require('../assets/close32.png')} style={styles.close}  />
                    

                </TouchableOpacity>

                <View style={styles.image} >

                <Image  source={require('../assets/VT_logo2.png')}   />
                <Text style={styles.logo} >   Meet me  </Text>

                </View>
                    <Text style={styles.error} > {this.state.resetPasswordError}  </Text>

                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your email' placeholderTextColor='#05036D' keyboardType={'email-address'}
                                style={styles.input} onChangeText={resetPassword => this.setState({ resetPassword })}
                                value={this.state.resetPassword}

                                 /> 
                </View>

                <View style={styles.button}>
                    <Button title='reset password' 
                    color='#05036D'
                    onPress={this.forgotPassword}
                       
                    />
                </View>

                </View>

                </LinearGradient>


            </Modal>


        

            <View  style={styles.image} >
                <Image source={require('../assets/VT_logo2.png')  }  />
                <Text style={styles.logo} >   Meet me  </Text>
            </View>
            
           
                 <Text style={styles.error} > {this.state.errorMessage} </Text> 
            
            
            
    
                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your email' placeholderTextColor='#05036D'  keyboardType={'email-address'}
                                style={styles.input} onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                 /> 
                </View>
    
                <View style={styles.inputboxs}>
                    <TextInput placeholder='Enter your password' placeholderTextColor='#05036D' 
                                style={styles.input} 
                                secureTextEntry={true} onChangeText={password => this.setState({ password }) }
                                value={this.state.password}
                                autoCapitalize="none"
                                 /> 
                </View>
    
                <View style={styles.button}>
                    <Button title='Login' 
                    color='#05036D' 
                    onPress={this.handleLogin}
                       
                    />
                </View>


                <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > Forgot your password ?  </Text>

                        <TouchableOpacity  onPress={this.openModal}>
                                <Text style={styles.signUp}>Reset Password</Text>
                        </TouchableOpacity>


                </View>


                <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > You don't have an account ?  </Text>

                        <TouchableOpacity   onPress={this.signup}>
                                <Text style={styles.signUp}>Sign up</Text>
                        </TouchableOpacity>


                </View>



            </View>

            </LinearGradient>

            </ScrollView>


        </TouchableWithoutFeedback>




                



        )
    
    
    }


}
  

const styles = StyleSheet.create({
    
    container : {
        //flex:1,
        //backgroundColor: '#607aec',
        margin:0,
    },
    image : {
        marginTop : 0,
        alignItems:'center',
        marginLeft: 0,
        marginBottom:'5%',

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
        borderWidth:3,
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
        color: 'white',
        fontSize: 16,
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
   
});

    