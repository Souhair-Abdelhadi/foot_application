import React  from 'react';
import {StyleSheet,View,Text} from 'react-native';
import OptionsMenu from 'react-native-option-menu';
import  firebase from 'react-native-firebase'

export default class Test extends React.Component{

    state = {
        options : ['Logout','Close'],
    }

    SignOut = () =>{
        firebase.auth().signOut()
        .catch(error => error.message);
        console.log('user has Signed out')
    }

    Cancel = () =>{
        console.log('cancel clicked') ;
    }


render(){

    return (


        <View style={styles.container}>
  
  
        <View style={styles.card} >
  
        <Text style={styles.text}>Meet me</Text>
        
        
        
        <View style={styles.Logout}>
        
          <OptionsMenu 
  
          button={require('./assets/more.png')}
          buttonStyle={{ width: 32, height: 32,  }}
          destructiveIndex={1}
          options={this.state.options}
          actions={[this.SignOut]}
            
          />
  
        </View>



        </View>
  
       {this.props.children}
  
        </View>
  
  
        
  
  
  
  
  
      )



}





}




const styles = StyleSheet.create({

    container : {
        flex:1,
      backgroundColor : 'white',

      // flexDirection : 'row'
    },
    card : {
      marginTop: '3%',
      width :'100%',
      height :'8%',
      flexDirection : 'row'
      // alignItems : 'center',
    },
    text : {
      fontSize : 24,
      color  : '#05036D',
      fontWeight : 'bold',
      paddingLeft : '30%'
    },
    Logout : {
       paddingLeft : '40%'
    }



  })


