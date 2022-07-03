/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,StyleSheet,Button,ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import LinearGradient  from 'react-native-linear-gradient';

export default class Settings extends React.Component{

    state ={
        emailChange : '',
        emailBothChange : '',
        currentPasswordEmailChange : '',
        currentPasswordChange : '',
        currentPasswordBothChange : '',
        newPasswordEmailChange : '',
        newPasswordChnage : '',
        newPasswordBothChange : '',
        EmailErrorMessage : '',
        PasswordErrorMessage:'',
        BothErrorMessage: '',
        emailChanged : false,
        passwordChanged : false,
    }
    

    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
      }

      changePassword = () => {

        if ( this.state.newPasswordChnage.length < 8 || this.state.currentPasswordChange.length < 8){
            this.setState({ PasswordErrorMessage : 'please complete the specific data (password >= 8) ' })
        }
        else {
        this.reauthenticate(this.state.currentPasswordChange).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(this.state.newPasswordChnage).then(() => {
            console.log("Password updated!");
            this.setState({ PasswordErrorMessage : 'your password is updated with success'});
            this.setState({ passwordChanged : true });

          })
          .catch((error) => { console.log(error );
                            this.setState({ PasswordErrorMessage : error.message });
                            this.setState({ passwordChanged : false });

        });
        })
        .catch((error) => { console.log(error); 
                            this.setState({ PasswordErrorMessage : error.message });
                            this.setState({ passwordChanged : false });

        });
    }
      }


      changeEmail = () => {

        if ( this.state.currentPasswordEmailChange.length == 0 || this.state.emailChange.length == 0 ){
            this.setState({ EmailErrorMessage : 'please complete the specific data ' })
        }
        else {

        this.reauthenticate(this.state.currentPasswordEmailChange).then(() => {
          var user = firebase.auth().currentUser;
          user.updateEmail(this.state.emailChange).then(() => {
            console.log("Email updated!");
            this.setState({EmailErrorMessage : ' your email is updated with success'});
            this.setState({ emailChanged : true });


          })
          .catch((error) => { console.log(error);
            this.setState({EmailErrorMessage : error.message});
            this.setState({ emailChanged : false });

        });

        })
        .catch((error) => { console.log(error); 
            this.setState({EmailErrorMessage : error.message});
            this.setState({ emailChanged : false });

        });
            }
      }


      changeBoth = () =>{

        if ( this.state.newPasswordBothChange.length < 8 || this.state.emailBothChange.length < 12  || this.state.currentPasswordBothChange.length < 8 ){
            this.setState({ BothErrorMessage : 'please complete the specific data (password >= 8 and email caracters >= 12) ' })
        }
        else {


            this.reauthenticate(this.state.currentPasswordBothChange).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(this.state.emailBothChange).then(() => {
                  console.log("Email updated!");
                  this.setState({ emailChanged : true });
                  this.setState({ BothErrorMessage : 'Email and PAssword updated with success' });


                  this.reauthenticate(this.state.currentPasswordBothChange).then(() => {
                    var user1 = firebase.auth().currentUser;
                    user1.updatePassword(this.state.newPasswordBothChange).then(() => {
                      console.log("Password updated!");
                      this.setState({ passwordChanged : true });
          
                    })
                    .catch((error) => { console.log(error );
                                      this.setState({ BothErrorMessage : error.message });
                                      this.setState({ passwordChanged : false });
          
                  });
                  })
                  .catch((error) => { console.log(error); 
                                      this.setState({ BothErrorMessage : error.message });
                                      this.setState({ passwordChanged : false });
          
                  });
      
                })
                .catch((error) => { console.log(error);
                  this.setState({BothErrorMessage : error.message});
                  this.setState({ emailChanged : false });
      
              });
      
              })
              .catch((error) => { console.log(error); 
                  this.setState({BothErrorMessage : error.message});
                  this.setState({ emailChanged : false });
      
              });
                
            

              

      }

    }

    

    render(){
        return (
            

        <View style={styles.container}>

                <LinearGradient colors={['#05036D', 'pink', '#36AFF2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}  > 
            <ScrollView>


            <View style={styles.option}> 
             <Text style={styles.title}>  Change Email address :  </Text> 
             </View>

                        <Text style={styles.error}>     {this.state.EmailErrorMessage}      </Text>

        <View style={styles.distance}>
            <TextInput  placeholder='New email' placeholderTextColor='white' 
            onChangeText={emailChange => this.setState({ emailChange})}
            value={this.state.emailChange}  style={styles.input}
             />
             <TextInput  placeholder='Current password' placeholderTextColor='white' 
            onChangeText={currentPasswordEmailChange => this.setState({ currentPasswordEmailChange})}
            value={this.state.currentPasswordEmailChange}  style={styles.input} secureTextEntry={true}
            autoCapitalize= "none"
             />
            <View style={styles.button} >
                                <Button title='Change email ' color='#324052'
                onPress={this.changeEmail}
                 />
            </View>
        </View>

            <View style={styles.option}> 
             <Text style={styles.title}>  Change password :  </Text> 
             </View>

             <Text style={styles.error}>     {this.state.PasswordErrorMessage}      </Text>


        <View style={styles.distance}>
             <TextInput  placeholder='Current password' placeholderTextColor='white' 
            onChangeText={currentPasswordChange => this.setState({ currentPasswordChange})}
            value={this.state.currentPasswordChange}  style={styles.input} secureTextEntry={true}
            autoCapitalize= "none"

             />

             <TextInput  placeholder='New password' placeholderTextColor='white' 
            onChangeText={newPasswordChnage => this.setState({ newPasswordChnage})}
            value={this.state.newPasswordChnage}  style={styles.input} secureTextEntry={true}
            autoCapitalize= "none"

             />

            <View style={styles.button} >
                                <Button title='Change password ' color='#324052'
                onPress={this.changePassword}
                  />
            </View>
        </View>


        <View style={styles.option}> 
             <Text style={styles.title}>  Change Email and Password :  </Text> 
        </View>


        <Text style={styles.error}>     {this.state.BothErrorMessage}      </Text>



        <View style={styles.distance}>
            <TextInput  placeholder='New email' placeholderTextColor='white' 
            onChangeText={emailBothChange => this.setState({ emailBothChange })}
            value={this.state.emailBothChange}  style={styles.input}
             />

             <TextInput  placeholder='Current password' placeholderTextColor='white' 
            onChangeText={currentPasswordBothChange => this.setState({ currentPasswordBothChange})}
            value={this.state.currentPasswordBothChange}  style={styles.input} secureTextEntry={true}
            autoCapitalize="none"

             />

             <TextInput  placeholder='New password' placeholderTextColor='white' 
            onChangeText={newPasswordBothChange => this.setState({ newPasswordBothChange})}
            value={this.state.newPasswordBothChange}  style={styles.input} secureTextEntry={true}
            autoCapitalize= "none"

             />

            <View style={styles.button} >
                <Button title='Change email and password ' color='#324052'  
                onPress={this.changeBoth}

                />
            </View>
        </View>
  
        </ScrollView>

                </LinearGradient>

        </View>

    );

}


}

const styles = StyleSheet.create({

    input : {
        borderWidth:3,
        borderColor : 'white',
        width: '90%',
        height: 40,
        marginLeft: 25,
        paddingLeft:15,
        marginTop:15,
        marginBottom:10,
        backgroundColor:'#324052',
    },
    container : {
        flex:1,
        // backgroundColor: '#60aec7',
        marginTop:0,
    },

    distance : {
        marginBottom:15,
        marginTop:15,
        marginLeft :0,
        marginRight:5,
    },
    button :{
        marginTop:15,
        marginBottom:10,
        backgroundColor:'black',
        width: '60%',
        marginLeft:75,
    },
    option : {
        width : '100%',
        height : 30,
        flexDirection: "row",
        backgroundColor: '#324052',
        alignItems :'center',
        justifyContent:"center",
        marginTop:30,
        marginBottom:10,
        
    },
    title : {
        fontSize: 18,
        fontWeight: "bold",
        color : 'white',
    },
    error : {
            fontWeight: "bold",
            fontSize: 18,
            color :'red',
    }
});
