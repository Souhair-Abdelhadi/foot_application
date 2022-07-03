import React from 'react';
import {View,Text,StyleSheet,Button,ScrollView,Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class AboutApp extends React.Component{



    

render(){

    return (
        <LinearGradient colors={['white', 'white','#343252']} start={{x:0,y:0}} end={{x:1,y:1}} style={{flex:1}}  >
        <ScrollView>

        <View style={styles.container}>

        <View  style={styles.image} >
                <Image source={require('../assets/VT_logo2.png')  } />
                <Text style={styles.logo} >   Meet me  </Text>

        </View>
            
        <View>

        <Text style={styles.title} >  What is Meet me ? </Text>

        <Text style={styles.text} > Meet me is an app that randomly create a chat room with an individual 
        and give the user such a pleasant time to discover and meet new people across the world.

         </Text>

                        <Text style={styles.title} >  How to use it ? </Text>

                        <Text style={styles.text} > It's really simple , meet me offer a limit of 20 online users who you can chat with them ,
                         you can choose whoever you want with condition to respect our regulation and not send or say any sexual gestures.

         </Text>
                        <Text style={styles.title} >  Why should you use Meet me ? </Text>

                        <Text style={styles.text} >  Honestly meet me is just for letting people have fun and interact with other persons and just chat without being spy on 
                         or having their data getting collected and exchange with other companies for profits.
         </Text>
                        <Text style={styles.title} >  Created By :  </Text>

                        <Text style={styles.text} > <Text style={{ color:'#043BB3',fontSize:16,fontWeight:'bold'}} >ABDELHADI SOUHAIR</Text>  computer engineering student in Faculty of Sciences and Technics - University  Hassan 1 SETTAT.
         </Text>

        </View>


        
        </View>
        </ScrollView>

      </LinearGradient>

    );
}
}

const styles = StyleSheet.create({
    container : {
        //backgroundColor :'white',
        //flex: 1,
    },
    title : {
        color: '#043BB3',
        fontSize: 22,
        fontWeight : "bold",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    text : {
        fontSize : 16,
        fontWeight: "bold",
        paddingLeft :20,
        paddingRight:10,
        paddingBottom:5,
        paddingTop : 3,
        lineHeight: 30,
        
    },
    note : {
        fontSize : 16,
        fontWeight: "bold",
        color :'red',
        paddingLeft :30,
        paddingBottom:5,
        paddingTop : 3,
    },
    person : {
        fontSize : 15,
        fontWeight: "bold",
        paddingLeft :30,
        paddingBottom:5,
        paddingTop : 3,
    },
    image : {
        marginTop : 0,
        alignItems:'center',
        marginLeft: 0,
        marginBottom:'10%',

    },
    logo : {
      marginTop:-18,
      fontWeight: 'bold',
      fontSize: 30,
      color: '#05036D',
    
      
    }
})