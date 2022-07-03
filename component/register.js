/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Text,View,TouchableWithoutFeedback,Keyboard,
    TextInput,StyleSheet,ScrollView,Image, Button,TouchableOpacity,Modal,Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'react-native-firebase';
import LinearGradient from 'react-native-linear-gradient';

export default class Register extends React.Component{

    state = {
        firstname: '',
        lastname: '',
        phoneNumber:'',
        email: '',
        password: '',
        errorMessage: '',
        modal : false,

    }

    
     




      ShowCurrentDate = () =>{
 
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
       
        if (day < 10 && month < 10){
        var date = '0' + day + '/0' + month + '/' + year; 
        return date;
        }

        else if (day < 10 ){
        var date = '0' + day + '/' + month + '/' + year; 
        return date;
        }

        else if ( month < 10){
        var date =  day + '/0' + month + '/' + year; 
        return date;
        }
       };

       handleModal = () =>{

        this.setState({ modal : false  });

       }


    handleRegistration = () => {
    
        
        if ( this.state.email.length === 0 || this.state.lastname.length === 0 || this.state.firstname.length === 0  ){
            this.setState({ errorMessage : 'please complete the registration data' });
        }
        else if (this.state.phoneNumber.length < 10 ){
            this.setState({ errorMessage: 'Phone number must have 10 digits ' });

        }
        else if (this.state.password.length < 8 ){
            this.setState({ errorMessage: 'password must have at least 8 characters' });

        }

        else {
            console.log('register button has been clicked');
         firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(userCredetials => {
             userCredetials.user.updateProfile({
                displayName: this.state.lastname + ' ' + this.state.firstname,
                 });
                 
                  
                  


        userCredetials.user.sendEmailVerification();
        console.log('email verification sent to ' + userCredetials.user.email );

        this.setState({ modal : true });

        firebase.database().ref().child('/users/'+ userCredetials.user.uid)
        .update({
            id : userCredetials.user.uid,
            phoneNumber : this.state.phoneNumber,
            fullName : this.state.lastname + ' ' + this.state.firstname,
            status : 'offline',

        });

        

        } 
        )
        .catch(error =>  this.setState({errorMessage : error.message})
            );
        }
    // const _id = Math.random().toString(36).substring(7);
    // const userFullName = this.state.lastname + ' ' +this.state.firstname;
    // const user ={_id,userFullName};
    //  AsyncStorage.setItem('user',JSON.stringify(user))
    }


     signin() {
        Actions.signin();
    }

render()

    { 
       return (


           
        <TouchableWithoutFeedback onPress={() => {
            console.log('you just get out from the input');
            Keyboard.dismiss();
        }
        
        } >

<ScrollView keyboardShouldPersistTaps='handled' >
<LinearGradient colors={['#05036D','pink','#36AFF2']} start={{x:0,y:0}} end={{x:1,y:1}} style={{flex:1}}  >

        <View style={styles.container}>



                           <Modal visible={this.state.modal} >

                               <View style={styles.modalContainer} >
                                   <LinearGradient colors={['#05036D', 'pink', '#36AFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1, height: Dimensions.get('window').height }}  >
                                       <TouchableOpacity onPress={this.handleModal} >

                                           <Image source={require('../assets/close32.png')} style={styles.close} />

                                       </TouchableOpacity>

                                       <View style={styles.image} >

                                           <Image source={require('../assets/VT_logo2.png')} />
                                           <Text style={styles.logo} >   Meet me  </Text>

                                       </View>

                                       <View style={styles.textViewContainer}>

                                           <Text style={styles.textContainer} >  You Registered successfully in <Text style={{ color: '#05036D' }} > Meetme
            </Text>  App. We sent a verification link to your email : <Text style={{ color: '#05036D' }} > abdelhadi0497@gmail.com </Text>
            Thanks for using our App.

             </Text>
                                           <Text style={styles.noteText} > Note that : </Text>
                                           <Text style={styles.modalText} > You won't be able to login if your account isn't verified.</Text>

                                       </View>

                                   </LinearGradient>
                               </View>


                           </Modal>


        <View  style={styles.image} >
            <Image source={require('../assets/VT_logo2.png') } />
            <Text style={styles.logo} >   Meet me  </Text>

        </View>

        <Text style={styles.error} > {this.state.errorMessage} </Text> 

        <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your firstname' placeholderTextColor='#05036D' 
                            style={styles.input}
                            onChangeText={firstname => this.setState({ firstname })}
                            value={this.state.firstname}
                              /> 
            </View>

            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your lastname' placeholderTextColor='#05036D' 
                            style={styles.input}
                            onChangeText={lastname => this.setState({ lastname })}
                            value={this.state.lastname}
                              /> 
            </View>

            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your phone number' placeholderTextColor='#05036D' 
                            style={styles.input}
                            onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            value={this.state.phoneNumber} keyboardType={"phone-pad"}
                            maxLength={10}
                              /> 
            </View>


            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your email' placeholderTextColor='#05036D' 
                            style={styles.input} 
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email} keyboardType={"email-address"} autoCapitalize="none"
                             /> 
            </View>

            <View style={styles.inputboxs}>
                <TextInput placeholder='Enter your password' placeholderTextColor='#05036D' 
                            style={styles.input} secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            autoCapitalize= "none" 
                             /> 
            </View>

            <View style={styles.button} >
                <Button title='Register' 
                color='#05036D' 
                onPress={this.handleRegistration}
                />

            </View>

            
            <View style={styles.note} >
                    

                    <Text style={{fontSize:16,fontWeight:"bold",color: 'white'}} > Already  have an account ?  </Text>

                        <TouchableOpacity  onPress={this.signin}>
                                <Text style={styles.signIn}>Sign In</Text>
                        </TouchableOpacity>


                </View>


        </View>

        </LinearGradient>

     </ScrollView>

        </TouchableWithoutFeedback>
    );


}
}

const styles = StyleSheet.create({

    container: {
        // flex:1,
        // backgroundColor: '#36AFF2',
        marginTop: 0,

    },
    image: {
        marginTop: 0,
        alignItems: 'center',
        marginLeft: 0,
        marginBottom: '5%',
    },
    inputboxs: {
        paddingTop: 4,
        paddingBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#05036D',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#05036D',
        borderWidth: 3,
        width: '90%',
        height: 40,
        marginLeft: 20,
        paddingLeft: 15,
        textAlign: 'center',
    },
    button: {
        width: '70%',
        alignContent: 'center',
        marginLeft: 60,
        marginTop: 10,
        marginBottom: 20,
    },
    error: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 30,

    },
    note: {
        marginLeft: 10,
        marginTop: 30,
        marginBottom: 20,
        flexDirection: "row",
        lineHeight: 20,
    },
    signIn: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#05036D',
    },
    modalContainer: {
        flex: 1,

    },
    modalText: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'black',
        paddingTop: 10,
        paddingBottom: 5,
        lineHeight: 30,




    },
    close: {
        marginLeft: '90%',
        marginTop: '2%',

    },
    noteText: {
        fontSize: 18,
        fontWeight: "bold",
        color: 'red',
        paddingTop: 15,
        paddingBottom: 5,
        marginRight: 20,
        marginLeft: 20,
    },
    logo: {
        marginTop: -18,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#05036D',
    },
    textContainer: {

        lineHeight: 30,
        fontSize: 16,
        fontWeight: 'bold',

    },
    textViewContainer: {
        marginLeft: '2%',
        marginRight: '2%',
    }

});