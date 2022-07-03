/* eslint-disable keyword-spacing */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from "react";
import {View,Text,StyleSheet,Animated,ScrollView,Dimensions,Image,
   TouchableOpacity,SafeAreaView} from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "react-native-firebase"
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Spinner from "react-native-spinkit"

export default class App extends React.Component{

  

    constructor(props){
      super(props)
      
    }
    state = {
      motivation : [],
      itemWidth : (Dimensions.get('screen').width * 70) / 100,
      activeSlide : 0,
      activeSlide1 : 0,
      activeSlide2 : 0,
      showSpinner : true,
      showSpinner1 : true,
      showSpinner2 : true,
      showSpinner3 : true,
    }

    renderItem = ({item, index}) =>{
         
         return (
           <TouchableOpacity 
            onPress={()=>{
              console.log("item pressed")
              this.props.navigation.navigate('VideoFrame',{item : item})
            }}
            key={index}
            style={{height : "100%",backgroundColor : "gray",
              borderRadius : 10,
              justifyContent : "center",alignItems : "center",
            }}
            
            >
              <View style={styles.itemCard} >
                  <Image 
                      source={{uri : item.image}}
                      style={styles.itemImage}
                  />
                  <View style={styles.playIcon} >
                    <Icon 
                      name="play" size={64} color={"black"}
                    />
                  </View>
                  <View style={styles.itemTitle}>
                    <Text style={styles.itemTitleStyle}>{item.title}</Text>
                    <View style={styles.itemBottomBorder}/>
                  </View>
              </View>
            </TouchableOpacity>
        )
    }

     pagination (array,activeSlide) {
      //const { motivation, activeSlide } = this.state;
      return (
          <Pagination
            dotsLength={array.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'gray'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }

    componentDidMount(){
      firebase.database().ref("/mindset/category/motivation")
      .once('value',(snap)=>{
        if(snap.val() != null){
        this.setState({motivation : snap.val(),
          showSpinner : false,
          showSpinner1 : false,
          showSpinner2 : false,
          showSpinner3 : false,
        })
        console.log(this.state.motivation)
        console.log(this.state.motivation.length)
        }
      })
      .catch((e)=>console.log(e))
    }

  render(){
    return(
        <SafeAreaView style={styles.container} >
            <View style={[styles.header,]} >
                <View style={styles.headerContent}>
                    <TouchableOpacity
                      style={{position : "absolute",left : "5%"}}
                      onPress={()=>this.props.navigation.goBack()}
                    >
                      <Icon 
                        name="arrow-back-circle" size={32} color="white"
                      />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Free your mind </Text>
                </View>
            </View>
            
            <ScrollView >

            <View style={styles.body}>
              <Spinner style={styles.spinner} isVisible={this.state.showSpinner} size={100} type={"Circle"} color={"white"}/>
              {this.state.motivation.length != 0 ? (<View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")}
                      style={{marginBottom : "5%"}}
                     >
                        <Text style={styles.categoryTitle} >More motivation videos {">>"} </Text>
                    </TouchableOpacity>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.motivation}
                      renderItem={this.renderItem}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={this.state.itemWidth}
                      onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                </View>) : null }
                {this.pagination(this.state.motivation,this.state.activeSlide)}
            </View>     
            <View style={[styles.body,{backgroundColor : "#495D55",}]}>

            <Spinner style={styles.spinner} isVisible={this.state.showSpinner1} size={100} type={"ChasingDots"} color={"white"}/>
              {this.state.motivation.length != 0 ? (<View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")}
                      style={{marginBottom : "5%"}}
                     >
                        <Text style={styles.categoryTitle} >More music videos {">>"} </Text>
                    </TouchableOpacity>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.motivation}
                      renderItem={this.renderItem}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={this.state.itemWidth}
                      layout={"default"}
                    />
                </View> ) : null }
            </View>  
            <View style={[styles.body,{backgroundColor : "#708062",}]}>

            <Spinner style={styles.spinner} isVisible={this.state.showSpinner2} size={100} type={"FadingCircle"} color={"white"}/>
              {this.state.motivation.length != 0 ? (<View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")}
                      style={{marginBottom : "5%"}}
                     >
                        <Text style={styles.categoryTitle} >More relax videos {">>"} </Text>
                    </TouchableOpacity>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.motivation}
                      renderItem={this.renderItem}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={this.state.itemWidth}
                      onSnapToItem={(index) => this.setState({ activeSlide1: index }) }
                    />
                </View> ) : null }
                {this.pagination(this.state.motivation,this.state.activeSlide1)}
            </View>  
            <View style={[styles.body,{backgroundColor : "#AAAB61",}]}>

            <Spinner style={styles.spinner} isVisible={this.state.showSpinner3} size={100} type={"Pulse"} color={"white"}/>
              {this.state.motivation.length != 0 ? (<View style={styles.category} >
                    <TouchableOpacity onPress={()=>console.log("item pressed")}
                      style={{marginBottom : "5%"}}
                     >
                        <Text style={styles.categoryTitle} >More meditation videos {">>"} </Text>
                    </TouchableOpacity>
                    <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.motivation}
                      renderItem={this.renderItem}
                      sliderWidth={Dimensions.get('screen').width}
                      itemWidth={this.state.itemWidth}
                      onSnapToItem={(index) => this.setState({ activeSlide2: index }) }
                    />
                </View>) : null }
                {this.pagination(this.state.motivation,this.state.activeSlide2)}
            </View>         
            </ScrollView>
        </SafeAreaView>
    )
}



}

const styles = StyleSheet.create({
container : {
    flex : 1,
    backgroundColor : "white",
},
header : {
    height : 60,
    backgroundColor : "#01011A",
    marginBottom : "0%",
},
headerContent : {
    marginTop : "3%",
    marginBottom : "3%",
    flexDirection : "row",
    justifyContent : "center",
},
headerTitle : {
    fontSize : 26,
    fontWeight : "bold",
    color : "white",
},
body : {
    backgroundColor : '#0A0908',
    height : Dimensions.get('screen').height * 0.5,
},
VideoView : {
    marginTop : "4%",
    marginBottom : "4%",
},
smallImage : {
    marginTop : "4%",
    marginBottom : "5%",
    width : "40%",
    height : 200,
    borderRadius : 20,
    borderWidth : 2,
    borderColor : "gray"
  },
wrapper: {
    height : "50%",
    flex : 1
},
category : {
    height : "80%",
    width : "100%",
    
},
categoryTitle : {
    fontSize : 22,
    fontWeight : "bold",
    color : "white",
    marginTop : "3%",
    marginLeft : "5%",
    marginBottom : "3%",
},
itemCard : {
    height : "90%",
    width : "90%",
    marginLeft : "3%",
    marginTop : "2%",
    marginRight : "3%",
},
itemImage : {
    width : "100%",
    flex : 1,
    alignItems : "center"
},
itemTitle : {
  position : "absolute",
  top : "70%",
  width : "100%",
  justifyContent : "center",
  alignSelf : "center",
  alignItems : "center"
},
itemTitleStyle : {
  fontSize : 26,
  fontWeight : "bold",
  color : "white",
  marginBottom : "2%"

},
itemBottomBorder : {
  width : "90%",
  borderBottomWidth : 2,
  borderBottomColor : "white",
},
playIcon : {
  position : "absolute",
  top : "30%",
  width : "100%",
  justifyContent : "center",
  alignSelf : "center",
  alignItems : "center"
},
spinner: {
  marginBottom: 10,
  alignSelf : "center",
  justifyContent : "center",
  alignItems : "center",
  marginTop : "30%"
},
})