/* eslint-disable no-shadow */
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
import React from "react";
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,Modal,Animated,
   TouchableOpacity,SafeAreaView,ImageBackground} from 'react-native'

   export default class App extends React.Component{


    state={
      logoSlide  : new Animated.Value(0),
      logoDescriptionSlide : new Animated.Value(600),
      logoSlideMargin : 0,
      logoDescriptionSlideMargin : 0,
      
    }
    
    componentDidMount(){
      Animated.timing(this.state.logoSlide, {
        toValue: 90,
        duration: 2000,
        useNativeDriver : false
      }).start();
      Animated.timing(this.state.logoDescriptionSlide, {
        toValue: -30,
        duration: 2000,
        useNativeDriver : false
      }).start();
      


      this.state.logoSlide.addListener(({value})=>{
        this.setState({logoSlideMargin : value})
      })
      this.state.logoDescriptionSlide.addListener(({value})=>{
        this.setState({logoDescriptionSlideMargin : value})
      })
    }

    componentWillUnmount(){
      // fix Warning: Can't perform a React state update on an unmounted component
     this.setState = (state, callback) => {
      return;
      };
      this.state.logoSlide.removeAllListeners()
      this.state.logoDescriptionSlide.removeAllListeners()
    }

render(){
  return(
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={require('../assets/animationBackgroundImage.jpeg')}
        style={styles.backgroundImage}
      >

        <Animated.View style={[styles.logoView,{marginTop : ""+this.state.logoSlideMargin+"%"}]}>
          <Image 
            source={require('../assets/logo_1.png')}
            style={styles.logo}
          />
        </Animated.View>

        <Animated.View style={[styles.logoDescriptionView,{marginTop : ""+this.state.logoDescriptionSlideMargin+"%"}]}>
          <Image 
            source={require('../assets/logoDescription.png')}
            style={styles.logoDescription}
          />
        </Animated.View>

      </ImageBackground>
    </SafeAreaView>
  )
}


}

const styles = StyleSheet.create({
container : {
flex : 1,

},
backgroundImage : {
height : Dimensions.get('screen').height,
width : Dimensions.get('screen').width,
},
logoView : {
alignItems : "center",
top : "-20%",
},
logo : {
position : "relative",
height : 200,
width : 200,
tintColor : "white",

},
logoDescriptionView : {
alignItems : "center",
},
logoDescription : {
position : "relative",
height : 250,
width : "100%",
tintColor : "white",

}

})